"use server";

import { createClient } from "@supabase/supabase-js";

// We use the Service Role Key here to safely bypass RLS on the server
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getUserCourses(email: string) {
  try {
    const { data: userCourses, error } = await supabaseAdmin
      .from("user_courses")
      .select("course_id, created_at")
      .eq("user_email", email);

    if (error) throw error;
    if (!userCourses || userCourses.length === 0) return [];

    const courseIds = userCourses.map((uc) => uc.course_id);

    // Ensure we opt-out of cache for this fetch (Next.js server action context)
    const { data: rawCourses, error: courseError } = await supabaseAdmin
      .from("raw_courses")
      .select("*")
      .in("id", courseIds);

    if (courseError) throw courseError;

    const coursesMap = new Map(rawCourses?.map((c) => [c.id, c]) || []);

    const enriched = userCourses
      .map((uc) => {
        const courseDetails = coursesMap.get(uc.course_id);
        if (!courseDetails) return null;
        return {
          ...courseDetails,
          enrolledAt: uc.created_at,
        };
      })
      .filter(Boolean);

    return enriched;
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}