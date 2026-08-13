import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { courseData } from "@/lib/courses";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  return new Stripe(key, { apiVersion: "2025-02-24.acacia" as Stripe.LatestApiVersion });
}

function parsePrice(value: unknown) {
  const parsed = Number(String(value ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId || !session.user.email) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    const courseId = typeof body?.courseId === "string" ? body.courseId.trim() : "";
    const course = courseData.find((item) => item.id === courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const price = parsePrice(course.price);
    if (!price) {
      return NextResponse.json({ error: "This course is not available for checkout" }, { status: 400 });
    }

    const stripe = getStripe();
    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const configuredPriceId = process.env.NEXT_PUBLIC_PRICE_ID_TECH;
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      configuredPriceId?.startsWith("price_")
        ? [{ price: configuredPriceId, quantity: 1 }]
        : [{
            price_data: {
              currency: "gbp",
              product_data: { name: course.title, description: course.description },
              unit_amount: Math.round(price * 100),
            },
            quantity: 1,
          }];

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      client_reference_id: userId,
      customer_email: session.user.email,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout?course=${encodeURIComponent(course.id)}`,
      metadata: { courseId: course.id, courseName: course.title, userId },
    });

    return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url });
  } catch (error) {
    console.error("[checkout] Stripe error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
