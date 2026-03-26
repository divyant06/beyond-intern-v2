"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { courseData, type Course } from "@/lib/courses";

// ── Category config ────────────────────────────────────────────────────────────
const categoryConfig: Record<
  string,
  { icon: string; gradient: string; color: string; image: string }
> = {
  "Technical Skills": {
    icon: "💻",
    gradient: "from-blue-600/30 to-cyan-500/20",
    color: "text-blue-400",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
  },
  "Analytical Skills": {
    icon: "📊",
    gradient: "from-emerald-600/30 to-teal-500/20",
    color: "text-emerald-400",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  "Marketing & Sales": {
    icon: "📢",
    gradient: "from-orange-600/30 to-amber-500/20",
    color: "text-amber-400",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  "Professional & Soft Skills": {
    icon: "🧠",
    gradient: "from-purple-600/30 to-pink-500/20",
    color: "text-purple-400",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
  },
  "Finance & Investment": {
    icon: "📈",
    gradient: "from-green-600/30 to-emerald-500/20",
    color: "text-green-400",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
  },
  "Creative Skills": {
    icon: "🎨",
    gradient: "from-rose-600/30 to-fuchsia-500/20",
    color: "text-rose-400",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
  },
  "Career Readiness": {
    icon: "🚀",
    gradient: "from-indigo-600/30 to-violet-500/20",
    color: "text-indigo-400",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
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
function CourseCard({ course, index }: { course: Course; index: number }) {
  const config = categoryConfig[course.category] ?? categoryConfig["Technical Skills"];

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
          src={config.image}
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

        {/* Price badge top-right */}
        <div className="absolute top-3 right-3 z-10">
          {course.price === null ? (
            <Badge className="bg-emerald/20 text-emerald border-emerald/30 text-xs font-semibold">
              Complimentary
            </Badge>
          ) : (
            <Badge className="bg-electric/20 text-electric-light border-electric/30 text-xs font-bold">
              £{course.price}
            </Badge>
          )}
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
            {course.weeklyCommitment}/wk
          </span>
        </div>

        {/* Career outcomes */}
        <div className="mt-3 flex flex-wrap gap-1">
          {course.outcomes.slice(0, 2).map((outcome) => (
            <span
              key={outcome}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/8"
            >
              {outcome}
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
          <div>
            {course.price === null ? (
              <span className="text-sm font-semibold text-emerald">
                Included Free
              </span>
            ) : (
              <span className="text-xl font-bold text-white">£{course.price}</span>
            )}
          </div>
          <Link href={course.price === null ? "#" : `/checkout?course=${course.id}`}>
            <Button
              size="sm"
              className="gradient-electric text-white rounded-full px-5 text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              {course.price === null ? "Learn More" : "Enroll Now"}
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
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered =
    activeFilter === "All"
      ? courseData
      : courseData.filter((c) => c.category === activeFilter);

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
          <Badge className="bg-gold/10 text-gold-light border-gold/20 mb-4">
            Full Skill Catalog
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Learn from the <span className="gradient-text">Best in Industry</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            28 industry-aligned courses across 7 skill tracks. All priced in GBP
            with lifetime access and a certificate of completion.
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
              onClick={() => setActiveFilter(cat)}
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

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>

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
