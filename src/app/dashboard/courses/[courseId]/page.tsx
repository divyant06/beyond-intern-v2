"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Rewind,
  FastForward,
  Maximize,
  Clock,
  BarChart3,
  Target,
  CheckCircle,
  MessageCircle,
  BookOpen,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { courseData } from "@/lib/courses";
import { getUserCourses } from "../actions";

// Placeholder video IDs per course (Remove when connected to Supabase)
const COURSE_VIDEOS: Record<string, string> = {
  "tech-01": "rfscVS0vtbw",
  "mkt-01": "dQw4w9WgXcQ",
  default: "dQw4w9WgXcQ",
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// ── Rich course descriptions & outcomes from raw_courses.txt ──────────────────
const COURSE_DETAILS: Record<string, { description: string; outcomes: string[] }> = {
  "tech-01": {
    description:
      "Develop strong programming fundamentals, logical thinking, and real-world coding ability required for software development roles. Progress from zero coding knowledge to independently building real applications with Python or Java through 4 intensive phases: Programming Foundations, Core Development Skills, Intermediate Development (APIs & Databases), and Industry Projects with portfolio building.",
    outcomes: [
      "Junior Software Developer",
      "Backend Developer (Entry-level)",
      "Automation Engineer",
      "Coding interview readiness",
      "GitHub portfolio with real projects",
    ],
  },
  "tech-02": {
    description:
      "Build end-to-end web development expertise from UI to database. Covers HTML5, CSS3, responsive design, JavaScript ES6+, Node.js & Express, REST APIs, MongoDB, authentication systems, and live production deployment across 5 phases over 20 weeks.",
    outcomes: [
      "Full Stack Developer",
      "Frontend Developer",
      "Web Developer",
      "Live production app deployment",
      "Real-world development workflow mastery",
    ],
  },
  "tech-03": {
    description:
      "Develop data-driven decision-making and predictive modeling skills using Python, NumPy, Pandas, and real-world ML models. Progress from data cleaning and visualization through machine learning regression & classification to advanced feature engineering and production ML projects.",
    outcomes: [
      "Data Analyst",
      "Junior Data Scientist",
      "ML Engineer (Entry-level)",
      "Predictive analytics capability",
      "Real-world ML project portfolio",
    ],
  },
  "tech-04": {
    description:
      "Build security awareness and ethical hacking capabilities covering networking basics, threat detection, penetration testing, and security project implementation using industry-standard tools like Kali Linux and Wireshark.",
    outcomes: [
      "Cybersecurity Analyst",
      "Security Consultant",
      "Penetration Tester (Entry-level)",
    ],
  },
  "tech-05": {
    description:
      "Develop cloud deployment and infrastructure skills across AWS and Azure platforms, including cloud fundamentals, core services, deployment strategies, and DevOps basics with Docker containerisation.",
    outcomes: [
      "Cloud Engineer (Entry-level)",
      "DevOps Support Engineer",
      "Cloud Infrastructure Associate",
    ],
  },
  "anal-01": {
    description:
      "Develop the ability to analyse, clean, and interpret data using Excel and SQL. Build dashboards and reports from real-world datasets across 4 phases: Data Fundamentals, Advanced Excel (Pivot Tables, VLOOKUP), SQL for Data Analysis, and Business Application with a capstone project.",
    outcomes: [
      "Data Analyst (Entry-level)",
      "Reporting Analyst",
      "Business Intelligence Assistant",
      "Dashboard & report building",
    ],
  },
  "anal-02": {
    description:
      "Develop business decision-making skills using data insights, performance metrics, KPI dashboards, forecasting techniques, and strategic recommendations through real company case studies.",
    outcomes: [
      "Business Analyst",
      "Operations Analyst",
      "Data-Driven Decision Maker",
    ],
  },
  "anal-03": {
    description:
      "A flagship program training learners to bridge business and technology. Covers SDLC, Agile, stakeholder analysis, BRD/FRD documentation, use cases, BPMN diagrams, Power BI dashboards, and Jira across 4 intensive phases.",
    outcomes: [
      "Business Analyst",
      "Product Analyst",
      "Operations Analyst",
      "End-to-end business analysis capability",
    ],
  },
  "anal-04": {
    description:
      "Develop financial decision-making and analytical skills covering financial statements, ratio analysis, forecasting, and budgeting to interpret financial data for business strategy.",
    outcomes: ["Financial Analyst", "Investment Analyst", "Finance Associate"],
  },
  "anal-05": {
    description:
      "Develop structured thinking and problem-solving ability using case-solving frameworks, logical reasoning, and decision-making models applicable to all business roles.",
    outcomes: [
      "Applicable to all business roles",
      "Management Consultant (foundational)",
      "Team Leader",
    ],
  },
  "anal-06": {
    description:
      "Improve judgment, reasoning, and decision-making ability by mastering logical reasoning, bias identification, and structured decision frameworks for professional environments.",
    outcomes: ["Managerial roles", "Strategy & Consulting", "Leadership positions"],
  },
  "mkt-01": {
    description:
      "Build complete digital marketing expertise across SEO, Google Ads, PPC campaigns, social media marketing (Instagram, LinkedIn, YouTube), influencer marketing, Google Analytics, and conversion tracking through campaign-based learning over 16 weeks.",
    outcomes: [
      "Digital Marketing Executive",
      "Performance Marketer",
      "Social Media Manager",
      "Data-driven marketing capability",
    ],
  },
  "mkt-02": {
    description:
      "Develop expertise in search engine visibility and paid advertising using Google Ads, SEMrush, and Search Console. Covers SEO fundamentals, on-page & technical SEO, campaign optimization, and ROI tracking.",
    outcomes: ["SEO Specialist", "PPC Executive", "Search Marketing Analyst"],
  },
  "mkt-03": {
    description:
      "Build brand growth and audience engagement expertise through platform strategy, content planning, growth strategies, influencer collaboration, campaign creation, and analytics-driven optimization.",
    outcomes: ["Social Media Manager", "Content Strategist", "Brand Growth Executive"],
  },
  "mkt-04": {
    description:
      "Develop high-conversion sales skills and negotiation techniques covering sales funnels, lead generation, customer psychology, negotiation strategies, and closing techniques through live role-play sessions.",
    outcomes: ["Sales Executive", "Business Development Executive", "Account Manager"],
  },
  "mkt-05": {
    description:
      "Develop strong brand positioning and strategic marketing skills through brand identity, market positioning, consumer behavior analysis, competitive analysis, and real brand strategy projects.",
    outcomes: ["Brand Executive", "Marketing Strategist", "Brand Manager (Entry-level)"],
  },
  "soft-01": {
    description:
      "Develop clear, confident, and professional communication for corporate environments. Covers verbal & non-verbal communication, grammar, business email/report writing, presentation structuring, storytelling, and public speaking across 12 weeks.",
    outcomes: [
      "Workplace readiness across all roles",
      "Client-facing positions",
      "Team leadership roles",
    ],
  },
  "soft-02": {
    description:
      "Develop leadership mindset and team collaboration skills including leadership styles, emotional intelligence, conflict resolution, decision-making, and motivation strategies through group projects and leadership simulations.",
    outcomes: ["Team Leader", "Project Coordinator", "People Manager (Entry-level)"],
  },
  "soft-03": {
    description:
      "Build efficiency, focus, and productivity habits using goal setting, prioritization, Pomodoro technique, time tracking, stress management, and work-life balance strategies.",
    outcomes: ["Applicable to all professional roles", "Freelancers & entrepreneurs", "Team managers"],
  },
  "soft-04": {
    description:
      "Develop confidence, persuasion, and impactful speaking skills through voice modulation, speech structuring, storytelling, live presentations, and expert feedback sessions over 12 weeks.",
    outcomes: ["Roles requiring presentations", "Leadership & sales positions", "Trainers & educators"],
  },
  "soft-05": {
    description:
      "Develop self-awareness, empathy, and interpersonal skills covering emotional control, relationship management, workplace behaviour, and stress handling for professional environments.",
    outcomes: ["All professional roles", "HR & People management", "Customer-facing positions"],
  },
  "fin-01": {
    description:
      "Develop practical knowledge of stock markets, trading strategies, and risk management through market fundamentals, technical analysis (RSI, MACD), fundamental analysis, portfolio diversification, and virtual trading simulations.",
    outcomes: ["Investment Analyst (Entry-level)", "Equity Research Assistant", "Trading Executive"],
  },
  "fin-02": {
    description:
      "Develop personal finance management and wealth planning skills covering budgeting, income/expense management, investment options (stocks, mutual funds, bonds), tax planning, and retirement planning.",
    outcomes: ["Personal Financial Advisor (basic)", "Finance-savvy professional", "Wealth planning associate"],
  },
  "fin-03": {
    description:
      "Develop risk identification, assessment, and mitigation strategies in financial environments covering market, credit, and operational risks with compliance fundamentals and real risk assessment projects.",
    outcomes: ["Risk Analyst", "Compliance Officer", "Financial Risk Associate"],
  },
  "fin-04": {
    description:
      "Develop financial decision-making within organisations covering financial statements, cash flow analysis, capital budgeting, cost of capital, financial modelling, and business valuation through real corporate case studies.",
    outcomes: ["Financial Analyst", "Corporate Finance Executive", "Investment Banking Analyst (Entry-level)"],
  },
  "cre-01": {
    description:
      "Develop strong visual design and branding knowledge using Canva and Adobe Photoshop. Covers design principles, digital design tools, branding & identity, logo design, and portfolio building through client-based design simulations.",
    outcomes: ["Graphic Designer", "Social Media Designer", "Branding Executive"],
  },
  "cre-02": {
    description:
      "Develop user-centred design skills from user research, personas, and design thinking through wireframing, prototyping, visual design systems, and full product design with usability testing using Figma and Adobe XD.",
    outcomes: ["UI/UX Designer", "Product Designer", "Interaction Designer"],
  },
  "cre-03": {
    description:
      "Develop professional video editing and storytelling skills using Adobe Premiere Pro and After Effects, covering timeline editing, effects & animations, audio editing, and professional video production.",
    outcomes: ["Video Editor", "Content Creator", "Social Media Video Producer"],
  },
  "cre-04": {
    description:
      "Develop content writing, storytelling, and digital content strategy skills including copywriting, SEO writing, blogging, social media content, brand content strategy, and full content portfolio building.",
    outcomes: ["Content Writer", "Social Media Content Creator", "Copywriter"],
  },
  "car-01": {
    description:
      "Create a job-winning, ATS-optimised resume and professional portfolio. Covers resume structure, role-specific customization, keyword optimization, portfolio building (GitHub/Design/Projects), and recruiter-reviewed feedback.",
    outcomes: ["Strong personal brand", "ATS-ready resume", "Industry-standard portfolio"],
  },
  "car-02": {
    description:
      "Prepare for real job interviews covering HR, technical, and case-based formats through self-introduction mastery, mock interview simulations, advanced interview strategies, and salary negotiation coaching.",
    outcomes: ["Interview confidence", "Technical interview readiness", "Salary negotiation skills"],
  },
  "car-03": {
    description:
      "Build a strong online professional presence through LinkedIn profile setup, headline & summary writing, content posting strategy, networking techniques, and recruiter engagement optimization.",
    outcomes: ["Recruiter-attractive profile", "Strong professional network", "Consistent personal brand"],
  },
  "car-04": {
    description:
      "Prepare learners for real workplace environments covering workplace etiquette, corporate communication, task management, team collaboration, and real-world project simulations.",
    outcomes: ["Workplace adaptability", "Corporate communication skills", "Professional behaviour"],
  },
};

export default function CourseVideoPage() {
  const params = useParams();
  const { data: session, status: authStatus } = useSession();
  const courseId = params.courseId as string;
  const course = courseData.find((c) => c.id === courseId);
  const videoId = COURSE_VIDEOS[courseId] || COURSE_VIDEOS.default;
  const details = COURSE_DETAILS[courseId];
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

  // ── Enrollment check ──
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true);

  useEffect(() => {
    async function check() {
      if (!session?.user?.email) {
        setCheckingEnrollment(false);
        return;
      }
      try {
        const courses = await getUserCourses(session.user.email);
        setIsEnrolled(courses.some((c: { course_id: string }) => c.course_id === courseId));
      } catch {
        setIsEnrolled(false);
      } finally {
        setCheckingEnrollment(false);
      }
    }
    if (authStatus !== "loading") check();
  }, [session, authStatus, courseId]);

  // ── YouTube Player (only for enrolled users) ──
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const initPlayer = useCallback(() => {
    if (!containerRef.current) return;
    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId,
      playerVars: {
        controls: 0,
        disablekb: 1,
        rel: 0,
        modestbranding: 1,
        fs: 0,
        iv_load_policy: 3,
      },
      events: {
        onReady: () => setPlayerReady(true),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onStateChange: (event: any) => {
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
        },
      },
    });
  }, [videoId]);

  useEffect(() => {
    if (!isEnrolled || checkingEnrollment) return;
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = initPlayer;
  }, [initPlayer, isEnrolled, checkingEnrollment]);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        if (playerRef.current) {
          const dur = playerRef.current.getDuration();
          const cur = playerRef.current.getCurrentTime();
          if (dur > 0) setProgress((cur / dur) * 100);
        }
      }, 500);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying]);

  function togglePlay() {
    if (!playerRef.current || !playerReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }
  function toggleMute() {
    if (!playerRef.current || !playerReady) return;
    if (isMuted) { playerRef.current.unMute(); setIsMuted(false); }
    else { playerRef.current.mute(); setIsMuted(true); }
  }
  function skip(seconds: number) {
    if (!playerRef.current || !playerReady) return;
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + seconds, true);
  }
  function changeSpeed() {
    if (!playerRef.current || !playerReady) return;
    const nextSpeed = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : playbackRate === 1.5 ? 2 : 1;
    playerRef.current.setPlaybackRate(nextSpeed);
    setPlaybackRate(nextSpeed);
  }
  function handleTimelineClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!playerRef.current || !playerReady) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    playerRef.current.seekTo(playerRef.current.getDuration() * percentage, true);
    setProgress(percentage * 100);
  }
  function toggleFullScreen() {
    if (!playerWrapperRef.current) return;
    if (!document.fullscreenElement) {
      playerWrapperRef.current.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen();
    }
  }

  // ── Loading state ──
  if (checkingEnrollment || authStatus === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 rounded-full border-2 border-electric/30 border-t-electric animate-spin" />
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ENROLLED USER → Show the video player
  // ═══════════════════════════════════════════════════════════════════════════
  if (isEnrolled) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <Link href="/dashboard/courses" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to My Courses
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{course?.title ?? "Course Lesson"}</h1>
          {course && <p className="mt-1 text-sm text-slate-400">{course.category} · {course.duration} · {course.level}</p>}
        </div>
        <div ref={playerWrapperRef} className="glass-card rounded-2xl flex flex-col overflow-hidden bg-navy border border-white/10 shadow-2xl">
          <div className="relative w-full aspect-video bg-black group">
            <div ref={containerRef} className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 z-10 cursor-pointer" onClick={togglePlay} onContextMenu={(e) => e.preventDefault()} />
          </div>
          <div className="w-full h-2 bg-white/10 cursor-pointer relative group transition-all hover:h-3" onClick={handleTimelineClick}>
            <motion.div className="absolute top-0 left-0 h-full bg-linear-to-r from-electric to-electric-light" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
          </div>
          <div className="flex items-center justify-between px-6 py-4 bg-navy">
            <div className="flex items-center gap-6">
              <button onClick={togglePlay} disabled={!playerReady} className="text-white hover:text-electric-light transition-colors disabled:opacity-50">
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              <button onClick={() => skip(-10)} disabled={!playerReady} className="text-slate-400 hover:text-white transition-colors"><Rewind className="h-5 w-5" /></button>
              <button onClick={() => skip(10)} disabled={!playerReady} className="text-slate-400 hover:text-white transition-colors"><FastForward className="h-5 w-5" /></button>
              <button onClick={toggleMute} disabled={!playerReady} className="text-slate-400 hover:text-white transition-colors">
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>
            <div className="flex items-center gap-6 pr-14">
              <button onClick={changeSpeed} disabled={!playerReady} className="text-xs font-bold text-slate-300 hover:text-white bg-white/10 px-2.5 py-1.5 rounded-md hover:bg-white/20 transition-all">{playbackRate}x</button>
              <button onClick={toggleFullScreen} className="text-slate-400 hover:text-white transition-colors"><Maximize className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
        {course?.outcomes && (
          <div className="glass-card rounded-2xl p-6 space-y-3 mt-6">
            <h2 className="text-sm font-semibold text-white">What you&apos;ll achieve</h2>
            <ul className="space-y-2">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-center gap-2.5 text-sm text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric-light shrink-0" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // NOT ENROLLED → SEO Landing Page with WhatsApp CTA
  // ═══════════════════════════════════════════════════════════════════════════
  const courseTitle = course?.title ?? "Course";
  const richDesc = details?.description || course?.description || "";
  const richOutcomes = details?.outcomes || course?.outcomes || [];
  const waText = encodeURIComponent(`Hey BeyondIntern! I want to enroll in the ${courseTitle} course.`);
  const waLink = `https://wa.me/${waNumber}?text=${waText}`;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-3xl">
      <Link href="/#courses" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Courses
      </Link>

      <article>
        {/* Hero Section */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="h-2 bg-linear-to-r from-blue-500 via-purple-500 to-amber-500" />
          <div className="p-8 space-y-6">
            {/* Category & Level Pills */}
            <div className="flex flex-wrap gap-2">
              {course?.category && (
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {course.category}
                </span>
              )}
              {course?.level && (
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {course.level}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              {courseTitle}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              {course?.duration && (
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-electric-light" />
                  {course.duration}
                </span>
              )}
              {course?.weeklyCommitment && (
                <span className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-electric-light" />
                  {course.weeklyCommitment} / week
                </span>
              )}
              {course?.price !== undefined && course?.price !== null && (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  £{course.price}
                </span>
              )}
              {course?.price === null && (
                <span className="flex items-center gap-2 text-emerald-400 font-medium">
                  <Sparkles className="h-4 w-4" />
                  Complimentary
                </span>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-white/5 pt-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5 text-electric-light" />
                About This Programme
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                {richDesc}
              </p>
            </div>

            {/* Outcomes */}
            {richOutcomes.length > 0 && (
              <div className="border-t border-white/5 pt-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-electric-light" />
                  Career Outcomes
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {richOutcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Placement Promise */}
            <div className="border-t border-white/5 pt-6">
              <div className="p-5 rounded-xl bg-linear-to-br from-emerald-500/5 to-blue-500/5 border border-emerald-500/10">
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-300">Placement Guarantee</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Beyond Intern provides continuous placement support until learners secure a relevant job role, based on successful course completion. Includes resume building, mock interviews, and hiring partner referrals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── WhatsApp CTA Button ── */}
            <div className="border-t border-white/5 pt-6">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl text-white font-bold text-base sm:text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                  boxShadow: "0 0 30px 6px rgba(37,211,102,0.25), 0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                Chat to Enroll (WhatsApp)
              </a>
              <p className="text-center text-xs text-slate-500 mt-3">
                Speak directly with our admissions team for instant enrollment and support.
              </p>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}