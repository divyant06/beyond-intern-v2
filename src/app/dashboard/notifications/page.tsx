"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";

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

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchNotifications } from "@/app/dashboard/admin/actions";
import { AnimatePresence } from "framer-motion";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "broadcast" | "direct";
  created_at: string;
}

export default function NotificationsPage() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadNotifications() {
      if (session?.user?.email) {
        const data = await fetchNotifications();
        setNotifications(data || []);
      }
      setLoading(false);
    }
    loadNotifications();
  }, [session]);

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedIds(newSet);
  };
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
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-6 w-6 rounded-full border-2 border-electric/30 border-t-electric animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <Bell className="h-10 w-10 mx-auto text-slate-600 mb-3" />
            <p>You have no notifications right now.</p>
          </div>
        ) : (
          notifications.map((notif, i) => {
            const isExpanded = expandedIds.has(notif.id);
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => toggleExpand(notif.id)}
                className="flex items-start gap-4 p-5 transition-colors hover:bg-white/5 cursor-pointer"
              >
                <div className="mt-0.5 w-10 h-10 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center shrink-0">
                  <span className="font-bold text-blue-500">Bi</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">{notif.title}</p>
                  </div>
                  <AnimatePresence initial={false}>
                    {isExpanded ? (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto", marginTop: 4 },
                          collapsed: { opacity: 0, height: 0, marginTop: 0 }
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                          {notif.message}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="preview"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1"
                      >
                        <p className="text-sm text-slate-400 leading-relaxed truncate">
                          {notif.message}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <p className="text-[11px] text-slate-600 mt-2">{getRelativeTime(notif.created_at)}</p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
