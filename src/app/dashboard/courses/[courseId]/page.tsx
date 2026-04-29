import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { CourseVideoClient } from "./CourseVideoClient";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

// Server-side Supabase client (anon key is fine for public course data)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseId } = await params;

  const { data: course } = await supabase
    .from("raw_courses")
    .select("id, title, description, image_url, category, level")
    .eq("id", courseId)
    .single();

  if (!course) {
    return {
      title: "Course Not Found",
      description: "This course could not be found on Beyond Intern.",
    };
  }

  const title = `${course.title} | Beyond Intern`;
  const description =
    course.description ||
    `Enroll in ${course.title} on Beyond Intern — a ${course.level ?? ""} ${course.category ?? ""} course with placement support and lifetime access.`;

  const courseUrl = `https://www.beyondintern.com/dashboard/courses/${course.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: courseUrl,
    },
    openGraph: {
      type: "article",
      url: courseUrl,
      title,
      description,
      siteName: "Beyond Intern",
      images: course.image_url
        ? [{ url: course.image_url, width: 1200, height: 630, alt: `${course.title} course cover image on Beyond Intern` }]
        : [{ url: "/og-default.png", width: 1200, height: 630, alt: "Beyond Intern — Premium EdTech Platform" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: course.image_url ? [course.image_url] : ["/og-default.png"],
    },
  };
}

export default async function CourseVideoPage({ params }: PageProps) {
  const { courseId } = await params;
  return <CourseVideoClient courseId={courseId} />;
}