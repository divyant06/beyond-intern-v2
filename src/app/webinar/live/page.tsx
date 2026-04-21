"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Radio,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  Mail,
  User,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getActiveWebinar, registerForWebinar } from "@/app/dashboard/admin/actions";

// ─── Twitch Configuration ────────────────────────────────────────
// Swap this with your real Twitch channel name
const TWITCH_CHANNEL = "beyondintern";

interface ActiveWebinar {
  id: string;
  title: string;
  speaker: string | null;
  webinar_date: string | null;
  webinar_time: string | null;
}

function getWebinarStatus(date: Date): { label: string; color: string; dotColor: string; animate: boolean } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const webinarDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (webinarDay.getTime() === today.getTime()) {
    return { label: "Live", color: "bg-rose/20 border-rose/30 text-rose", dotColor: "bg-rose", animate: true };
  }
  if (webinarDay > today) {
    return { label: "Upcoming", color: "bg-electric/20 border-electric/30 text-electric-light", dotColor: "bg-electric", animate: false };
  }
  return { label: "Ended", color: "bg-slate-500/20 border-slate-500/30 text-slate-400", dotColor: "bg-slate-500", animate: false };
}

export default function LiveTheaterPage() {

  // ── Webinar data ──
  const [webinar, setWebinar] = useState<ActiveWebinar | null>(null);

  useEffect(() => {
    getActiveWebinar().then((data) => {
      if (data) setWebinar(data as ActiveWebinar);
    });
  }, []);

  // Dynamic values with fallbacks
  const webinarTitle = webinar?.title || "Boost Your Career & Land Internships";
  const webinarSpeaker = webinar?.speaker || "Nandani Sharma";
  const webinarDate = webinar?.webinar_date || "29th March 2026";
  const webinarTime = webinar?.webinar_time || "7:00 PM IST";

  // Derive status date from webinar_date field (best-effort)
  const statusDate = useMemo(() => {
    if (webinar?.webinar_date) {
      const parsed = new Date(webinar.webinar_date);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return new Date("2026-03-29T14:00:00Z");
  }, [webinar]);

  // ── Stream state ──
  const [isStreaming, setIsStreaming] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);

  // ── Registration form state ──
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [registered, setRegistered] = useState(false);
  const [regSubmitting, setRegSubmitting] = useState(false);
  const [regError, setRegError] = useState("");

  const status = useMemo(() => getWebinarStatus(statusDate), [statusDate]);

  // ── Organic Viewer Count Fluctuation ──
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!isStreaming) {
      timeoutId = setTimeout(() => setViewerCount(0), 0);
      return () => clearTimeout(timeoutId);
    }

    // Set initial viewer count asynchronously to avoid cascading renders
    timeoutId = setTimeout(() => {
      const initialCount = Math.floor(Math.random() * 601) + 1200;
      setViewerCount(initialCount);

      const fluctuate = () => {
        // Random interval between 3-8 seconds
        const nextDelay = (Math.random() * 5 + 3) * 1000;
        timeoutId = setTimeout(() => {
          setViewerCount((prev) => {
            const delta = Math.floor(Math.random() * 5) + 2;
            const direction = Math.random() > 0.45 ? 1 : -1;
            const newCount = prev + delta * direction;
            return Math.max(800, Math.min(2500, newCount));
          });
          fluctuate();
        }, nextDelay);
      };

      fluctuate();
    }, 0);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isStreaming]);

  // ── Join Stream ──
  const handleJoinStream = () => {
    setIsStreaming(true);
  };



  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;
    setRegSubmitting(true);
    setRegError("");

    const result = await registerForWebinar({ full_name: regName, email: regEmail });
    setRegSubmitting(false);

    if (result.success) {
      setRegistered(true);
      setRegName("");
      setRegEmail("");
    } else {
      setRegError((result as { message?: string }).message || "Registration failed.");
    }
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
          {/* Status badge */}
          <div className={`flex items-center gap-2 rounded-full px-3 py-1 border ${status.color}`}>
            <span className="relative flex h-2 w-2">
              {status.animate && (
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status.dotColor} opacity-75`} />
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${status.dotColor}`} />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider">{status.label}</span>
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

        {/* Viewer count in header */}
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Users className="h-4 w-4" />
          <span>{viewerCount > 0 ? viewerCount.toLocaleString() : "—"} watching</span>
        </div>
      </header>

      {/* ─── Main Theater ─────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col lg:flex-row gap-8 p-6 lg:p-10 relative z-10">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-electric/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

        {/* Left: Video */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Webinar title */}
            <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-electric/10 border border-electric/20 rounded-full px-4 py-1.5 mb-3">
              <Radio className="h-3.5 w-3.5 text-electric-light animate-pulse" />
              <span className="text-electric-light text-xs font-semibold">
                {webinarTitle} · {webinarDate}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Speaker: <span className="gradient-text">{webinarSpeaker}</span>
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
            {/* Glass background (visible behind iframe / under the join button) */}
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

            {/* Scanline shimmer (only before stream) */}
            {!isStreaming && (
              <motion.div
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-24 bg-linear-to-b from-transparent via-electric/3 to-transparent pointer-events-none"
              />
            )}

            {/* ─── Live Viewer Badge (top-right) ─────────────────── */}
            <AnimatePresence>
              {isStreaming && viewerCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-4 right-4 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1.5 shadow-lg"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                  <span className="text-white text-xs font-semibold tracking-wide">
                    {viewerCount.toLocaleString()} watching
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── Twitch Embed (shown when streaming) ─────────── */}
            {isStreaming && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-20"
              >
                <iframe
                  src={`https://player.twitch.tv/?channel=${TWITCH_CHANNEL}&parent=localhost&parent=www.beyondintern.com&parent=beyondintern.com`}
                  frameBorder="0"
                  allowFullScreen={true}
                  scrolling="no"
                  className="w-full h-full rounded-2xl bg-black"
                  title="Beyond Intern Live Stream"
                />
              </motion.div>
            )}

            {/* ─── Join Button (shown when NOT streaming) ─────── */}
            {!isStreaming && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10">
                <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">
                  Ready to join the webinar
                </p>

                <motion.button
                  onClick={handleJoinStream}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center gap-3 px-8 py-4 rounded-full gradient-electric glow-blue cursor-pointer"
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

                  <Video className="h-5 w-5 text-white" />
                  <span className="text-white font-semibold text-sm">Join Webinar</span>
                </motion.button>

                <p className="text-slate-400 text-sm">Click to join the live stream</p>
              </div>
            )}


          </motion.div>

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
        </div>

        {/* Right: Registration Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full lg:w-[360px] shrink-0"
        >
          <div className="glass-card rounded-2xl p-6 sticky top-6">
            <h2 className="text-lg font-bold text-white mb-1">Register for this Webinar</h2>
            <p className="text-xs text-slate-400 mb-5">Secure your free seat — limited spots available.</p>

            {/* Date & Time info */}
            <div className="flex items-center gap-4 mb-6 text-sm text-slate-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-electric-light" />
                {webinarDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-electric-light" />
                {webinarTime}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {registered ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl bg-emerald/10 border border-emerald/20 p-5 text-center"
                >
                  <CheckCircle2 className="h-10 w-10 text-emerald mx-auto mb-3" />
                  <p className="text-sm font-semibold text-white">
                    Your seat is reserved!
                  </p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    We will email you the stream link before the webinar starts.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleRegister}
                  className="space-y-3"
                >
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Full name"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                      className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:border-electric/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                      className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:border-electric/50 focus:outline-none transition-colors"
                    />
                  </div>
                  {regError && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2"
                    >
                      {regError}
                    </motion.p>
                  )}
                  <Button
                    type="submit"
                    disabled={regSubmitting}
                    className="w-full h-10 gradient-electric text-white font-semibold rounded-xl text-sm glow-blue hover:opacity-90 transition-opacity"
                  >
                    {regSubmitting ? (
                      <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      "Reserve My Seat"
                    )}
                  </Button>
                  <p className="text-[10px] text-slate-600 text-center">
                    Free registration. No credit card required.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
