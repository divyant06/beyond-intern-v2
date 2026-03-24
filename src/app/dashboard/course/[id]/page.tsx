"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  CheckCircle2,
  Circle,
  Clock,
  ArrowLeft,
  BookOpen,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

const courseModules = [
  {
    section: "Getting Started",
    modules: [
      { id: "1", title: "Course Overview & Setup", duration: "12 min", completed: true },
      { id: "2", title: "Development Environment", duration: "18 min", completed: true },
      { id: "3", title: "Your First Project", duration: "25 min", completed: true },
    ],
  },
  {
    section: "Core Fundamentals",
    modules: [
      { id: "4", title: "HTML & Semantic Markup", duration: "32 min", completed: true },
      { id: "5", title: "CSS Layouts & Flexbox", duration: "45 min", completed: true },
      { id: "6", title: "JavaScript Essentials", duration: "50 min", completed: true },
      { id: "7", title: "DOM Manipulation", duration: "38 min", completed: false },
    ],
  },
  {
    section: "Backend Development",
    modules: [
      { id: "8", title: "Node.js & Express", duration: "55 min", completed: false },
      { id: "9", title: "Building REST APIs", duration: "48 min", completed: false },
      { id: "10", title: "Database Design with PostgreSQL", duration: "42 min", completed: false },
      { id: "11", title: "Authentication & Security", duration: "35 min", completed: false },
    ],
  },
  {
    section: "Advanced Topics",
    modules: [
      { id: "12", title: "React & Next.js", duration: "60 min", completed: false },
      { id: "13", title: "State Management", duration: "40 min", completed: false },
      { id: "14", title: "Deployment & CI/CD", duration: "30 min", completed: false },
      { id: "15", title: "Final Project", duration: "90 min", completed: false },
    ],
  },
];

export default function CoursePage() {
  const [activeModule, setActiveModule] = useState("7");
  const [isPlaying, setIsPlaying] = useState(false);

  const totalModules = courseModules.reduce((acc, s) => acc + s.modules.length, 0);
  const completedModules = courseModules.reduce(
    (acc, s) => acc + s.modules.filter((m) => m.completed).length, 0
  );
  const progress = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="flex gap-6 h-[calc(100vh-5rem)]">
      {/* Video area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Back button */}
        <div className="mb-4">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-white/5 -ml-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Video player */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl overflow-hidden shrink-0"
          >
          <div className="relative aspect-video bg-linear-to-br from-electric/20 to-navy-lighter flex items-center justify-center">
            <div className="absolute inset-0 bg-navy/60" />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full glass glow-blue cursor-pointer"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8 text-white" />
              ) : (
                <Play className="h-8 w-8 text-white fill-white ml-1" />
              )}
            </motion.button>

            {/* Video controls bar */}
            <div className="absolute bottom-0 left-0 right-0 z-10 glass p-3 flex items-center gap-4">
              <span className="text-xs text-slate-300">12:34 / 38:00</span>
              <div className="flex-1 h-1 bg-white/10 rounded-full">
                <div className="h-full w-1/3 bg-electric rounded-full" />
              </div>
              <span className="text-xs text-slate-300">1x</span>
            </div>
          </div>
        </motion.div>

        {/* Module info */}
        <div className="mt-4 glass-card rounded-2xl p-5">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <Badge className="bg-electric/10 text-electric-light border-electric/20 text-xs mb-2">
                Module 7 of {totalModules}
              </Badge>
              <h2 className="text-xl font-semibold text-white">DOM Manipulation</h2>
              <p className="text-sm text-slate-400 mt-1">
                Learn to interact with the Document Object Model using vanilla JavaScript.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-white/10 text-slate-300 hover:bg-white/5"
              >
                <Download className="mr-1 h-3 w-3" />
                Resources
              </Button>
              <Button
                size="sm"
                className="gradient-electric text-white text-xs rounded-full hover:opacity-90"
              >
                Mark Complete
                <CheckCircle2 className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Module sidebar */}
      <div className="w-80 shrink-0 hidden xl:flex flex-col glass-card rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-electric-light" />
            Course Modules
          </h3>
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">{completedModules} of {totalModules} complete</span>
              <span className="font-medium text-electric-light">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1 bg-white/5" />
          </div>
        </div>

        <ScrollArea className="flex-1 p-3">
          {courseModules.map((section) => (
            <div key={section.section} className="mb-4">
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-2 mb-2">
                {section.section}
              </h4>
              <div className="space-y-0.5">
                {section.modules.map((mod) => (
                  <motion.button
                    key={mod.id}
                    whileHover={{ x: 2 }}
                    onClick={() => setActiveModule(mod.id)}
                    className={`w-full flex items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors ${
                      activeModule === mod.id
                        ? "bg-electric/10 text-electric-light"
                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                    }`}
                  >
                    {mod.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald shrink-0" />
                    ) : activeModule === mod.id ? (
                      <Play className="h-4 w-4 text-electric-light shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">{mod.title}</p>
                      <p className="text-[10px] text-slate-600 flex items-center gap-1 mt-0.5">
                        <Clock className="h-2.5 w-2.5" />
                        {mod.duration}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
