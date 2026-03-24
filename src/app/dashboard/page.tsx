"use client";

import { motion } from "framer-motion";
import {
  Play,
  Clock,
  Star,
  Trophy,
  Award,
  Bell,
  ChevronRight,
  BookOpen,
  Target,
  Flame,
  Medal,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const activeCourses = [
  {
    id: "1",
    title: "Full-Stack Web Development Masterclass",
    instructor: "Dr. Sarah Chen",
    progress: 68,
    nextModule: "Building REST APIs with Node.js",
    totalModules: 42,
    completedModules: 28,
    gradient: "from-blue-600/30 to-cyan-500/20",
  },
  {
    id: "2",
    title: "Data Science & ML with Python",
    instructor: "Prof. Mark Williams",
    progress: 35,
    nextModule: "Neural Networks Deep Dive",
    totalModules: 56,
    completedModules: 20,
    gradient: "from-emerald-600/30 to-teal-500/20",
  },
  {
    id: "3",
    title: "UX/UI Design Fundamentals",
    instructor: "Lisa Nakamura",
    progress: 90,
    nextModule: "Final Project Submission",
    totalModules: 38,
    completedModules: 34,
    gradient: "from-purple-600/30 to-pink-500/20",
  },
];

const notifications = [
  {
    id: "1",
    text: "New webinar: AI in Software Engineering — March 28",
    time: "2 hours ago",
    type: "event",
  },
  {
    id: "2",
    text: "Your UX/UI Design certificate is almost ready!",
    time: "5 hours ago",
    type: "achievement",
  },
  {
    id: "3",
    text: "Dr. Sarah Chen posted a new module: REST Best Practices",
    time: "1 day ago",
    type: "course",
  },
];

const badges = [
  { icon: Flame, label: "7-Day Streak", earned: true, gradient: "from-orange-500 to-red-500" },
  { icon: Target, label: "Fast Learner", earned: true, gradient: "from-blue-500 to-cyan-500" },
  { icon: Trophy, label: "Quiz Master", earned: true, gradient: "from-gold to-amber-600" },
  { icon: Star, label: "Top 10%", earned: false, gradient: "from-purple-500 to-pink-500" },
  { icon: Medal, label: "Completionist", earned: false, gradient: "from-emerald-500 to-teal-500" },
  { icon: Award, label: "Mentor", earned: false, gradient: "from-indigo-500 to-violet-500" },
];

const certifications = [
  { id: "1", title: "Full-Stack Fundamentals", status: "earned", date: "Feb 2026" },
  { id: "2", title: "UX/UI Design Principles", status: "in-progress", date: "Expected Apr 2026" },
  { id: "3", title: "Data Science Foundations", status: "locked", date: "" },
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
            Welcome back, <span className="gradient-text">Student</span> 👋
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            You&apos;ve completed 68% of your current course. Keep up the great work!
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <BookOpen className="h-4 w-4 text-electric-light" />
              3 Active Courses
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Flame className="h-4 w-4 text-orange-400" />
              7-day streak
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="h-4 w-4 text-gold" />
              12.5 hrs this week
            </div>
          </div>
        </div>
      </motion.div>

      {/* Active Courses */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Active Courses</h2>
          <Button
            variant="ghost"
            className="text-sm text-slate-400 hover:text-white"
          >
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {activeCourses.map((course) => (
            <Link key={course.id} href={`/dashboard/course/${course.id}`}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
              >
                <div className={`h-24 bg-linear-to-br ${course.gradient} relative`}>
                  <div className="absolute inset-0 bg-navy/30" />
                  <div className="absolute bottom-3 left-4 z-10">
                    <Badge className="bg-black/40 text-white border-transparent text-[10px]">
                      {course.completedModules}/{course.totalModules} modules
                    </Badge>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-1/2 right-4 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full glass"
                  >
                    <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                  </motion.div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-electric-light transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{course.instructor}</p>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-400">Progress</span>
                      <span className="font-medium text-electric-light">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5 bg-white/5" />
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    Next: <span className="text-slate-300">{course.nextModule}</span>
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
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
          </div>
          <div className="glass-card rounded-2xl p-4 space-y-3">
            {notifications.map((notif) => (
              <motion.div
                key={notif.id}
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 rounded-xl p-3 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                  notif.type === "event" ? "bg-electric" :
                  notif.type === "achievement" ? "bg-gold" : "bg-emerald"
                }`} />
                <div className="min-w-0">
                  <p className="text-sm text-slate-300">{notif.text}</p>
                  <p className="text-[11px] text-slate-600 mt-1">{notif.time}</p>
                </div>
              </motion.div>
            ))}
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
                  whileHover={badge.earned ? { scale: 1.05, y: -2 } : {}}
                  className={`flex flex-col items-center rounded-xl p-3 text-center ${
                    badge.earned
                      ? "cursor-pointer"
                      : "opacity-30 grayscale"
                  }`}
                >
                  <div className={`h-12 w-12 rounded-full bg-linear-to-br ${badge.gradient} flex items-center justify-center mb-2 ${
                    badge.earned ? "glow-blue" : ""
                  }`}>
                    <badge.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-slate-300">{badge.label}</span>
                  <span className="text-[10px] text-slate-600 mt-0.5">
                    {badge.earned ? "Earned" : "Locked"}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Certifications */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald" />
            Certifications
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className={`glass-card rounded-2xl p-5 ${
                cert.status === "locked" ? "opacity-40" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">{cert.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{cert.date}</p>
                </div>
                <Badge
                  className={`text-[10px] ${
                    cert.status === "earned"
                      ? "bg-emerald/20 text-emerald border-emerald/30"
                      : cert.status === "in-progress"
                      ? "bg-gold/20 text-gold-light border-gold/30"
                      : "bg-white/5 text-slate-500 border-white/10"
                  }`}
                >
                  {cert.status === "earned"
                    ? "✅ Earned"
                    : cert.status === "in-progress"
                    ? "⏳ In Progress"
                    : "🔒 Locked"}
                </Badge>
              </div>
              {cert.status === "earned" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 border-white/10 text-slate-300 hover:bg-white/5 text-xs w-full"
                >
                  <Download className="mr-1 h-3 w-3" />
                  Download Certificate
                </Button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
