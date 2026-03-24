"use client";

import { motion } from "framer-motion";
import { Star, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorRole: string;
  price: number;
  originalPrice: number;
  rating: number;
  students: number;
  duration: string;
  category: string;
  level: string;
  thumbnail: string;
  gradient: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Full-Stack Web Development Masterclass",
    instructor: "Dr. Sarah Chen",
    instructorRole: "Senior Engineer, Google",
    price: 79,
    originalPrice: 149,
    rating: 4.9,
    students: 3420,
    duration: "42 hours",
    category: "Development",
    level: "Beginner to Advanced",
    thumbnail: "/thumbnails/course-1.jpg",
    gradient: "from-blue-600/30 to-cyan-500/20",
  },
  {
    id: "2",
    title: "Data Science & Machine Learning with Python",
    instructor: "Prof. Mark Williams",
    instructorRole: "AI Lead, DeepMind",
    price: 89,
    originalPrice: 179,
    rating: 4.8,
    students: 2890,
    duration: "56 hours",
    category: "Data Science",
    level: "Intermediate",
    thumbnail: "/thumbnails/course-2.jpg",
    gradient: "from-emerald-600/30 to-teal-500/20",
  },
  {
    id: "3",
    title: "UX/UI Design: From Concept to Prototype",
    instructor: "Lisa Nakamura",
    instructorRole: "Design Director, Spotify",
    price: 69,
    originalPrice: 129,
    rating: 4.9,
    students: 1950,
    duration: "38 hours",
    category: "Design",
    level: "All Levels",
    thumbnail: "/thumbnails/course-3.jpg",
    gradient: "from-purple-600/30 to-pink-500/20",
  },
  {
    id: "4",
    title: "Cloud Architecture & DevOps on AWS",
    instructor: "Alex Rivera",
    instructorRole: "Solutions Architect, AWS",
    price: 99,
    originalPrice: 199,
    rating: 4.7,
    students: 2100,
    duration: "48 hours",
    category: "Cloud",
    level: "Intermediate to Advanced",
    thumbnail: "/thumbnails/course-4.jpg",
    gradient: "from-orange-600/30 to-amber-500/20",
  },
  {
    id: "5",
    title: "Product Management & Strategy Bootcamp",
    instructor: "Rachel Torres",
    instructorRole: "VP Product, Stripe",
    price: 59,
    originalPrice: 119,
    rating: 4.8,
    students: 1680,
    duration: "30 hours",
    category: "Business",
    level: "Beginner",
    thumbnail: "/thumbnails/course-5.jpg",
    gradient: "from-rose-600/30 to-red-500/20",
  },
  {
    id: "6",
    title: "Cybersecurity Fundamentals & Ethical Hacking",
    instructor: "David Kim",
    instructorRole: "Security Lead, Microsoft",
    price: 85,
    originalPrice: 169,
    rating: 4.9,
    students: 2340,
    duration: "44 hours",
    category: "Security",
    level: "Beginner to Intermediate",
    thumbnail: "/thumbnails/course-6.jpg",
    gradient: "from-indigo-600/30 to-violet-500/20",
  },
];

function CourseCard({ course, index }: { course: Course; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group glass-card rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <div className={`relative h-48 bg-linear-to-br ${course.gradient} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-navy/30" />
        {/* Category icon */}
        <span className="relative z-10 text-5xl opacity-30 group-hover:opacity-50 transition-opacity">
          {course.category === "Development" && "💻"}
          {course.category === "Data Science" && "📊"}
          {course.category === "Design" && "🎨"}
          {course.category === "Cloud" && "☁️"}
          {course.category === "Business" && "📈"}
          {course.category === "Security" && "🔒"}
        </span>
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          <Badge className="bg-electric/20 text-electric-light border-electric/30 text-xs">
            {course.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-rose/20 text-rose border-rose/30 text-xs font-bold">
            {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Level */}
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {course.level}
        </span>

        <h3 className="mt-2 text-lg font-semibold text-white line-clamp-2 leading-snug group-hover:text-electric-light transition-colors">
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="mt-3 flex items-center gap-2">
          <div className="h-6 w-6 rounded-full gradient-electric flex items-center justify-center text-[10px] font-bold text-white">
            {course.instructor.charAt(0)}
          </div>
          <div>
            <p className="text-xs font-medium text-slate-300">{course.instructor}</p>
            <p className="text-[10px] text-slate-500">{course.instructorRole}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {course.rating}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {course.students.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
        </div>

        {/* Price & CTA */}
        <div className="mt-auto pt-5 flex items-center justify-between border-t border-white/5">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">£{course.price}</span>
            <span className="text-sm text-slate-500 line-through">£{course.originalPrice}</span>
          </div>
          <Link href={`/checkout?course=${course.id}`}>
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

export function CourseGrid() {
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
          className="text-center mb-14"
        >
          <Badge className="bg-gold/10 text-gold-light border-gold/20 mb-4">
            Top Courses
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Learn from the <span className="gradient-text">Best in Industry</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Handcrafted courses by industry leaders. All priced in GBP with
            lifetime access and certificates of completion.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
