"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  ArrowRight,
} from "lucide-react";

// Features — first two link to the live dashboard, rest are informational
const adminFeatures = [
  {
    icon: BookOpen,
    label: "Course Management",
    description: "Create, edit, and publish courses",
    href: "/dashboard/admin",
    live: true,
  },
  {
    icon: Users,
    label: "Student Analytics",
    description: "Track enrollment and engagement",
    href: "/dashboard/admin",
    live: true,
  },
  {
    icon: BarChart3,
    label: "Revenue Dashboard",
    description: "Monitor payments and revenue",
    href: null,
    live: false,
  },
  {
    icon: Settings,
    label: "Platform Settings",
    description: "Configure site-wide preferences",
    href: null,
    live: false,
  },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      {/* Background effects */}
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-electric/8 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl w-full text-center"
      >
        {/* Shield icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-8 h-20 w-20 rounded-2xl gradient-electric flex items-center justify-center glow-blue"
        >
          <Shield className="h-10 w-10 text-white" />
        </motion.div>

        {/* Badge */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-electric-light mb-6"
        >
          <LayoutDashboard className="h-4 w-4" />
          Admin Portal
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-white sm:text-5xl mb-4"
        >
          Course{" "}
          <span className="gradient-text">Management Suite</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-slate-400 max-w-lg mx-auto mb-12"
        >
          A powerful admin dashboard to manage courses, students, and platform
          analytics. Click any live feature below to get started.
        </motion.p>

        {/* Feature grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {adminFeatures.map((feature, i) => {
            const card = (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className={`glass-card rounded-xl p-5 text-left border transition-all group ${
                  feature.live
                    ? "border-electric/20 hover:border-electric/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] cursor-pointer"
                    : "border-white/5 hover:border-white/10 opacity-70"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      feature.live
                        ? "bg-electric/10 group-hover:bg-electric/25"
                        : "bg-electric/5"
                    }`}
                  >
                    <feature.icon className="h-5 w-5 text-electric-light" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">
                        {feature.label}
                      </h3>
                      {feature.live ? (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                          LIVE
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/5 text-slate-500 border border-white/10">
                          SOON
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {feature.description}
                    </p>
                  </div>
                  {feature.live && (
                    <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-electric-light group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                  )}
                </div>
              </motion.div>
            );

            return feature.href ? (
              <Link key={feature.label} href={feature.href}>
                {card}
              </Link>
            ) : (
              <div key={feature.label}>{card}</div>
            );
          })}
        </motion.div>

        {/* Live indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-10 flex items-center justify-center gap-2 text-slate-500 text-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          Dashboard is live — click Course Management or Student Analytics to enter
        </motion.div>
      </motion.div>
    </div>
  );
}
