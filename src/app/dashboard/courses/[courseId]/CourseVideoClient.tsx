"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Play, Pause, Volume2, VolumeX, Rewind, FastForward,
  Maximize, Clock, BarChart3, Target, CheckCircle, MessageCircle,
  BookOpen, GraduationCap, Sparkles, Layers, ChevronDown, Calendar
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getUserCourses } from "../actions";
import { Module } from "@/lib/courses";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CourseVideoClient({ courseId, initialCourse }: { courseId: string; initialCourse?: any }) {
  const { data: session, status: authStatus } = useSession();
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true);
  const [curriculumOpen, setCurriculumOpen] = useState(false);
  const [openWeeks, setOpenWeeks] = useState<Record<string, boolean>>({});

  const modules: Module[] = initialCourse?.curriculum || [];
  const firstVideoId = modules.length > 0 && modules[0].youtube_ids?.length > 0
    ? modules[0].youtube_ids[0]
    : "dQw4w9WgXcQ"; // Fallback placeholder if entirely empty

  const [currentVideoId, setCurrentVideoId] = useState<string>(firstVideoId);

  useEffect(() => {
    async function check() {
      if (!session?.user?.email) { setCheckingEnrollment(false); return; }
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
      videoId: currentVideoId,
      playerVars: { controls: 0, disablekb: 1, rel: 0, modestbranding: 1, fs: 0, iv_load_policy: 3 },
      events: {
        onReady: () => setPlayerReady(true),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onStateChange: (event: any) => { setIsPlaying(event.data === window.YT.PlayerState.PLAYING); },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEnrolled || checkingEnrollment) return;
    if (window.YT && window.YT.Player) { 
      if (!playerRef.current) {
        initPlayer(); 
      }
      return; 
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = initPlayer;
  }, [initPlayer, isEnrolled, checkingEnrollment]);

  useEffect(() => {
    if (playerReady && playerRef.current && window.YT && window.YT.PlayerState) {
      playerRef.current.loadVideoById(currentVideoId);
      setIsPlaying(true);
    }
  }, [currentVideoId, playerReady]);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        if (playerRef.current && playerRef.current.getDuration) {
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
    if (isPlaying) playerRef.current.pauseVideo(); else playerRef.current.playVideo();
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
    if (!document.fullscreenElement) playerWrapperRef.current.requestFullscreen().catch(console.error);
    else document.exitFullscreen();
  }

  const toggleWeek = (weekKey: string) => {
    setOpenWeeks(prev => ({ ...prev, [weekKey]: !prev[weekKey] }));
  };

  const groupedCurriculum = modules.reduce((acc, mod) => {
    if (!acc[mod.month_group]) acc[mod.month_group] = {};
    if (!acc[mod.month_group][mod.weeks]) acc[mod.month_group][mod.weeks] = [];
    acc[mod.month_group][mod.weeks].push(mod);
    return acc;
  }, {} as Record<string, Record<string, Module[]>>);

  const outcomes: string[] = initialCourse?.career_outcomes || initialCourse?.outcomes || [];
  const renderOutcomes = () => {
    if (outcomes.length === 0) return null;
    return (
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-electric-light" /> Career Outcomes
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {outcomes.map((outcome, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
              {outcome}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const scheduleData = initialCourse?.schedule;
  const renderSchedule = () => {
    if (!scheduleData || Object.keys(scheduleData).length === 0) return null;
    return (
      <div className="glass-card rounded-2xl p-6 border border-white/10 mt-6">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-electric-light" /> Course Schedule
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(scheduleData).map(([key, value]) => (
            <div key={key} className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{key.replace(/_/g, " ")}</p>
              <p className="text-sm font-medium text-slate-200">{String(value)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (checkingEnrollment || authStatus === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 rounded-full border-2 border-electric/30 border-t-electric animate-spin" />
      </div>
    );
  }

  // ── ENROLLED: video player ────────────────────────────────────────────────
  if (isEnrolled) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <Link href="/dashboard/courses" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to My Courses
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{initialCourse?.title ?? "Course Lesson"}</h1>
          {initialCourse && <p className="mt-1 text-sm text-slate-400">{initialCourse.category} · {initialCourse.duration} · {initialCourse.level}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <div ref={playerWrapperRef} className="glass-card rounded-2xl flex flex-col overflow-hidden bg-navy border border-white/10 shadow-2xl">
              <div className="relative w-full max-w-full aspect-video bg-black overflow-hidden">
                <div ref={containerRef} className="absolute inset-0 w-full h-full" />
                <div className="absolute inset-0 z-10 cursor-pointer" onClick={togglePlay} onContextMenu={(e) => e.preventDefault()} />
              </div>
              <div className="w-full h-2 bg-white/10 cursor-pointer relative hover:h-3 transition-all" onClick={handleTimelineClick}>
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

            {renderOutcomes()}
            {renderSchedule()}
          </div>

          <div className="col-span-1">
            <div className="glass-card rounded-2xl p-6 border border-white/10 shadow-lg sticky top-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                <Layers className="h-5 w-5 text-electric-light" /> Curriculum
              </h2>
              <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                {Object.entries(groupedCurriculum).map(([month, weeksObj]) => (
                  <div key={month} className="space-y-3">
                    <h3 className="text-sm font-bold text-electric uppercase tracking-wider">{month}</h3>
                    <div className="space-y-2">
                      {Object.entries(weeksObj).map(([week, mods]) => {
                        const weekKey = `${month}-${week}`;
                        const isOpen = openWeeks[weekKey];
                        return (
                          <div key={weekKey} className="rounded-xl overflow-hidden bg-white/5 border border-white/5">
                            <button
                              onClick={() => toggleWeek(weekKey)}
                              className="w-full flex items-center justify-between p-3.5 hover:bg-white/10 transition-colors"
                            >
                              <span className="text-sm font-semibold text-slate-200">{week}</span>
                              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden bg-black/20"
                                >
                                  <div className="p-3 space-y-4">
                                    {mods.map((mod) => (
                                      <div key={mod.id} className="space-y-1.5">
                                        <p className="text-xs font-semibold text-slate-400 px-1">{mod.title}</p>
                                        <div className="space-y-1">
                                          {mod.youtube_ids.map((vid, idx) => {
                                            const isActive = currentVideoId === vid;
                                            return (
                                              <button
                                                key={`${mod.id}-${idx}`}
                                                onClick={() => setCurrentVideoId(vid)}
                                                className={`w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-all ${
                                                  isActive
                                                    ? "bg-electric/20 text-electric-light border border-electric/30"
                                                    : "hover:bg-white/10 text-slate-300 border border-transparent"
                                                }`}
                                              >
                                                <Play className={`h-4 w-4 shrink-0 mt-0.5 ${isActive ? "text-electric-light" : "text-slate-500"}`} />
                                                <span className="text-sm font-medium leading-tight">
                                                  {mod.youtube_ids.length > 1 ? `${mod.title} (Part ${idx + 1})` : mod.title}
                                                </span>
                                              </button>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {modules.length === 0 && (
                  <p className="text-sm text-slate-400 italic">No curriculum available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── NOT ENROLLED: SEO landing page ────────────────────────────────────────
  const courseTitle = initialCourse?.title ?? "Course";
  const richDesc = initialCourse?.description || "";
  const waText = encodeURIComponent(`Hey BeyondIntern! I want to enroll in the ${courseTitle} course.`);
  const waLink = `https://wa.me/${waNumber}?text=${waText}`;
  const price = initialCourse?.price;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-3xl">
      <Link href="/#courses" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Courses
      </Link>
      <article>
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="h-2 bg-linear-to-r from-blue-500 via-purple-500 to-amber-500" />
          <div className="p-8 space-y-6">
            <div className="flex flex-wrap gap-2">
              {initialCourse?.category && <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">{initialCourse.category}</span>}
              {initialCourse?.level && <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">{initialCourse.level}</span>}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{courseTitle}</h1>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              {initialCourse?.duration && <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-electric-light" />{initialCourse.duration}</span>}
              {initialCourse?.weeklyCommitment && <span className="flex items-center gap-2"><BarChart3 className="h-4 w-4 text-electric-light" />{initialCourse.weeklyCommitment} / week</span>}
              {price ? (
                <span className="flex items-center gap-2 text-amber-400 font-semibold"><Sparkles className="h-4 w-4" />£{price}</span>
              ) : price === null ? (
                <span className="flex items-center gap-2 text-emerald-400 font-medium"><Sparkles className="h-4 w-4" />Complimentary</span>
              ) : null}
            </div>
            <div className="border-t border-white/5 pt-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5 text-electric-light" /> About This Programme
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{richDesc}</p>
            </div>
            
            {modules.length > 0 && (
              <div className="border-t border-white/5 pt-6">
                <button type="button" onClick={() => setCurriculumOpen((o) => !o)}
                  className="group w-full flex items-center justify-between rounded-xl px-5 py-4 bg-white/4 hover:bg-white/7 border border-white/8 hover:border-electric/30 transition-all">
                  <span className="flex items-center gap-2.5 text-sm font-semibold text-white">
                    <Layers className="h-4 w-4 text-electric-light" />
                    View Course Curriculum
                    <span className="text-xs font-medium text-slate-500">({modules.length} modules)</span>
                  </span>
                  <motion.span animate={{ rotate: curriculumOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="text-slate-400 group-hover:text-electric-light transition-colors">
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {curriculumOpen && (
                    <motion.div key="curriculum" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: "easeInOut" }} className="overflow-hidden">
                      <div className="mt-4 relative pl-8">
                        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-linear-to-b from-electric/60 via-electric/30 to-transparent" />
                        {modules.map((module, i, arr) => (
                          <motion.div key={module.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                            className={`relative flex items-start gap-4 ${i < arr.length - 1 ? "pb-5" : ""}`}>
                            <div className="absolute -left-8 top-1 flex items-center justify-center">
                              <span className="h-[22px] w-[22px] rounded-full bg-electric/10 border border-electric/30 flex items-center justify-center">
                                <span className="h-2.5 w-2.5 rounded-full bg-electric glow-blue" />
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-white leading-relaxed">{module.title}</p>
                              <p className="text-xs text-slate-400 mt-1">{module.month_group} • {module.weeks}</p>
                            </div>
                            <span className="text-[10px] font-bold text-slate-600 shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            <div className="border-t border-white/5 pt-6">
              {renderOutcomes()}
            </div>
            
            {scheduleData && Object.keys(scheduleData).length > 0 && (
               <div className="pt-2">
                 {renderSchedule()}
               </div>
            )}
            
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
            <div className="border-t border-white/5 pt-6">
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl text-white font-bold text-base sm:text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: "0 0 30px 6px rgba(37,211,102,0.25), 0 4px 20px rgba(0,0,0,0.3)" }}>
                <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                Chat to Enroll (WhatsApp)
              </a>
              <p className="text-center text-xs text-slate-500 mt-3">Speak directly with our admissions team for instant enrollment and support.</p>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
