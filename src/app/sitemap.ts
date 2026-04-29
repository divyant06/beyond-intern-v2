import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://www.beyondintern.com";

// Use anon key — sitemap generation is public read-only
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static core routes ────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/webinar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ── Dynamic course routes ─────────────────────────────────────────────────
  let courseRoutes: MetadataRoute.Sitemap = [];

  try {
    const { data: courses, error } = await supabase
      .from("raw_courses")
      .select("id, created_at")
      .order("created_at", { ascending: true });

    if (!error && courses) {
      courseRoutes = courses.map((course) => ({
        url: `${BASE_URL}/dashboard/courses/${course.id}`,
        lastModified: course.created_at ? new Date(course.created_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
    }
  } catch (err) {
    console.error("[sitemap] Failed to fetch courses:", err);
  }

  return [...staticRoutes, ...courseRoutes];
}
