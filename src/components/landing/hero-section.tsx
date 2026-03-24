"use client";

import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { ArrowRight, Play, Users, BookOpen, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  { icon: Users, value: "10,000+", label: "Active Students" },
  { icon: BookOpen, value: "50+", label: "Expert Courses" },
  { icon: Award, value: "95%", label: "Completion Rate" },
  { icon: Star, value: "4.9/5", label: "Avg. Rating" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const easeOut: Easing = [0.25, 0.1, 0.25, 1];

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-electric/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-gold/8 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-electric/5 blur-[200px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-electric-light mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-electric-light" />
                </span>
                New: AI-Powered Learning Paths
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Your Career,{" "}
              <span className="gradient-text">Beyond</span>{" "}
              the Ordinary
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl max-w-lg"
            >
              Master in-demand skills with expert-led courses, live webinars,
              and a global community of ambitious professionals.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
              <Link href="#courses">
                <Button
                  size="lg"
                  className="gradient-electric text-white font-semibold rounded-full px-8 h-12 text-base glow-blue hover:opacity-90 transition-opacity"
                >
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#webinars">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 h-12 text-base border-white/20 text-white hover:bg-white/5"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </Link>
            </motion.div>

            {/* Trust logos placeholder */}
            <motion.div variants={item} className="mt-12">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">
                Trusted by teams at
              </p>
              <div className="flex flex-wrap items-center gap-6">
                {["Google", "Microsoft", "Meta", "Amazon", "IBM"].map((co) => (
                  <span
                    key={co}
                    className="text-sm font-medium text-slate-500/60 tracking-wide"
                  >
                    {co}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Floating stat cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Main glass card */}
            <div className="relative mx-auto w-[420px] h-[420px]">
              {/* Decorative ring */}
              <div className="absolute inset-4 rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: "30s" }} />
              <div className="absolute inset-12 rounded-full border border-dashed border-electric/10 animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }} />

              {/* Stat cards floating around */}
              {stats.map((stat, i) => {
                const positions = [
                  "top-0 left-1/2 -translate-x-1/2",
                  "top-1/2 right-0 -translate-y-1/2",
                  "bottom-0 left-1/2 -translate-x-1/2",
                  "top-1/2 left-0 -translate-y-1/2",
                ];
                return (
                  <motion.div
                    key={stat.label}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                    className={`absolute ${positions[i]} z-10`}
                  >
                    <div className="glass-card rounded-2xl p-4 min-w-[140px] text-center hover:scale-105 transition-transform cursor-default">
                      <stat.icon className="mx-auto mb-2 h-5 w-5 text-electric-light" />
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}

              {/* Center badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-card rounded-2xl p-6 text-center animate-pulse-glow">
                <div className="text-3xl font-bold gradient-text">BI</div>
                <p className="text-xs text-slate-400 mt-1">Premium</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
