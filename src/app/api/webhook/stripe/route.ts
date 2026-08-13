import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  return new Stripe(key, { apiVersion: "2025-02-24.acacia" as Stripe.LatestApiVersion });
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env vars are not configured");
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`[webhook] Signature verification failed: ${message}`);
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status !== "paid") break;
      const userId = session.client_reference_id;
      const courseId = session.metadata?.courseId ?? null;
      const stripeSessionId = session.id;
      if (!userId) {
        console.warn("[webhook] No client_reference_id on session — cannot grant access.");
        break;
      }
      try {
        const supabase = getSupabaseAdmin();
        const { error: purchaseError } = await supabase
          .from("user_purchases")
          .upsert({ user_id: userId, course_id: courseId, stripe_session_id: stripeSessionId, purchased_at: new Date().toISOString() }, { onConflict: "stripe_session_id" });
        if (purchaseError) console.error("[webhook] user_purchases upsert error:", purchaseError);
        const { error: profileError } = await supabase.from("profiles").update({ has_access: true }).eq("id", userId);
        if (profileError) console.error("[webhook] profiles update error:", profileError);
      } catch (dbErr) {
        console.error("[webhook] Database error:", dbErr);
        return NextResponse.json({ error: "Database update failed" }, { status: 500 });
      }
      break;
    }
    default:
      console.log(`[webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
