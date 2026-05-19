"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string) {
  try {
    await resend.emails.send({
      from: "Beyond Intern <info@beyondintern.com>",
      to: email,
      subject: "Welcome to Beyond Intern! 🎉",
      html: `<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;"><h2 style="color: #1a365d;">Welcome to the Beyond Intern platform!</h2><p>Your account has been successfully created. We are thrilled to have you on board.</p><p>You can now log in to access your student dashboard, track your progress, and explore our premium courses.</p><p>Let's get learning,<br><strong>The Beyond Intern Team</strong></p></div>`,
    });
  } catch (err) {
    // Non-blocking failure: just log it so the user still proceeds
    console.error("[auth] Welcome email send error:", err);
  }
}
