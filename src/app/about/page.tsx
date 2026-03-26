"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import { Users, Award, Globe, Zap, Heart, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Next.js `metadata` must be in a Server Component, but we need `"use client"` for Dialog.
// We export it here — it works because Next.js 15 still reads it statically.
// (If you get a build warning, split this into a server layout wrapper.)

const STATS = [
  { icon: Users, value: "5.5M+", label: "Students Enrolled", color: "text-electric-light" },
  { icon: Award, value: "99%", label: "Student Satisfaction", color: "text-gold-light" },
  { icon: Globe, value: "24B", label: "Global Reach", color: "text-emerald" },
  { icon: Zap, value: "150", label: "Employed Tutors", color: "text-rose" },
];

const VALUES = [
  {
    icon: "🎯",
    title: "Outcome-First Learning",
    desc: "Every course module is designed backwards from the job role, ensuring skills that employers actually want.",
  },
  {
    icon: "🤝",
    title: "Guaranteed Support",
    desc: "We don't just teach — we stay with you until you are placed, providing mock interviews, referrals, and continuous feedback.",
  },
  {
    icon: "🌍",
    title: "Globally Accessible",
    desc: "Premium education at a fair price, enabling learners from any background to compete on an equal footing.",
  },
  {
    icon: "💡",
    title: "Industry-Live Curriculum",
    desc: "Our courses are continuously updated by industry mentors from top-tier global companies.",
  },
];

interface Leader {
  name: string;
  title: string;
  role: string;
  badge: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  badgeChar: string;
  gradient: string;
  src: string;
  message: React.ReactNode;
}

