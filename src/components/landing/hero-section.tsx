"use client";

import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { ArrowRight, Play, Users, BookOpen, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClientOnly } from "@/components/shared/client-only";

const stats = [
  { icon: Users, value: "10,000+", label: "Active Students" },
  { icon: BookOpen, value: "28", label: "Expert Courses" },
  { icon: Award, value: "95%", label: "Placement Rate" },
  { icon: Star, value: "4.9/5", label: "Avg. Rating" },
];

// Companies to orbit
const COMPANIES = [
  "APPLE",
  "SAMSUNG",
  "AMAZON AWS",
  "TESLA",
  "IBM",
  "MICROSOFT",
  "NESTLÉ",
  "MERCEDES",
  "MORRISONS",
  "GARRISONS",
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

// ─── Orbital ring — Math.cos/sin positions are purely deterministic
//     so they match between server and client. However, Framer Motion's
//     `animate` (infinite rotation) must only run on the client to avoid
//     hydration warnings from internal React reconciliation. This component
//     is always rendered inside <ClientOnly> so that's guaranteed.
function OrbitalRing({
  companies,
  radius,
  duration,
  direction = 1,
  dotColor = "bg-electric/50",
  labelClass = "text-slate-400",
  dotCount = 60,
}: {
  companies: string[];
  radius: number;
  duration: number;
  direction?: 1 | -1;
  dotColor?: string;
  labelClass?: string;
  dotCount?: number;
}) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ rotate: direction * 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {/* Orbit path dots */}
      {Array.from({ length: dotCount }).map((_, i) => {
        const angle = (i / dotCount) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const opacity = i % 6 === 0 ? 0.6 : 0.15;
        return (
          <div
            key={i}
            className={`absolute h-1 w-1 rounded-full ${dotColor}`}
            style={{
              left: `calc(50% + ${x}px - 2px)`,
              top: `calc(50% + ${y}px - 2px)`,
              opacity,
            }}
          />
        );
      })}

      {/* Company labels along the ring */}
      {companies.map((company, i) => {
        const angle = (i / companies.length) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <motion.div
            key={company}
            className="absolute"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{ rotate: direction * -360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
          >
            <div
              className={`glass px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-semibold tracking-widest whitespace-nowrap cursor-default transition-all hover:scale-110 ${labelClass}`}
            >
              {company}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// Stable orbital placeholder — same dimensions, no animations
// Prevents layout shift while ClientOnly waits for mount
function OrbitalFallback() {
  return (
    <div className="relative w-[460px] h-[460px] flex items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-electric/5 blur-3xl" />
      {/* Static dashed ring so the layout slot isn't invisible */}
      <div
        className="absolute inset-0 rounded-full border border-dashed border-white/8"
        style={{ margin: "30px" }}
      />
      {/* Center badge (static version) */}
      <div className="glass-card rounded-2xl px-6 py-5 text-center">
        <div className="text-3xl font-black gradient-text tracking-tight">
          BI
        </div>
        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">
          Premium
        </p>
      </div>
    </div>
  );
}

export function HeroSection() {
  const outerRing = COMPANIES.slice(0, 5);
  const innerRing = COMPANIES.slice(5, 10);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background effects — purely CSS, safe on server */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-electric/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-gold/8 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-electric/5 blur-[200px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Text (Framer Motion enter animations are fine on client components) */}
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

            {/* Trust stats row */}
            <motion.div
              variants={item}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-xl p-3 text-center border border-white/5"
                >
                  <stat.icon className="mx-auto mb-1.5 h-4 w-4 text-electric-light" />
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D Orbital ring system
              Wrapped in ClientOnly to prevent hydration mismatch from
              Framer Motion's infinite animations running during SSR.
              The fallback renders the same-sized container so there's
              no layout shift when the client mounts. */}
          <div className="relative hidden lg:flex items-center justify-center">
            <ClientOnly fallback={<OrbitalFallback />}>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="relative w-[460px] h-[460px]"
              >
                {/* Subtle background glow */}
                <div className="absolute inset-0 rounded-full bg-electric/5 blur-3xl" />

                {/* Outer orbital ring — 5 companies, slow, clockwise */}
                <OrbitalRing
                  companies={outerRing}
                  radius={200}
                  duration={40}
                  direction={1}
                  dotColor="bg-electric/30"
                  labelClass="text-slate-400 hover:text-electric-light"
                  dotCount={72}
                />

                {/* Inner orbital ring — 5 companies, medium, counter-clockwise */}
                <OrbitalRing
                  companies={innerRing}
                  radius={130}
                  duration={28}
                  direction={-1}
                  dotColor="bg-gold/30"
                  labelClass="text-slate-300 hover:text-gold-light"
                  dotCount={48}
                />

                {/* Static decorative ring */}
                <div
                  className="absolute inset-0 rounded-full border border-dashed border-white/5"
                  style={{ margin: "30px" }}
                />

                {/* Center badge — pulsing glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="glass-card rounded-2xl px-6 py-5 text-center glow-blue"
                  >
                    <div
                      className="text-3xl font-black gradient-text tracking-tight"
                      style={{ fontFamily: "inherit" }}
                    >
                      BI
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">
                      Premium
                    </p>
                  </motion.div>
                </div>

                {/* Floating stat cards around the orbital (4 corners) */}
                {[
                  { stat: stats[0], pos: "top-0 left-4", delay: 0 },
                  { stat: stats[1], pos: "top-0 right-4", delay: 0.5 },
                  { stat: stats[2], pos: "bottom-0 left-4", delay: 1 },
                  { stat: stats[3], pos: "bottom-0 right-4", delay: 1.5 },
                ].map(({ stat, pos, delay }) => (
                  <motion.div
                    key={stat.label}
                    className={`absolute ${pos} z-20`}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="glass-card rounded-xl p-3 text-center min-w-[110px] hover:scale-105 transition-transform cursor-default">
                      <stat.icon className="mx-auto mb-1 h-4 w-4 text-electric-light" />
                      <p className="text-base font-bold text-white">
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>
  );
}
