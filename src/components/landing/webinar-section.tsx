"use client";

import { motion } from "framer-motion";
import { Play, Calendar, Clock, Users, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Webinar {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  date: string;
  time: string;
  attendees: number;
  status: "live" | "upcoming" | "recorded";
}

const webinars: Webinar[] = [
  {
    id: "1",
    title: "The Future of AI in Software Engineering",
    speaker: "Dr. Sarah Chen",
    speakerRole: "Senior Engineer, Google",
    date: "March 28, 2026",
    time: "7:00 PM GMT",
    attendees: 1250,
    status: "live",
  },
  {
    id: "2",
    title: "Breaking into Tech: Panel Discussion",
    speaker: "Multiple Panelists",
    speakerRole: "Industry Leaders",
    date: "April 2, 2026",
    time: "6:00 PM GMT",
    attendees: 890,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Mastering System Design Interviews",
    speaker: "Alex Rivera",
    speakerRole: "Solutions Architect, AWS",
    date: "April 10, 2026",
    time: "7:30 PM GMT",
    attendees: 2100,
    status: "upcoming",
  },
  {
    id: "4",
    title: "Building Scalable Microservices",
    speaker: "Prof. Mark Williams",
    speakerRole: "CTO, ScaleUp Labs",
    date: "March 20, 2026",
    time: "6:00 PM GMT",
    attendees: 3400,
    status: "recorded",
  },
];

const statusConfig = {
  live: {
    label: "🔴 Live Now",
    className: "bg-rose/20 text-rose border-rose/30",
  },
  upcoming: {
    label: "📅 Upcoming",
    className: "bg-electric/20 text-electric-light border-electric/30",
  },
  recorded: {
    label: "▶️ Recorded",
    className: "bg-emerald/20 text-emerald border-emerald/30",
  },
};

export function WebinarSection() {
  return (
    <section id="webinars" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-navy-light/50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-electric/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <Badge className="bg-electric/10 text-electric-light border-electric/20 mb-4">
            Live & On-Demand
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Premium <span className="gradient-text">Webinars</span>
          </h2>
          <p className="mt-3 text-lg text-slate-400 max-w-xl">
            Tune in to expert-led sessions. Watch live or catch up on recordings
            at your own pace.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Video player area */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="relative aspect-video bg-linear-to-br from-electric/20 to-navy-lighter flex items-center justify-center">
                <div className="absolute inset-0 bg-navy/50" />
                {/* Play button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full glass glow-blue cursor-pointer"
                  aria-label="Play featured webinar"
                >
                  <Play className="h-8 w-8 text-white fill-white ml-1" />
                </motion.button>

                {/* Live badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <Badge className="bg-rose/90 text-white border-transparent font-semibold">
                    <span className="mr-1.5 inline-flex h-2 w-2 rounded-full bg-white animate-pulse" />
                    LIVE
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3 className="text-lg font-semibold text-white">
                    The Future of AI in Software Engineering
                  </h3>
                  <p className="text-sm text-slate-300 mt-1">
                    Dr. Sarah Chen · Senior Engineer, Google
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Webinar list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-3"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Schedule
            </h3>
            {webinars.map((webinar) => {
              const config = statusConfig[webinar.status];
              return (
                <motion.div
                  key={webinar.id}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className="glass-card rounded-xl p-4 cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <Badge className={`${config.className} text-[10px] mb-2`}>
                        {config.label}
                      </Badge>
                      <h4 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-electric-light transition-colors">
                        {webinar.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 truncate">
                        {webinar.speaker} · {webinar.speakerRole}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-600 group-hover:text-electric-light transition-colors shrink-0 mt-6" />
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {webinar.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {webinar.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {webinar.attendees.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
