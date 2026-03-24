"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle, PartyPopper, ArrowRight, Download, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#F43F5E", "#8B5CF6"];

function generateParticles() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (((i * 37 + 13) % 100) / 100 - 0.5) * 400,
    y: (((i * 53 + 7) % 100) / 100 - 0.5) * 400,
    rotate: ((i * 71 + 29) % 360),
    duration: 2 + ((i * 43) % 200) / 100,
    delay: ((i * 31) % 50) / 100,
    repeatDelay: ((i * 67) % 300) / 100,
    color: COLORS[i % 5],
  }));
}

export default function CheckoutSuccess() {
  const particles = useMemo(() => generateParticles(), []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-emerald/8 blur-[200px]" />

      {/* Confetti-like particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], x: p.x, y: p.y, rotate: p.rotate }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatDelay: p.repeatDelay,
          }}
          className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full"
          style={{ background: p.color }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-lg mx-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald/20 glow-blue"
          style={{ boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)" }}
        >
          <CheckCircle className="h-10 w-10 text-emerald" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <PartyPopper className="h-6 w-6 text-gold" />
            <span className="text-sm font-medium text-gold-light">Congratulations!</span>
            <PartyPopper className="h-6 w-6 text-gold" />
          </div>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Payment Successful!
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Welcome to the Beyond Intern family. Your course is now unlocked and
            ready to go.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 glass-card rounded-2xl p-6 text-left"
        >
          <h3 className="text-sm font-semibold text-white mb-4">Next Steps:</h3>
          <div className="space-y-3">
            {[
              { icon: GraduationCap, text: "Your course has been added to your dashboard" },
              { icon: Download, text: "Download resources and materials" },
              { icon: CheckCircle, text: "Join the private student community" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                <step.icon className="h-4 w-4 text-emerald shrink-0" />
                {step.text}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/dashboard">
            <Button className="gradient-electric text-white font-semibold rounded-full px-8 h-12 glow-blue hover:opacity-90 transition-opacity">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="rounded-full px-8 h-12 border-white/15 text-white hover:bg-white/5">
              Browse More Courses
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
