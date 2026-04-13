"use server";

import { createClient } from "@supabase/supabase-js";

// We use the Service Role Key here to bypass RLS and force the course assignment
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function assignCourse(email: string, courseId: string) {
  try {
    const { error } = await supabaseAdmin.from("user_courses").insert({
      user_email: email.trim().toLowerCase(),
      course_id: courseId,
    });

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "This user is already enrolled in that course." };
      }
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Assign error:", error);
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}