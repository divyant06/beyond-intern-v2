import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  return new Stripe(key, {
    apiVersion: "2025-02-24.acacia" as Stripe.LatestApiVersion,
  });
}

const BASE_URL =
  process.env.NEXTAUTH_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:3000";

export async function POST(req: Request) {
  try {
    const stripe = getStripe();

    // Get the authenticated user's session so we can attach their ID
    const session = await getServerSession();
    const userId = session?.user?.id ?? null;

    const body = await req.json();
    const { courseId, courseName, price } = body;

    // Prefer a pre-created Stripe Price ID from env (starts with "price_").
    // Fall back to dynamic price_data if the env value is a product ID ("prod_*")
    // or not set.
    const stripePriceId = process.env.NEXT_PUBLIC_PRICE_ID_TECH;
    const usePrebuiltPrice =
      stripePriceId && stripePriceId.startsWith("price_");

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = usePrebuiltPrice
      ? [{ price: stripePriceId, quantity: 1 }]
      : [
          {
            price_data: {
              currency: "gbp",
              product_data: {
                name: courseName || "Beyond Intern Course",
                description:
                  "12-week intensive programme with lifetime access and Certificate.",
              },
              unit_amount: Math.round((price ?? 79) * 100),
            },
            quantity: 1,
          },
        ];

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      // client_reference_id links the Stripe payment back to the Beyond Intern user.
      // The webhook uses this to grant course access in Supabase.
      ...(userId ? { client_reference_id: userId } : {}),
      success_url: `${BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/checkout?course=${courseId ?? ""}`,
      metadata: {
        courseId: String(courseId ?? ""),
        courseName: String(courseName ?? ""),
        userId: String(userId ?? ""),
      },
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("[checkout] Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
