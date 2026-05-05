"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import { Users, Award, Globe, Zap, Target, CheckCircle, Rocket, Flag } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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

const LEADERS = [
  {
    name: "Tushar Roy",
    title: "Founder",
    role: "Founder, Beyond Intern",
    badge: "Visionary",
    accent: "text-electric-light",
    accentBg: "bg-electric/10",
    accentBorder: "border-electric/20",
    badgeChar: "✦",
    gradient: "gradient-electric",
    src: "/Tushar.jpeg",
    description: "Driving the vision to bridge the gap between academic education and real industry expectations. Tushar established Beyond Intern to create a scalable career acceleration platform that equips students with clarity, competence, and confidence.",
    message: (
      <>
        <p>Beyond Intern was established with a clear mission: to bridge the gap between academic education and real-world industry requirements. Despite strong academic foundations, many students and early-career professionals struggle to access meaningful opportunities due to limited practical exposure.</p>
        <p>Recognising this challenge, Beyond Intern was designed as a structured platform that delivers international-standard internships combined with guided coursework and hands-on learning. Our programs focus on building practical skills, professional confidence, and industry readiness across multiple domains.</p>
        <p>At Beyond Intern, we are committed to empowering learners through experiential education, mentorship, and globally relevant training—ensuring they are prepared to succeed in an evolving professional landscape.</p>
      </>
    )
  },
  {
    name: "Swayam Atri",
    title: "Managing Director",
    role: "Managing Director",
    badge: "Leadership",
    accent: "text-gold-light",
    accentBg: "bg-gold/10",
    accentBorder: "border-gold/20",
    badgeChar: "★",
    gradient: "bg-linear-to-br from-gold to-amber-400",
    src: "/swayam.png",
    description: "Ensuring that every program maintains high standards of quality, relevance, and impact. Swayam focuses on creating meaningful pathways from education to employment on a global scale.",
    message: (
      <>
        <p>At Beyond Intern, our focus is on creating meaningful pathways from education to employment. We recognise that today’s learners require more than theoretical knowledge—they need practical experience, industry alignment, and continuous guidance to succeed in a competitive global environment.</p>
        <p>As Managing Director, my commitment is to ensure that every program we offer maintains high standards of quality, relevance, and impact. Through structured internships, international-standard coursework, and mentor-led learning, Beyond Intern equips individuals with the skills and confidence required to navigate real-world professional challenges.</p>
        <p>Our goal is to foster a culture of learning, accountability, and innovation—empowering the next generation of professionals to build sustainable and successful careers.</p>
      </>
    )
  },
  {
    name: "Nandani Sharma",
    title: "Career Counselor & Head Motivator",
    role: "Career Counselor & Head Motivator",
    badge: "Mentorship",
    accent: "text-emerald",
    accentBg: "bg-emerald/10",
    accentBorder: "border-emerald/20",
    badgeChar: "♥",
    gradient: "bg-linear-to-br from-emerald to-teal-400",
    src: "/Nandini.jpeg",
    description: "Empowering students to move beyond uncertainty and step confidently into their professional journeys through tailored guidance, mentorship, and growth mindset development.",
    message: (
      <>
        <p>At Beyond Intern, we believe that every student has the potential to achieve extraordinary success—when guided with the right direction, mindset, and opportunities.</p>
        <p>As a Career Counselor and Head Motivator, my mission is to empower students to move beyond uncertainty and step confidently into their professional journeys. Today’s job market is highly competitive and constantly evolving, and it’s not just about qualifications anymore—it’s about skills, clarity, and the ability to adapt.</p>
        <p>Through our programs, webinars, and one-to-one guidance, we focus on helping students:</p>
        <ul className="list-disc pl-5 my-2 space-y-1">
          <li>Discover their true career path</li>
          <li>Build industry-relevant skills</li>
          <li>Develop confidence and a growth mindset</li>
          <li>Navigate internships and job opportunities effectively</li>
        </ul>
        <p>Beyond Intern is not just a platform—it’s a transformation journey. We aim to bridge the gap between education and employability by providing practical insights, real-world exposure, and continuous motivation.</p>
        <p>I truly believe that with the right support system, no dream is too big. We are here to guide, support, and inspire you every step of the way. Your future starts today—let’s build it together.</p>
      </>
    )
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy text-slate-300">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-16 overflow-hidden">
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

        {/* ── Founder's Story ──────────────────────────────────────────── */}
        <section className="relative py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full gradient-electric" />
              <div className="prose prose-invert prose-lg max-w-none">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Beyond Intern: Building Careers Beyond Classrooms
                </h2>
                <div className="space-y-6 text-slate-300 leading-relaxed">
                  <p>
                    When I founded Beyond Intern at the age of 22, my vision was clear — to bridge the widening gap between academic education and real industry expectations. Each year, countless graduates enter the workforce without practical exposure, structured mentorship, or industry alignment.
                  </p>
                  <p>
                    Beyond Intern was created to address this gap by building a professional ecosystem that connects education with employability. Our objective is not limited to offering courses or internships. We are building a scalable career acceleration platform that equips students with clarity, competence, and confidence before they graduate.
                  </p>
                  <p className="text-xl font-medium text-electric-light italic border-l-4 border-electric/30 pl-6 py-2 my-8">
                    &ldquo;Beyond Intern represents preparation beyond textbooks, growth beyond limitations, and ambition beyond comfort zones.&rdquo;
                  </p>
                  <p className="font-semibold text-white text-right">
                    — Tushar Roy, Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────────────── */}
        <section className="relative py-12 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-2xl p-7 text-center group hover:glow-blue transition-all duration-300 hover:-translate-y-1"
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

        {/* ── Values ───────────────────────────────────────────────────── */}
        <section className="relative py-16">
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

        {/* ── Middle Section Image ─────────────────────────────────────── */}
        <section className="relative py-12">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="relative aspect-Video w-full rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.15)] border border-white/10 group">
              <Image
                src="/About-1.png"
                alt="Beyond Intern Students and Team"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </section>

        {/* ── Company Manifesto ────────────────────────────────────────── */}
        <section className="relative py-20">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-electric/20 to-transparent" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">
            
            {/* Leadership Team */}
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white">
                  Leadership <span className="gradient-text">Team</span>
                </h2>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                {LEADERS.map((leader) => (
                  <Dialog key={leader.name}>
                    <DialogTrigger>
                      <button className="glass-card rounded-3xl p-6 flex flex-col items-center text-center group hover:bg-white/5 transition-all w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-electric">
                        <div className="relative h-24 w-24 rounded-full overflow-hidden mb-5 border-2 border-white/10 group-hover:border-electric/50 transition-colors">
                          <Image
                            src={leader.src}
                            alt={leader.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{leader.name}</h3>
                        <p className={`text-sm font-semibold uppercase tracking-widest ${leader.accent} mb-4`}>
                          {leader.title}
                        </p>
                        <p className="text-slate-400 text-sm leading-relaxed text-center">
                          {leader.description}
                        </p>
                        <span className="mt-4 text-xs font-semibold text-electric-light opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider flex items-center gap-1">
                          Read Message <span className="text-lg leading-none">→</span>
                        </span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl bg-navy-light border border-white/10 rounded-3xl p-0 overflow-hidden shadow-2xl sm:rounded-3xl">
                      <div className="flex flex-col sm:flex-row max-h-[85vh]">
                        {/* Image side */}
                        <div className="relative h-56 sm:h-auto sm:w-2/5 shrink-0 hidden sm:block">
                          <Image
                            src={leader.src}
                            alt={leader.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 40vw"
                          />
                          <div className="absolute inset-0 bg-linear-to-r from-transparent to-navy-light" />
                        </div>
                        {/* Content side */}
                        <div className="p-8 sm:w-3/5 overflow-y-auto">
                          <p className={`text-xs font-semibold uppercase tracking-widest ${leader.accent} mb-1`}>
                            {leader.role}
                          </p>
                          <h3 className="text-2xl font-bold text-white mb-6">{leader.name}</h3>
                          <div className="text-slate-300 text-sm leading-relaxed space-y-4">
                            {leader.message}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-electric/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-electric-light" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-electric-light shrink-0 mt-0.5" />
                    <span className="text-slate-300">To build a global ecosystem where every student has access to world-class career acceleration.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-electric-light shrink-0 mt-0.5" />
                    <span className="text-slate-300">To eliminate the skills gap between academia and modern industry demands.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-electric-light shrink-0 mt-0.5" />
                    <span className="text-slate-300">To foster a community of lifelong learners, mentors, and industry leaders.</span>
                  </li>
                </ul>
              </div>
              <div className="glass-card rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-emerald/10 flex items-center justify-center">
                    <Flag className="h-5 w-5 text-emerald" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
                    <span className="text-slate-300">Provide accessible, outcome-driven education through structured mentorship and real-world projects.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
                    <span className="text-slate-300">Equip learners with clarity, competence, and the confidence to succeed in the workplace.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
                    <span className="text-slate-300">Partner with top companies to create direct pathways to high-impact careers.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Target Audience & Differentiators */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Target Audience</h3>
                <div className="grid gap-4">
                  {[
                    "University Students seeking practical experience",
                    "Recent Graduates looking to break into the industry",
                    "Early-Career Professionals aiming to upskill",
                    "Career Switchers transitioning into tech and management"
                  ].map((audience, i) => (
                    <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-gold-light shrink-0" />
                      <p className="text-slate-300 font-medium">{audience}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Key Differentiators</h3>
                <div className="grid gap-4">
                  {[
                    "Industry-aligned curriculum built by top-tier professionals",
                    "1:1 Mentorship and personalized career roadmaps",
                    "Guaranteed internship placements and live projects",
                    "Continuous feedback loop and soft-skills training"
                  ].map((diff, i) => (
                    <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-electric-light shrink-0" />
                      <p className="text-slate-300 font-medium">{diff}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2026 Strategic Goals & Closing */}
            <div className="space-y-12">
              <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 bg-linear-to-br from-navy to-electric/5">
                <div className="flex items-center gap-3 mb-8">
                  <Rocket className="h-6 w-6 text-electric-light" />
                  <h3 className="text-2xl font-bold text-white">2026 Strategic Goals</h3>
                </div>
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { title: "Global Expansion", desc: "Scale our platform to reach students across 50+ countries." },
                    { title: "100K Placements", desc: "Successfully place 100,000+ learners into high-impact roles." },
                    { title: "Corporate Partnerships", desc: "Onboard 500+ global hiring partners for direct recruitment." }
                  ].map((goal, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="text-lg font-bold text-white">{goal.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">{goal.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Closing Perspective / Final CTA */}
              <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center shadow-2xl border border-white/20">
                <div className="absolute inset-0 bg-linear-to-r from-electric via-blue-600 to-indigo-600 opacity-90" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Closing Perspective
                  </h2>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Education is the foundation, but execution is the building. We invite you to join us on this journey to redefine how the world learns, grows, and succeeds. Your future starts today. Let&apos;s build it together.
                  </p>
                  <div className="pt-4">
                    <a
                      href="/login"
                      className="inline-flex items-center justify-center bg-white text-electric font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300 shadow-xl"
                    >
                      Join Beyond Intern Today
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
