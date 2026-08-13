"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Trophy,
  Award,
  Bell,
  ChevronRight,
  BookOpen,
  Target,
  Flame,
  Medal,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserCourses } from "./courses/actions";

const badges = [
  { icon: Flame, label: "7-Day Streak", earned: false, gradient: "from-orange-500 to-red-500" },
  { icon: Target, label: "Fast Learner", earned: false, gradient: "from-blue-500 to-cyan-500" },
  { icon: Trophy, label: "Quiz Master", earned: false, gradient: "from-gold to-amber-600" },
  { icon: Star, label: "Top 10%", earned: false, gradient: "from-purple-500 to-pink-500" },
  { icon: Medal, label: "Completionist", earned: false, gradient: "from-emerald-500 to-teal-500" },
  { icon: Award, label: "Mentor", earned: false, gradient: "from-indigo-500 to-violet-500" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const displayName =
    session?.user?.name || session?.user?.email?.split("@")[0] || "Student";
    
  const [enrolledCount, setEnrolledCount] = useState(0);
  
  useEffect(() => {
    if (session?.user) {
      getUserCourses().then((courses) => {
        setEnrolledCount(courses.length);
      }).catch(console.error);
    }
  }, [session?.user]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Welcome banner */}
      <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-electric/5 rounded-full blur-[100px]" />
        <div className="relative">
          <h1 className="text-2xl font-bold text-white">
            Welcome, <span className="gradient-text">{displayName}</span> 👋
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Your learning journey starts here. Explore our courses and begin building your future.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <BookOpen className="h-4 w-4 text-electric-light" />
              {enrolledCount} Active Course{enrolledCount !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Flame className="h-4 w-4 text-slate-500" />
              No streak yet
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="h-4 w-4 text-slate-500" />
              0 hrs this week
            </div>
          </div>
        </div>
      </motion.div>

      {/* Get Started CTA */}
      <motion.div variants={fadeUp}>
        <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-electric/5 via-transparent to-gold/5" />
          <div className="relative">
            <div className="mx-auto mb-4 h-16 w-16 rounded-2xl gradient-electric flex items-center justify-center glow-blue">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Start Your Learning Journey</h2>
            <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
              Browse our 30+ industry-aligned courses across 7 skill tracks.
              Enrol in a course to unlock your dashboard progress tracking,
              achievements, and certifications.
            </p>
            <Link href="/#courses">
              <Button className="mt-6 gradient-electric text-white font-semibold rounded-full px-8 glow-blue hover:opacity-90 transition-opacity">
                Browse Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Notifications */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Bell className="h-5 w-5 text-electric-light" />
              Notifications
            </h2>
            <Link href="/dashboard/notifications">
              <Button variant="ghost" className="text-sm text-slate-400 hover:text-white">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-start gap-3 rounded-xl p-3 hover:bg-white/5 transition-colors"
            >
              <div className="mt-0.5 h-2 w-2 rounded-full shrink-0 bg-electric" />
              <div className="min-w-0">
                <p className="text-sm text-slate-300">
                  Welcome to Beyond Intern!  Explore our courses to start your journey.
                </p>
                <p className="text-[11px] text-slate-600 mt-1">Just now</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Trophy className="h-5 w-5 text-gold" />
              Achievements
            </h2>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="grid grid-cols-3 gap-3">
              {badges.map((badge) => (
                <motion.div
                  key={badge.label}
                  className="flex flex-col items-center rounded-xl p-3 text-center opacity-30 grayscale"
                >
                  <div className={`h-12 w-12 rounded-full bg-linear-to-br ${badge.gradient} flex items-center justify-center mb-2`}>
                    <badge.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-slate-300">{badge.label}</span>
                  <span className="text-[10px] text-slate-600 mt-0.5">Locked</span>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-500 mt-4">
              Enrol in a course to start earning badges!
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
