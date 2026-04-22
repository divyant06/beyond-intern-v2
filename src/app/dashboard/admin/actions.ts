"use server";

import { createClient } from "@supabase/supabase-js";
import { courseData } from "@/lib/courses";

// We use the Service Role Key here to bypass RLS and force the course assignment
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Static image map for migration ─────────────────────────────────────────────
const CATEGORY_IMAGES: Record<string, string> = {
  "Technical Skills":
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
  "Analytical Skills":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  "Marketing & Sales":
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  "Professional & Soft Skills":
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  "Finance & Investment":
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  "Creative Skills":
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  "Career Readiness":
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
};

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

// ─── Upsert a course into raw_courses table (with image_url + curriculum) ──────
export async function upsertCourse(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const duration = formData.get("duration") as string;
    const level = formData.get("level") as string;
    const outcomes = formData.get("outcomes") as string;
    const price = formData.get("price") as string | null;
    let image_url = formData.get("image_url") as string | null;
    const curriculum = formData.get("curriculum") as string | null;
    const file = formData.get("image") as File | null;

    if (file && file.size > 0) {
      if (file.size > 500 * 1024) {
        return { success: false, message: "Image exceeds 500KB limit." };
      }

      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from("course_images")
        .upload(fileName, file, { contentType: file.type });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return { success: false, message: "Failed to upload image." };
      }

      const {
        data: { publicUrl },
      } = supabaseAdmin.storage.from("course_images").getPublicUrl(fileName);

      image_url = publicUrl;
    }

    const { error } = await supabaseAdmin.from("raw_courses").upsert(
      {
        id,
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        duration: duration.trim(),
        level: level.trim(),
        outcomes: outcomes.trim(),
        price: (price || "").trim() || null,
        image_url: (image_url || "").trim() || null,
        curriculum: (curriculum || "").trim() || null,
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

// ─── Delete a course from raw_courses table ────────────────────────────────────
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

// ─── Fetch all published courses from raw_courses ──────────────────────────────
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

// ─── Fetch all registered users from auth.users ────────────────────────────────
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

// ─── Fetch all active enrollments from user_courses ────────────────────────────
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

// ─── Migrate all hardcoded courses from courseData into raw_courses ─────────────
export async function migrateHardcodedCourses() {
  try {
    const rows = courseData.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      category: c.category,
      duration: c.duration,
      level: c.level,
      outcomes: c.outcomes.join("\n"),
      image_url: CATEGORY_IMAGES[c.category] || null,
      curriculum: null,
    }));

    const { error } = await supabaseAdmin
      .from("raw_courses")
      .upsert(rows, { onConflict: "id" });

    if (error) throw error;
    return { success: true, count: rows.length };
  } catch (error) {
    console.error("Migration error:", error);
    return { success: false, message: "Migration failed. Check console for details." };
  }
}

// ─── Upsert the active webinar ─────────────────────────────────────────────────
export async function upsertWebinar(data: {
  id?: string;
  title: string;
  speaker: string;
  webinar_date: string;
  webinar_time: string;
}) {
  try {
    if (data.id) {
      // Update existing
      const { error } = await supabaseAdmin
        .from("webinars")
        .update({
          title: data.title.trim(),
          speaker: data.speaker.trim(),
          webinar_date: data.webinar_date.trim(),
          webinar_time: data.webinar_time.trim(),
          is_active: true,
        })
        .eq("id", data.id);
      if (error) throw error;
    } else {
      // Deactivate all first, then insert a new active one
      await supabaseAdmin.from("webinars").update({ is_active: false }).eq("is_active", true);
      const { error } = await supabaseAdmin.from("webinars").insert({
        title: data.title.trim(),
        speaker: data.speaker.trim(),
        webinar_date: data.webinar_date.trim(),
        webinar_time: data.webinar_time.trim(),
        is_active: true,
      });
      if (error) throw error;
    }
    return { success: true };
  } catch (error) {
    console.error("Upsert webinar error:", error);
    return { success: false, message: "Failed to save webinar." };
  }
}

// ─── Get the single active webinar ────────────────────────────────────────────
export async function getActiveWebinar() {
  try {
    const { data, error } = await supabaseAdmin
      .from("webinars")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data ?? null;
  } catch (error) {
    console.error("Get active webinar error:", error);
    return null;
  }
}

// ─── Get all webinar registrations ────────────────────────────────────────────
export async function getWebinarRegistrations() {
  try {
    const { data, error } = await supabaseAdmin
      .from("webinar_registrations")
      .select("id, full_name, email, created_at, webinar_id")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Get registrations error:", error);
    return [];
  }
}

// ─── Register a user for the active webinar ────────────────────────────────────
export async function registerForWebinar(formData: { full_name: string; email: string }) {
  try {
    // Get the active webinar ID
    const webinar = await getActiveWebinar();
    if (!webinar) {
      return { success: false, message: "No active webinar found. Please try again later." };
    }

    const { error } = await supabaseAdmin.from("webinar_registrations").insert({
      webinar_id: webinar.id,
      full_name: formData.full_name.trim(),
      email: formData.email.trim().toLowerCase(),
    });

    if (error) {
      // Unique constraint violation
      if (error.code === "23505") {
        return { success: false, message: "You are already registered for this webinar!" };
      }
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Register for webinar error:", error);
    return { success: false, message: "Registration failed. Please try again." };
  }
}

// ─── Send Notification ────────────────────────────────────────────────────────
export async function sendNotification(data: {
  title: string;
  message: string;
  type: "broadcast" | "direct";
  course_id?: string;
  target_email?: string;
}) {
  try {
    const { error } = await supabaseAdmin.from("notifications").insert({
      title: data.title.trim(),
      message: data.message.trim(),
      type: data.type,
      course_id: data.type === "broadcast" ? data.course_id : null,
      target_email: data.type === "direct" ? data.target_email?.toLowerCase().trim() : null,
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Send notification error:", error);
    return { success: false, message: "Failed to send notification." };
  }
}

// ─── Fetch Notifications for a User ───────────────────────────────────────────
export async function fetchNotifications(userEmail: string) {
  try {
    // 1. Get the user's enrolled courses
    const { data: enrollments } = await supabaseAdmin
      .from("user_courses")
      .select("course_id")
      .eq("user_email", userEmail);

    const enrolledCourseIds = (enrollments || []).map((e) => e.course_id);

    // 2. Fetch notifications where target_email = userEmail OR course_id is in enrolledCourseIds
    let query = supabaseAdmin
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    // Build the "or" string. Since Supabase "or" takes a single string, we must construct it carefully.
    const orConditions = [];
    orConditions.push(`target_email.eq.${userEmail}`);
    if (enrolledCourseIds.length > 0) {
      orConditions.push(`course_id.in.(${enrolledCourseIds.join(",")})`);
    }

    query = query.or(orConditions.join(","));

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Fetch notifications error:", error);
    return [];
  }
}