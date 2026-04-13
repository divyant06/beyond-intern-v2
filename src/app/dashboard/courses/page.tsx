"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  ArrowRight,
  Search,
  Play,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";
import { courseData } from "@/lib/courses";

interface UserCourse {
  course_id: string;
  created_at: string;
}

export default function CoursesPage() {
  const { data: session, status } = useSession();
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEnrolledCourses() {
      if (!session?.user?.email) return;
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("user_courses")
          .select("course_id, created_at")
          .eq("user_email", session.user.email);

        if (error) throw error;
        setUserCourses(data || []);
      } catch (err) {
        console.error("Failed to fetch enrolled courses:", err);
        setUserCourses([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchEnrolledCourses();
    } else if (status !== "loading") {
      setIsLoading(false);
    }
  }, [session, status]);

  const enrolledCourseDetails = userCourses
    .map((uc) => ({
      ...courseData.find((c) => c.id === uc.course_id),
      enrolledAt: uc.created_at,
    }))
    .filter(Boolean);

  if (isLoading || status === "loading") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-electric-light" />
            My Courses
          </h1>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-52 rounded-2xl glass-card animate-pulse bg-white/5"
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-electric-light" />
          My Courses
        </h1>
        {enrolledCourseDetails.length > 0 && (
          <span className="text-sm text-slate-400">
            {enrolledCourseDetails.length} course
            {enrolledCourseDetails.length !== 1 ? "s" : ""} enrolled
          </span>
        )}
      </div>

      {enrolledCourseDetails.length === 0 ? (
        /* Empty state */
        <div className="glass-card rounded-2xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-electric/3 via-transparent to-gold/3" />
          <div className="relative">
            <div className="mx-auto mb-5 h-20 w-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Search className="h-10 w-10 text-slate-500" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              No courses assigned yet
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto">
              You haven&apos;t been enrolled in any courses yet. Browse our
              catalog of 30+ industry-aligned programmes or contact support.
            </p>
            <Link href="/#courses">
              <Button className="mt-6 gradient-electric text-white font-semibold rounded-full px-8 glow-blue hover:opacity-90 transition-opacity">
                Explore Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Course grid */
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledCourseDetails.map((course, i) => (
            <motion.div
              key={course!.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group"
            >
              {/* Card header gradient */}
              <div className="h-2 bg-linear-to-r from-electric via-electric-light to-gold" />

              <div className="flex flex-1 flex-col p-6 gap-4">
                {/* Category pill */}
                <span className="self-start text-xs font-medium px-3 py-1 rounded-full bg-electric/10 text-electric-light border border-electric/20">
                  {course!.category}
                </span>

                <div className="flex-1">
                  <h2 className="text-base font-semibold text-white leading-snug group-hover:text-electric-light transition-colors">
                    {course!.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-400 line-clamp-2">
                    {course!.description}
                  </p>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {course!.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    {course!.level}
                  </span>
                </div>

                {/* CTA */}
                <Link href={`/dashboard/courses/${course!.id}`}>
                  <Button className="w-full gradient-electric text-white font-semibold rounded-xl glow-blue hover:opacity-90 transition-opacity text-sm">
                    <Play className="mr-2 h-4 w-4" />
                    Start Learning
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
