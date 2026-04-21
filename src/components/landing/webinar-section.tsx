"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Mic,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { getActiveWebinar, registerForWebinar } from "@/app/dashboard/admin/actions";

// ── Types ──────────────────────────────────────────────────────────────────────
interface ActiveWebinar {
  id: string;
  title: string;
  speaker: string | null;
  webinar_date: string | null;
  webinar_time: string | null;
}

const CAREER_INTERESTS = [
  "Marketing",
  "Finance",
  "Data Science",
  "Web Development",
  "HR",
  "Entrepreneurship",
];

const REFERRAL_SOURCES = [
  "Instagram",
  "LinkedIn",
  "WhatsApp",
  "Friends / Referral",
  "College",
  "Others",
];

export function WebinarSection() {
  const [interests, setInterests] = useState<string[]>([]);
  const [webinar, setWebinar] = useState<ActiveWebinar | null>(null);

  // Registration form state
  const formRef = useRef<HTMLFormElement>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [regError, setRegError] = useState("");

  const toggleInterest = (item: string) => {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Fetch active webinar on mount
  useEffect(() => {
    getActiveWebinar().then((data) => {
      if (data) setWebinar(data as ActiveWebinar);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    setSubmitting(true);
    setRegError("");

    const result = await registerForWebinar({ full_name: fullName, email });

    setSubmitting(false);

    if (result.success) {
      setRegistered(true);
      formRef.current?.reset();
      setInterests([]);
      setFullName("");
      setEmail("");
    } else {
      setRegError((result as { message?: string }).message || "Registration failed.");
    }
  };

  // Fallback values
  const webinarTitle = webinar?.title || "Boost Your Career & Land Internships";
  const webinarSpeaker = webinar?.speaker || "Nandani Sharma";
  const webinarDate = webinar?.webinar_date || "29th March 2026";
  const webinarTime = webinar?.webinar_time || "7:00 PM IST";

  return (
    <section id="webinars" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-navy-light/50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-electric/20 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-electric/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <Badge className="bg-electric/10 text-electric-light border-electric/20 mb-4">
            Live &amp; On-Demand
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Premium <span className="gradient-text">Webinars</span>
          </h2>
          <p className="mt-3 text-lg text-slate-400 max-w-xl mx-auto">
            Hear from industry experts live. Register below to secure your spot.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-5 items-start">
          {/* ── Event Info card ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-12 w-12 rounded-xl gradient-electric flex items-center justify-center glow-blue shrink-0">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">
                    {webinarTitle}
                  </h3>
                  <p className="text-xs text-slate-400">Beyond Intern Live Webinar</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Calendar className="h-4 w-4 text-electric-light shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Date:</span>{" "}
                    {webinarDate}
                  </div>
                </div>
                {webinarTime && (
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Clock className="h-4 w-4 text-electric-light shrink-0" />
                    <div>
                      <span className="font-semibold text-white">Time:</span>{" "}
                      {webinarTime}
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Mic className="h-4 w-4 text-electric-light shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Speaker:</span>{" "}
                    {webinarSpeaker}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/8 space-y-2">
                {[
                  "Live Q&A with industry experts",
                  "Career growth roadmap revealed",
                  "Exclusive internship referrals",
                  "Certificate of participation",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Upcoming Schedule ────────────────────────────────────── */}
            <div className="glass-card rounded-2xl p-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Upcoming Schedule
              </h4>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-4"
              >
                <Link href="/webinar/live">
                  <Button className="w-full gradient-electric text-white text-xs font-bold rounded-xl glow-blue hover:opacity-90 transition-opacity flex items-center justify-center gap-2 py-3 h-auto">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    Enter Live Room
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </motion.div>
              {[
                { date: "12 Apr", title: "Breaking into Tech 2026", status: "upcoming" },
                { date: "26 Apr", title: "System Design Masterclass", status: "upcoming" },
              ].map((w) => (
                <div
                  key={w.date}
                  className="py-2.5 border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-semibold text-electric-light w-12">
                        {w.date}
                      </div>
                      <p className="text-xs text-slate-300">{w.title}</p>
                    </div>
                    <Badge className="bg-electric/10 text-electric-light border-electric/20 text-[10px]">
                      📅 Soon
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Registration Form ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-7 relative overflow-hidden">
              {/* Inner glow accent */}
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-electric/10 blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {registered ? (
                  /* ── Success State ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                      <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      You&apos;re Registered! 🎉
                    </h3>
                    <p className="text-slate-400 max-w-xs leading-relaxed">
                      Your spot is secured. We&apos;ll send the webinar link to{" "}
                      <span className="text-electric-light font-medium">{email}</span>{" "}
                      before {webinarDate}.
                    </p>
                    <div className="mt-8 p-4 rounded-xl bg-electric/5 border border-electric/20 text-sm text-slate-300 max-w-xs">
                      <p className="font-semibold text-white mb-1">Speaker: {webinarSpeaker}</p>
                      <p>{webinarDate} · {webinarTime}</p>
                    </div>
                  </motion.div>
                ) : (
                  /* ── Registration Form ── */
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        Register for Free
                      </h3>
                      <p className="text-xs text-slate-400">
                        Secure your spot in minutes.
                      </p>
                    </div>

                    {/* ── Personal Info ── */}
                    <fieldset>
                      <legend className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                        🧾 Personal Information
                      </legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <Input
                            required
                            placeholder="Full Name *"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-electric/50"
                          />
                        </div>
                        <Input
                          required
                          type="email"
                          placeholder="Email Address *"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-electric/50"
                        />
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-electric/50"
                        />
                        <div className="sm:col-span-2">
                          <Input
                            placeholder="City / Location"
                            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-electric/50"
                          />
                        </div>
                      </div>
                    </fieldset>

                    {/* ── Academic / Professional ── */}
                    <fieldset>
                      <legend className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                        🎓 Academic / Professional Details
                      </legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Select>
                          <SelectTrigger className="bg-white/5 border-white/10 text-slate-300 focus:border-electric/50">
                            <SelectValue placeholder="Current Status" />
                          </SelectTrigger>
                          <SelectContent className="bg-navy-light border-white/10">
                            <SelectItem value="student" className="text-slate-200 focus:bg-white/10">Student</SelectItem>
                            <SelectItem value="graduate" className="text-slate-200 focus:bg-white/10">Graduate</SelectItem>
                            <SelectItem value="professional" className="text-slate-200 focus:bg-white/10">Working Professional</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="College / Company Name"
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-electric/50"
                        />
                        <div className="sm:col-span-2">
                          <Input
                            placeholder="Field of Study / Work"
                            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-electric/50"
                          />
                        </div>
                      </div>
                    </fieldset>

                    {/* ── Career Interests ── */}
                    <fieldset>
                      <legend className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                        💼 Career Interests (select all that apply)
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {CAREER_INTERESTS.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleInterest(item)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                              interests.includes(item)
                                ? "gradient-electric text-white border-transparent glow-blue"
                                : "border-white/10 text-slate-400 hover:border-white/20 bg-white/5"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                        <input
                          placeholder="Others..."
                          className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 placeholder:text-slate-600 outline-none focus:border-electric/40 w-28"
                        />
                      </div>
                    </fieldset>

                    {/* ── Expectations & Source ── */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <Textarea
                          placeholder="What do you expect to learn from this webinar?"
                          rows={2}
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-electric/50 resize-none"
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/10 text-slate-300 focus:border-electric/50">
                          <SelectValue placeholder="Attended webinar before?" />
                        </SelectTrigger>
                        <SelectContent className="bg-navy-light border-white/10">
                          <SelectItem value="yes" className="text-slate-200 focus:bg-white/10">Yes</SelectItem>
                          <SelectItem value="no" className="text-slate-200 focus:bg-white/10">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/10 text-slate-300 focus:border-electric/50">
                          <SelectValue placeholder="How did you hear about us?" />
                        </SelectTrigger>
                        <SelectContent className="bg-navy-light border-white/10">
                          {REFERRAL_SOURCES.map((src) => (
                            <SelectItem key={src} value={src.toLowerCase()} className="text-slate-200 focus:bg-white/10">
                              {src}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* ── Confirmation & Optional ── */}
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          required
                          className="mt-0.5 h-4 w-4 accent-blue-500 cursor-pointer"
                        />
                        <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                          I confirm that I will attend the webinar. *
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="mt-0.5 h-4 w-4 accent-blue-500 cursor-pointer"
                        />
                        <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                          Yes, I&apos;d like to receive internship opportunities from Beyond Intern.
                        </span>
                      </label>
                    </div>

                    {/* ── Error message ── */}
                    {regError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3"
                      >
                        {regError}
                      </motion.p>
                    )}

                    {/* ── Submit ── */}
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full gradient-electric text-white font-bold rounded-xl py-3 text-base glow-blue hover:opacity-90 transition-opacity"
                    >
                      {submitting ? (
                        <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      ) : (
                        <>
                          Secure My Spot
                          <Sparkles className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
