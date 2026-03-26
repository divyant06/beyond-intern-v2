"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CoursesPage() {
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

      {/* Empty state */}
      <div className="glass-card rounded-2xl p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-electric/3 via-transparent to-gold/3" />
        <div className="relative">
          <div className="mx-auto mb-5 h-20 w-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Search className="h-10 w-10 text-slate-500" />
          </div>
          <h2 className="text-xl font-semibold text-white">
            No courses yet
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto">
            You haven&apos;t enrolled in any courses yet. Browse our catalog of
            28 industry-aligned programmes to start your learning journey.
          </p>
          <Link href="/#courses">
            <Button className="mt-6 gradient-electric text-white font-semibold rounded-full px-8 glow-blue hover:opacity-90 transition-opacity">
              Explore Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
