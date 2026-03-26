"use client";

import { motion } from "framer-motion";
import { Shield, LayoutDashboard, BookOpen, Users, Settings, BarChart3 } from "lucide-react";

const comingSoonFeatures = [
  { icon: BookOpen, label: "Course Management", description: "Create, edit, and publish courses" },
  { icon: Users, label: "Student Analytics", description: "Track enrollment and engagement" },
  { icon: BarChart3, label: "Revenue Dashboard", description: "Monitor payments and revenue" },
  { icon: Settings, label: "Platform Settings", description: "Configure site-wide preferences" },
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
          Course Management{" "}
          <span className="gradient-text">Coming Soon</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-slate-400 max-w-lg mx-auto mb-12"
        >
          We&apos;re building a powerful admin dashboard to manage courses,
          students, and platform analytics.
        </motion.p>

        {/* Feature grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {comingSoonFeatures.map((feature, i) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="glass-card rounded-xl p-5 text-left border border-white/5 hover:border-electric/20 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-electric/10 flex items-center justify-center shrink-0 group-hover:bg-electric/20 transition-colors">
                  <feature.icon className="h-5 w-5 text-electric-light" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {feature.label}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pulsing indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-10 flex items-center justify-center gap-2 text-slate-500 text-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric/60 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-electric" />
          </span>
          Under active development
        </motion.div>
      </motion.div>
    </div>
  );
}
