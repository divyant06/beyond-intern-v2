import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// ── Stripe client ─────────────────────────────────────────────────────────────
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  return new Stripe(key, {
    apiVersion: "2025-02-24.acacia" as Stripe.LatestApiVersion,
  });
}

// ── Supabase admin client (service-role key bypasses RLS) ────────────────────
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key)
    throw new Error("Supabase env vars are not configured");
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

// ── Disable Next.js body parsing — Stripe needs the raw bytes to verify ──────
export const config = { api: { bodyParser: false } };

// ── POST /api/webhook/stripe ──────────────────────────────────────────────────
export async function POST(req: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  // Read the raw body bytes — required for signature verification
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`[webhook] Signature verification failed: ${message}`);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  // ── Handle events ──────────────────────────────────────────────────────────
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      // Only process fully paid sessions
      if (session.payment_status !== "paid") {
        console.log(
          `[webhook] Session ${session.id} not yet paid — skipping.`
        );
        break;
      }

      const userId = session.client_reference_id;
      const courseId = session.metadata?.courseId ?? null;
      const stripeSessionId = session.id;

      console.log(
        `[webhook] checkout.session.completed | user=${userId} | course=${courseId}`
      );

      if (!userId) {
        // Guest checkout — no user to update (log and move on)
        console.warn(
          "[webhook] No client_reference_id on session — cannot grant access."
        );
        break;
      }

      try {
        const supabase = getSupabaseAdmin();

        // ── Upsert into `user_purchases` ─────────────────────────────────
        // Adjust the table/column names to match your Supabase schema.
        // Schema assumption:
        //   user_purchases(id, user_id, course_id, stripe_session_id, purchased_at)
        //   profiles(id, has_access)         ← set has_access = true
        const { error: purchaseError } = await supabase
          .from("user_purchases")
          .upsert(
            {
              user_id: userId,
              course_id: courseId,
              stripe_session_id: stripeSessionId,
              purchased_at: new Date().toISOString(),
            },
            { onConflict: "stripe_session_id" } // idempotent — safe to replay
          );

        if (purchaseError) {
          console.error("[webhook] user_purchases upsert error:", purchaseError);
        }

        // ── Update profiles.has_access ───────────────────────────────────
        const { error: profileError } = await supabase
          .from("profiles")
          .update({ has_access: true })
          .eq("id", userId);

        if (profileError) {
          console.error("[webhook] profiles update error:", profileError);
        }

        console.log(
          `[webhook] ✅ Access granted to user ${userId} for course ${courseId}`
        );
      } catch (dbErr) {
        console.error("[webhook] Database error:", dbErr);
        // Return 500 so Stripe retries the webhook
        return NextResponse.json(
          { error: "Database update failed" },
          { status: 500 }
        );
      }

      break;
    }

    case "payment_intent.payment_failed": {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.warn(
        `[webhook] Payment failed for intent ${intent.id}: ${intent.last_payment_error?.message}`
      );
      break;
    }

    default:
      // Unhandled event types — acknowledge receipt so Stripe doesn't retry
      console.log(`[webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
