"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, BookOpen, Filter, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// ── Supabase client (public anon key — read-only) ──────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── DB course shape ────────────────────────────────────────────────────────────
interface DbCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  outcomes: string;
  image_url?: string | null;
  curriculum?: string | null;
  created_at?: string;
}

// ── Category config ────────────────────────────────────────────────────────────
const categoryConfig: Record<
  string,
  { icon: string; gradient: string; color: string; fallbackImage: string }
> = {
  "Technical Skills": {
    icon: "💻",
    gradient: "from-blue-600/30 to-cyan-500/20",
    color: "text-blue-400",
    fallbackImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
  },
  "Analytical Skills": {
    icon: "📊",
    gradient: "from-emerald-600/30 to-teal-500/20",
    color: "text-emerald-400",
    fallbackImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
  "Marketing & Sales": {
    icon: "📢",
    gradient: "from-orange-600/30 to-amber-500/20",
    color: "text-amber-400",
    fallbackImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  },
  "Professional & Soft Skills": {
    icon: "🧠",
    gradient: "from-purple-600/30 to-pink-500/20",
    color: "text-purple-400",
    fallbackImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  },
  "Finance & Investment": {
    icon: "📈",
    gradient: "from-green-600/30 to-emerald-500/20",
    color: "text-green-400",
    fallbackImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  },
  "Creative Skills": {
    icon: "🎨",
    gradient: "from-rose-600/30 to-fuchsia-500/20",
    color: "text-rose-400",
    fallbackImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  },
  "Career Readiness": {
    icon: "🚀",
    gradient: "from-indigo-600/30 to-violet-500/20",
    color: "text-indigo-400",
    fallbackImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  },
};

const ALL_CATEGORIES = [
  "All",
  "Technical Skills",
  "Analytical Skills",
  "Marketing & Sales",
  "Professional & Soft Skills",
  "Finance & Investment",
  "Creative Skills",
  "Career Readiness",
] as const;

// ── Card ───────────────────────────────────────────────────────────────────────
function CourseCard({ course, index }: { course: DbCourse; index: number }) {
  const config = categoryConfig[course.category] ?? categoryConfig["Technical Skills"];
  const imageUrl = course.image_url || config.fallbackImage;
  const outcomesList = course.outcomes ? course.outcomes.split("\n").filter(Boolean) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group glass-card rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <div
        className={`relative h-44 bg-linear-to-br ${config.gradient} flex items-center justify-center overflow-hidden`}
      >
        <Image
          src={imageUrl}
          alt={course.title}
          fill
          className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-navy/50" />
        <span className="relative z-10 text-5xl opacity-30">
          {config.icon}
        </span>

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-white/10 text-white border-white/20 text-xs backdrop-blur-sm">
            {course.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Level */}
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {course.level}
        </span>

        <h3 className="mt-2 text-base font-semibold text-white line-clamp-2 leading-snug group-hover:text-electric-light transition-colors">
          {course.title}
        </h3>

        <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Stats row */}
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.level}
          </span>
        </div>

        {/* Career outcomes */}
        <div className="mt-3 flex flex-wrap gap-1">
          {outcomesList.slice(0, 2).map((outcome) => (
            <span
              key={outcome}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/8"
            >
              {outcome}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4 flex items-center justify-end border-t border-white/5">
          <Link href={`/dashboard/courses/${course.id}`}>
            <Button
              size="sm"
              className="gradient-electric text-white rounded-full px-5 text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Enroll Now
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Section ───────────────────────────────────────────────────────────────
export function CourseGrid() {
  const [courses, setCourses] = useState<DbCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);

  // Fetch courses from Supabase
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("raw_courses")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data) setCourses(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered =
    activeFilter === "All"
      ? courses
      : courses.filter((c) => c.category === activeFilter);

  const isFiltered = activeFilter !== "All";
  const visibleCourses = isFiltered || showAll ? filtered : filtered.slice(0, 6);
  const hasMore = !isFiltered && !showAll && filtered.length > 6;

  return (
    <section id="courses" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-4">
            Learn from the <span className="gradient-text">Best in Industry</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            {courses.length}+ industry-aligned courses across 7 skill tracks. All priced with lifetime access and a certificate of completion.
          </p>
        </motion.div>

        {/* Category filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-wrap items-center justify-center gap-2"
        >
          <Filter className="h-4 w-4 text-slate-500 mr-1 shrink-0" />
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                setShowAll(false);
              }}
              className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-all ${
                activeFilter === cat
                  ? "gradient-electric text-white border-transparent glow-blue"
                  : "border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-electric animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400">No courses available yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCourses.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>

            {/* View All button */}
            <AnimatePresence>
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-10 flex justify-center"
                >
                  <Button
                    onClick={() => setShowAll(true)}
                    variant="outline"
                    className="rounded-full px-8 py-3 border-white/15 text-white hover:bg-white/5 hover:border-white/25 text-sm font-semibold gap-2 transition-all"
                  >
                    View All {filtered.length} Courses
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="text-slate-400 text-sm mb-4">
            All programs include Career Readiness support & placement assistance.
          </p>
          <Link href="/login">
            <Button className="gradient-electric text-white rounded-full px-8 py-3 font-semibold glow-blue hover:opacity-90 transition-opacity">
              Start Your Journey Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
