"use server";

import { createClient } from "@supabase/supabase-js";

// We use the Service Role Key here to bypass RLS and force the course assignment
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ─── EXISTING: Assign a course to a student ────────────────────────────────────
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

// ─── NEW: Upsert a course into raw_courses table ───────────────────────────────
export async function upsertCourse(coursePayload: {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  outcomes: string;
}) {
  try {
    const { error } = await supabaseAdmin.from("raw_courses").upsert(
      {
        id: coursePayload.id,
        title: coursePayload.title.trim(),
        description: coursePayload.description.trim(),
        category: coursePayload.category.trim(),
        duration: coursePayload.duration.trim(),
        level: coursePayload.level.trim(),
        outcomes: coursePayload.outcomes.trim(),
      },
      { onConflict: "id" }
    );

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Upsert course error:", error);
    return { success: false, message: "Failed to publish course. Please try again." };
  }
}

// ─── NEW: Delete a course from raw_courses table ───────────────────────────────
export async function deleteCourse(courseId: string) {
  try {
    const { error } = await supabaseAdmin
      .from("raw_courses")
      .delete()
      .eq("id", courseId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Delete course error:", error);
    return { success: false, message: "Failed to remove course." };
  }
}

// ─── NEW: Fetch all published courses from raw_courses ─────────────────────────
export async function fetchAllCourses() {
  try {
    const { data, error } = await supabaseAdmin
      .from("raw_courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Fetch courses error:", error);
    return [];
  }
}

// ─── NEW: Fetch all registered users from auth.users ───────────────────────────
export async function fetchRegisteredUsers() {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      perPage: 1000,
    });

    if (error) throw error;

    const users = (data?.users || []).map((u) => ({
      id: u.id,
      email: u.email || "No email",
      created_at: u.created_at,
    }));

    return users;
  } catch (error) {
    console.error("Fetch users error:", error);
    return [];
  }
}

// ─── NEW: Fetch all active enrollments from user_courses ───────────────────────
export async function fetchActiveEnrollments() {
  try {
    const { data, error } = await supabaseAdmin
      .from("user_courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Fetch enrollments error:", error);
    return [];
  }
}