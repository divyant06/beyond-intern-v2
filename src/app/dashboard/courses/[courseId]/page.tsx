"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowLeft,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { courseData } from "@/lib/courses";

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  getDuration: () => number;
  getCurrentTime: () => number;
}

interface YTStateChangeEvent {
  data: number;
}

interface YTNamespace {
  Player: new (element: HTMLElement | string, options: unknown) => YTPlayer;
  PlayerState: {
    PLAYING: number;
  };
}

declare global {
  interface Window {
    YT: YTNamespace;
    onYouTubeIframeAPIReady: () => void;
  }
}

// Placeholder video IDs per course — add real ones as content is uploaded
const COURSE_VIDEOS: Record<string, string> = {
  "tech-01": "rfscVS0vtbw", // Python intro
  "tech-02": "ysEN5RaKOlA", // Web dev intro
  "tech-03": "ua-CiDNNj30", // ML intro
  default: "dQw4w9WgXcQ",   // Generic placeholder
};

export default function CourseVideoPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const course = courseData.find((c) => c.id === courseId);
  const videoId = COURSE_VIDEOS[courseId] || COURSE_VIDEOS.default;

  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const initPlayer = useCallback(() => {
    if (!containerRef.current) return;
    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId,
      playerVars: {
        controls: 0,        // hide native controls
        disablekb: 1,       // disable keyboard shortcuts
        rel: 0,
        modestbranding: 1,
        fs: 0,
        iv_load_policy: 3,
      },
      events: {
        onReady: () => setPlayerReady(true),
        onStateChange: (event: YTStateChangeEvent) => {
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
        },
      },
    });
  }, [videoId]);

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = initPlayer;
  }, [initPlayer]);

  // Track progress
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
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Back link */}
      <Link
        href="/dashboard/courses"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Courses
      </Link>

      {/* Course title */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          {course?.title ?? "Course Lesson"}
        </h1>
        {course && (
          <p className="mt-1 text-sm text-slate-400">
            {course.category} · {course.duration} · {course.level}
          </p>
        )}
      </div>

      {/* Player container */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {/* YouTube embed target */}
        <div className="relative w-full aspect-video bg-black">
          <div ref={containerRef} className="absolute inset-0 w-full h-full" />

          {/* Overlay to block right-click / native controls interaction */}
          <div className="absolute inset-0 z-10" onContextMenu={(e) => e.preventDefault()} />

          {/* Anti-skip lock badge */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs text-slate-300 backdrop-blur-sm">
            <Lock className="h-3 w-3 text-electric-light" />
            Linear Watch Mode
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/10">
          <motion.div
            className="h-full bg-linear-to-r from-electric to-electric-light"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Custom controls */}
        <div className="flex items-center gap-4 px-6 py-4 bg-navy-light/80">
          <button
            onClick={togglePlay}
            disabled={!playerReady}
            className="h-10 w-10 rounded-full gradient-electric flex items-center justify-center glow-blue hover:opacity-90 transition-opacity disabled:opacity-50"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-white" />
            ) : (
              <Play className="h-5 w-5 text-white ml-0.5" />
            )}
          </button>

          <button
            onClick={toggleMute}
            disabled={!playerReady}
            className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-50"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-slate-300" />
            ) : (
              <Volume2 className="h-4 w-4 text-slate-300" />
            )}
          </button>

          <div className="flex-1 text-xs text-slate-400 flex items-center gap-2">
            <Lock className="h-3 w-3 text-electric-light" />
            <span>Seeking disabled — watch linearly to unlock the next lesson.</span>
          </div>
        </div>
      </div>

      {/* Course outcomes */}
      {course?.outcomes && (
        <div className="glass-card rounded-2xl p-6 space-y-3">
          <h2 className="text-sm font-semibold text-white">
            What you&apos;ll achieve
          </h2>
          <ul className="space-y-2">
            {course.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-center gap-2.5 text-sm text-slate-400"
              >
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
