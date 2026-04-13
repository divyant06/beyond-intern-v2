"use client";

import { motion } from "framer-motion";
import { Bell, Rocket, Sparkles, BookOpen, Info } from "lucide-react";

function getRelativeTime(date: Date | string) {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

const now = Date.now();

const notifications = [
  {
    id: "welcome",
    icon: Rocket,
    title: "Welcome to Beyond Intern!",
    message:
      "Explore our courses to start your journey. We have 28 industry-aligned programmes across 7 skill tracks.",
    createdAt: new Date(now - 1000 * 30).toISOString(),
    color: "bg-electric",
    unread: true,
  },
  {
    id: "tip",
    icon: Sparkles,
    title: "Quick Tip",
    message:
      "Complete your profile in Settings to unlock personalised course recommendations.",
    createdAt: new Date(now - 1000 * 60 * 5).toISOString(),
    color: "bg-gold",
    unread: true,
  },
  {
    id: "browse",
    icon: BookOpen,
    title: "Start Learning Today",
    message:
      "Browse our top-rated courses in Technical Skills, Creative Skills, and Career Readiness.",
    createdAt: new Date(now - 1000 * 60 * 60 * 2).toISOString(),
    color: "bg-emerald",
    unread: false,
  },
  {
    id: "community",
    icon: Info,
    title: "Join the Community",
    message:
      "Connect with 10,000+ students and alumni. Lifetime access included with every course.",
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 3).toISOString(),
    color: "bg-purple-500",
    unread: false,
  },
];

export default function NotificationsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Bell className="h-6 w-6 text-electric-light" />
          Notifications
        </h1>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden divide-y divide-white/5">
        {notifications.map((notif, i) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`flex items-start gap-4 p-5 transition-colors hover:bg-white/5 ${
              notif.unread ? "bg-white/2" : ""
            }`}
          >
            <div
              className={`mt-0.5 h-9 w-9 rounded-xl ${notif.color} flex items-center justify-center shrink-0`}
            >
              <notif.icon className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-white">{notif.title}</p>
              </div>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                {notif.message}
              </p>
              <p className="text-[11px] text-slate-600 mt-2">{getRelativeTime(notif.createdAt)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
