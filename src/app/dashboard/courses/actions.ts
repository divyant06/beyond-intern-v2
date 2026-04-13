"use server";

import { createClient } from "@supabase/supabase-js";

// We use the Service Role Key here to safely bypass RLS on the server
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getUserCourses(email: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from("user_courses")
      .select("course_id, created_at")
      .eq("user_email", email);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}