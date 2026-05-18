"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SubscribeResult {
  success: boolean;
  message: string;
}

export async function subscribeToNewsletter(
  email: string
): Promise<SubscribeResult> {
  // ── Basic validation ──────────────────────────────────────────
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) {
    return { success: false, message: "Please enter your email address." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  // ── Create contact via Resend (no audienceId — added to workspace) ──
  try {
    const { error } = await resend.contacts.create({
      email: trimmed,
      unsubscribed: false,
    });

    if (error) {
      // Resend returns a typed error object
      const msg = (error as { message?: string }).message ?? "";

      // Treat "already exists" variants as a soft success so the UX stays friendly
      if (
        msg.toLowerCase().includes("already exists") ||
        msg.toLowerCase().includes("duplicate")
      ) {
        return {
          success: true,
          message: "You're already on the list — we'll keep you posted!",
        };
      }

      console.error("[newsletter] Resend error:", error);
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      };
    }

    return {
      success: true,
      message: "You're on the list! Check your inbox for a welcome gift 🎁",
    };
  } catch (err) {
    console.error("[newsletter] Unexpected error:", err);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