const LEADERS: Leader[] = [
  {
    name: "Tushar Roy",
    title: "Founder",
    role: "Founder, Beyond Intern",
    badge: "Message from the Founder",
    accent: "text-electric-light",
    accentBg: "bg-electric/10",
    accentBorder: "border-electric/20",
    badgeChar: "✦",
    gradient: "gradient-electric",
    src: "/Tushar.jpeg",
    message: (
      <>
        <p>
          Beyond Intern was established with a clear mission: to bridge the gap between academic
          education and real-world industry requirements. Despite strong academic foundations, many
          students and early-career professionals struggle to access meaningful opportunities due to
          limited practical exposure.
        </p>
        <p>
          Recognising this challenge, Beyond Intern was designed as a structured platform that
          delivers international-standard internships combined with guided coursework and hands-on
          learning. Our programs focus on building practical skills, professional confidence, and
          industry readiness across multiple domains.
        </p>
        <p className="text-slate-400 text-xs italic">
          At Beyond Intern, we are committed to empowering learners through experiential education,
          mentorship, and globally relevant training — ensuring they are prepared to succeed in an
          evolving professional landscape.
        </p>
      </>
    ),
  },
  {
    name: "Nandani Sharma",
    title: "Career Counselor & Head Motivator",
    role: "Career Counselor & Head Motivator, Beyond Intern",
    badge: "Message from the Career Counselor",
    accent: "text-emerald",
    accentBg: "bg-emerald/10",
    accentBorder: "border-emerald/20",
    badgeChar: "♥",
    gradient: "bg-linear-to-br from-emerald to-teal-400",
    src: "/Nandini.jpeg",
    message: (
      <>
        <p>
          At Beyond Intern, we believe that every student has the potential to achieve extraordinary
          success — when guided with the right direction, mindset, and opportunities.
        </p>
        <p>
          As a Career Counselor and Head Motivator, my mission is to empower students to move beyond
          uncertainty and step confidently into their professional journeys. Through our programs,
          webinars, and one-to-one guidance, we help students discover their true career path, build
          industry-relevant skills, and develop the confidence and growth mindset to thrive.
        </p>
        <p className="text-slate-400 text-xs italic">
          Beyond Intern is not just a platform — it&apos;s a transformation journey. Your future
          starts today. Let&apos;s build it together.
        </p>
      </>
    ),
  },
  {
    name: "Swayam Atri",
    title: "Managing Director",
    role: "Managing Director, Beyond Intern",
    badge: "Message from the Managing Director",
    accent: "text-gold-light",
    accentBg: "bg-gold/10",
    accentBorder: "border-gold/20",
    badgeChar: "★",
    gradient: "bg-linear-to-br from-gold to-amber-400",
    src: "/Swayam.png",
    message: (
      <>
        <p>
          At Beyond Intern, our focus is on creating meaningful pathways from education to
          employment. We recognise that today&apos;s learners require more than theoretical knowledge
          — they need practical experience, industry alignment, and continuous guidance to succeed in
          a competitive global environment.
        </p>
        <p>
          As Managing Director, my commitment is to ensure that every program we offer maintains
          high standards of quality, relevance, and impact. Through structured internships,
          international-standard coursework, and mentor-led learning, Beyond Intern equips
          individuals with the skills and confidence required to navigate real-world professional
          challenges.
        </p>
        <p className="text-slate-400 text-xs italic">
          Our goal is to foster a culture of learning, accountability, and innovation — empowering
          the next generation of professionals to build sustainable and successful careers.
        </p>
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 gradient-bg" />
          <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-electric/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />

          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <span className="inline-block px-4 py-2 rounded-full glass border border-white/10 text-sm text-slate-300 font-medium mb-8">
              🎓 Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Transforming the Future of{" "}
              <span className="gradient-text">Education</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              One student at a time — bridging the gap between academic education and real-world
              industry requirements.
            </p>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────────────── */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-navy-light/40" />
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-2xl p-7 text-center group hover:glow-blue transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="h-12 w-12 mx-auto rounded-xl gradient-electric flex items-center justify-center mb-4">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership Cards ──────────────────────────────────────────── */}
        <section className="relative py-20">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-electric/20 to-transparent" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-white">
                Leadership <span className="gradient-text">Messages</span>
              </h2>
              <p className="mt-3 text-slate-400 max-w-lg mx-auto">
                Hear directly from the people who built Beyond Intern from the ground up.
              </p>
            </div>

            {/* 3-column grid: Tushar, Nandani, Swayam */}
            <div className="grid gap-8 lg:grid-cols-3">
              {LEADERS.map((leader) => (
                <div
                  key={leader.name}
                  className="glass-card rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300 flex flex-col"
                >
                  {/* Accent strip */}
                  <div className={`h-2 w-full ${leader.gradient}`} />

                  <div className="p-7 flex flex-col flex-1">
                    {/* Avatar + info */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative shrink-0">
                        {/* Click-to-enlarge dialog */}
                        <Dialog>
                          <DialogTrigger
                            render={
                              <button
                                className="relative block h-20 w-20 rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-electric group/img cursor-zoom-in"
                                aria-label={`View ${leader.name}'s photo`}
                              />
                            }
                          >
                            <div className={`absolute inset-0 ${leader.accentBg} border ${leader.accentBorder}`} />
                            <Image
                              src={leader.src}
                              alt={leader.name}
                              fill
                              className="object-cover object-top"
                              sizes="80px"
                            />
                            {/* Zoom hint */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                              <ZoomIn className="h-5 w-5 text-white" />
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-sm p-4 bg-navy-light border border-white/10 rounded-3xl">
                            <div className="relative aspect-square w-full rounded-2xl overflow-hidden">
                              <Image
                                src={leader.src}
                                alt={leader.name}
                                fill
                                className="object-cover object-top"
                                sizes="400px"
                              />
                            </div>
                            <p className="text-center text-sm font-semibold text-white mt-3">
                              {leader.name}
                            </p>
                            <p className="text-center text-xs text-slate-400">{leader.role}</p>
                          </DialogContent>
                        </Dialog>

                        {/* Badge dot */}
                        <span
                          className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full ${leader.gradient} flex items-center justify-center z-10`}
                        >
                          <span className="text-[9px] text-white font-bold">{leader.badgeChar}</span>
                        </span>
                      </div>

                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-widest ${leader.accent} mb-1`}>
                          {leader.badge}
                        </p>
                        <h3 className="text-xl font-bold text-white">{leader.name}</h3>
                        <p className="text-sm text-slate-400 mt-0.5">{leader.title}</p>
                      </div>
                    </div>

                    <blockquote className="text-slate-300 text-sm leading-relaxed space-y-3 flex-1">
                      {leader.message}
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ───────────────────────────────────────────────────── */}
        <section className="relative py-20">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">
                What We <span className="gradient-text">Stand For</span>
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="font-bold text-white text-base mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Message from the Team ──────────────────────────────────────── */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-navy-light/30" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-96 w-96 rounded-full bg-electric/8 blur-[100px]" />
          </div>
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-electric/20 to-transparent" />

          <div className="relative mx-auto max-w-2xl px-6 text-center">
            <div className="glass-card rounded-3xl p-10 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-electric/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gold/8 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="h-14 w-14 rounded-2xl gradient-electric flex items-center justify-center glow-blue mb-5">
                  <Heart className="h-7 w-7 text-white fill-white/30" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  A Message from the{" "}
                  <span className="gradient-text">Beyond Intern Team</span>
                </h2>
                <p className="text-slate-300 leading-relaxed text-base mb-4">
                  Welcome to the Beyond Intern family. 🎉
                </p>
                <p className="text-slate-400 leading-relaxed text-sm max-w-lg">
                  Every student who walks through our doors carries a dream. Our entire team —
                  from mentors to placement specialists to course designers — is here with one
                  purpose: to make sure that dream becomes your reality. We are in your corner,
                  every step of the way.
                </p>
                <p className="mt-6 text-xs text-slate-500 italic">
                  — The Beyond Intern Team, with ❤️
                </p>

                <div className="mt-6 flex gap-3 items-center text-slate-600">
                  <span>✦</span>
                  <span className="text-electric-light/40">✦</span>
                  <span className="text-gold/40">✦</span>
                  <span className="text-electric-light/40">✦</span>
                  <span>✦</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-electric/5 via-transparent to-gold/5" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to go <span className="gradient-text">Beyond?</span>
            </h2>
            <p className="text-slate-400 mb-8">
              Join thousands of students transforming their careers with Beyond Intern.
            </p>
            <a
              href="/login"
              className="inline-flex items-center gap-2 gradient-electric text-white font-bold px-8 py-3.5 rounded-full glow-blue hover:opacity-90 transition-opacity text-base"
            >
              Start For Free Today
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
