"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Heart,
  Flame,
  HandMetal,
  ArrowLeft,
  Radio,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { showToast } from "@/components/ui/toaster";
import Image from "next/image";

const reactions = [
  { icon: Heart, label: "Love", color: "text-rose-400", bg: "bg-rose-500/20 border-rose-500/30" },
  { icon: HandMetal, label: "Clap", color: "text-amber-400", bg: "bg-amber-500/20 border-amber-500/30" },
  { icon: Flame, label: "Fire", color: "text-orange-400", bg: "bg-orange-500/20 border-orange-500/30" },
];

interface FloatingEmoji {
  id: number;
  icon: typeof Heart;
  color: string;
  x: number;
}

export default function LiveTheaterPage() {
  const [floaters, setFloaters] = useState<FloatingEmoji[]>([]);
  const [viewerCount] = useState(1247);

  const handleReaction = (reaction: typeof reactions[0]) => {
    setFloaters((prev) => {
      const id = Date.now() + Math.random();
      setTimeout(() => {
        setFloaters((p) => p.filter((f) => f.id !== id));
      }, 1800);
      return [
        ...prev,
        { id, icon: reaction.icon, color: reaction.color, x: Math.random() * 60 + 20 },
      ];
    });
  };

  const handlePlay = () => {
    showToast({
      title: "Webinars will be available soon live on beyondintern.com! 🍿",
      description: "Thank you for your enrollment! We'll notify you the moment we go live.",
    });
  };

  return (
    <div className="relative min-h-screen bg-[#030714] flex flex-col overflow-hidden">
      {/* ─── Top Bar ─────────────────────────────────────────────────── */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-white/5 backdrop-blur-sm bg-navy-light/40">
        <Link href="/#webinars">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>

        <div className="flex items-center gap-3">
          {/* Live badge */}
          <div className="flex items-center gap-2 bg-rose/20 border border-rose/30 rounded-full px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose" />
            </span>
            <span className="text-rose text-xs font-bold uppercase tracking-wider">Live</span>
          </div>

          {/* Logo */}
          <Image
            src="/logo-transparent.png.png"
            alt="Beyond Intern"
            width={120}
            height={32}
            className="object-contain"
          />
        </div>

        {/* Viewer count */}
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Users className="h-4 w-4" />
          <span>{viewerCount.toLocaleString()} watching</span>
        </div>
      </header>

      {/* ─── Main Theater ─────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-10 relative z-10">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-electric/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

        {/* Webinar title */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-electric/10 border border-electric/20 rounded-full px-4 py-1.5 mb-3">
            <Radio className="h-3.5 w-3.5 text-electric-light animate-pulse" />
            <span className="text-electric-light text-xs font-semibold">
              Boost Your Career &amp; Land Internships · 29th March 2026
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Speaker: <span className="gradient-text">Nandani Sharma</span>
          </h1>
        </motion.div>

        {/* ─── Video Player Shell ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ boxShadow: "0 0 80px rgba(59,130,246,0.12)" }}
        >
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-linear-to-br from-navy-light/90 via-navy/95 to-[#030714]" />
          <div className="absolute inset-0 backdrop-blur-sm" />

          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Scanline shimmer */}
          <motion.div
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-24 bg-linear-to-b from-transparent via-electric/3 to-transparent pointer-events-none"
          />

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">
              Stream initialising...
            </p>

            {/* Play button */}
            <motion.button
              onClick={handlePlay}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex h-20 w-20 items-center justify-center rounded-full gradient-electric glow-blue cursor-pointer"
            >
              {/* Pulse rings */}
              <motion.div
                animate={{ scale: [1, 1.7], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-electric"
              />
              <motion.div
                animate={{ scale: [1, 2.2], opacity: [0.25, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                className="absolute inset-0 rounded-full border border-electric"
              />
              <Play className="h-8 w-8 text-white fill-white ml-1" />
            </motion.button>

            <p className="text-slate-400 text-sm">Click to join the stream</p>
          </div>

          {/* ─── Reaction buttons (bottom-right of video) ─────────────── */}
          <div className="absolute bottom-5 right-5 flex gap-2">
            {reactions.map((r) => (
              <motion.button
                key={r.label}
                onClick={() => handleReaction(r)}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`flex items-center justify-center h-10 w-10 rounded-full border backdrop-blur-sm transition-all ${r.bg}`}
                aria-label={r.label}
              >
                <r.icon className={`h-5 w-5 ${r.color}`} />
              </motion.button>
            ))}
          </div>

          {/* Floating emoji reactions */}
          <AnimatePresence>
            {floaters.map((f) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 1, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -120, scale: 1.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                className="absolute bottom-16 pointer-events-none"
                style={{ left: `${f.x}%` }}
              >
                <f.icon className={`h-7 w-7 ${f.color}`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom info strip */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-5 text-slate-500 text-xs text-center"
        >
          For technical support, email{" "}
          <a href="mailto:Info@beyondintern.com" className="text-electric-light hover:underline">
            Info@beyondintern.com
          </a>
        </motion.p>
      </main>
    </div>
  );
}
