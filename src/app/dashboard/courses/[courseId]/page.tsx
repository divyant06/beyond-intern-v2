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
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { courseData } from "@/lib/courses";

// Placeholder video IDs per course (Remove when connected to Supabase)
const COURSE_VIDEOS: Record<string, string> = {
  "tech-01": "rfscVS0vtbw", 
  "mkt-01": "dQw4w9WgXcQ", // Never gonna give you up...
  default: "dQw4w9WgXcQ", 
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function CourseVideoPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const course = courseData.find((c) => c.id === courseId);
  const videoId = COURSE_VIDEOS[courseId] || COURSE_VIDEOS.default;

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
        controls: 0,        // Hide native controls
        disablekb: 1,       // Disable YouTube keyboard shortcuts
        rel: 0,
        modestbranding: 1,
        fs: 0,              // We handle fullscreen manually
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

  // --- NEW PLAYER CONTROLS LOGIC ---

  function togglePlay() {
    if (!playerRef.current || !playerReady) return;
    isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
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

  function skip(seconds: number) {
    if (!playerRef.current || !playerReady) return;
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(currentTime + seconds, true);
  }

  function changeSpeed() {
    if (!playerRef.current || !playerReady) return;
    // Cycle speeds: 1x -> 1.25x -> 1.5x -> 2x -> 1x
    const nextSpeed = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : playbackRate === 1.5 ? 2 : 1;
    playerRef.current.setPlaybackRate(nextSpeed);
    setPlaybackRate(nextSpeed);
  }

  function handleTimelineClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!playerRef.current || !playerReady) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const duration = playerRef.current.getDuration();
    playerRef.current.seekTo(duration * percentage, true);
    setProgress(percentage * 100);
  }

  function toggleFullScreen() {
    if (!playerWrapperRef.current) return;
    if (!document.fullscreenElement) {
      playerWrapperRef.current.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
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

      {/* Premium Player Container (Wrapped for Fullscreen) */}
      <div ref={playerWrapperRef} className="glass-card rounded-2xl flex flex-col overflow-hidden bg-[#0A1628] border border-white/10 shadow-2xl">
        
        {/* YouTube Embed Area */}
        <div className="relative w-full aspect-video bg-black group">
          <div ref={containerRef} className="absolute inset-0 w-full h-full" />

          {/* Clickable Glass Shield */}
          <div 
            className="absolute inset-0 z-10 cursor-pointer" 
            onClick={togglePlay}
            onContextMenu={(e) => e.preventDefault()} 
          />
        </div>

        {/* Clickable Progress Bar */}
        <div 
          className="w-full h-2 bg-white/10 cursor-pointer relative group transition-all hover:h-3"
          onClick={handleTimelineClick}
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Custom Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0A1628]">
          
          {/* Left Controls */}
          <div className="flex items-center gap-6">
            <button
              onClick={togglePlay}
              disabled={!playerReady}
              className="text-white hover:text-[#60A5FA] transition-colors disabled:opacity-50"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>

            <button onClick={() => skip(-10)} disabled={!playerReady} className="text-slate-400 hover:text-white transition-colors">
              <Rewind className="h-5 w-5" />
            </button>
            
            <button onClick={() => skip(10)} disabled={!playerReady} className="text-slate-400 hover:text-white transition-colors">
              <FastForward className="h-5 w-5" />
            </button>

            <button onClick={toggleMute} disabled={!playerReady} className="text-slate-400 hover:text-white transition-colors">
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-6">
            <button 
              onClick={changeSpeed} 
              disabled={!playerReady}
              className="text-xs font-bold text-slate-300 hover:text-white bg-white/10 px-2.5 py-1.5 rounded-md hover:bg-white/20 transition-all"
            >
              {playbackRate}x
            </button>

            <button onClick={toggleFullScreen} className="text-slate-400 hover:text-white transition-colors">
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
