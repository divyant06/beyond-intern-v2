"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Trophy,
  BadgeCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  LogOut,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";

const navItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard",
    tooltip: "Main dashboard overview",
  },
  {
    icon: BookOpen,
    label: "My Courses",
    href: "/dashboard/courses",
    tooltip: "View enrolled courses",
  },
  {
    icon: Trophy,
    label: "Achievements",
    href: "/dashboard/achievements",
    tooltip: "Your milestones & badges",
  },
  {
    icon: BadgeCheck,
    label: "Certifications",
    href: "/dashboard/certifications",
    tooltip: "Download certificates",
  },
  {
    icon: Bell,
    label: "Notifications",
    href: "/dashboard/notifications",
    tooltip: "Alerts & updates",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
    tooltip: "Account & preferences",
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-0 h-screen shrink-0 z-40 flex flex-col border-r border-white/5 bg-navy-light/95 backdrop-blur-xl"
    >
      {/* Logo */}
      <Link href="/" className={`flex items-center px-4 h-16 overflow-hidden ${collapsed ? "justify-center" : "gap-2"}`}>
        <AnimatePresence>
          {!collapsed ? (
            <motion.span
              key="full-logo"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="text-lg font-bold text-white whitespace-nowrap overflow-hidden"
            >
              Beyond<span className="gradient-text">Intern</span>
            </motion.span>
          ) : (
            <motion.span
              key="small-logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg font-bold text-white whitespace-nowrap"
            >
              BI
            </motion.span>
          )}
        </AnimatePresence>
      </Link>

      <Separator className="bg-white/5" />

      {/* Nav items */}
      <nav className={`flex-1 flex flex-col px-3 py-4 space-y-1 overflow-y-auto ${collapsed ? "items-center" : ""}`}>
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link key={item.label} href={item.href} title={collapsed ? item.tooltip : undefined}>
              <motion.div
                whileHover={{ x: collapsed ? 0 : 2 }}
                className={`flex items-center rounded-xl py-2.5 text-sm font-medium transition-all cursor-pointer ${
                  collapsed ? "justify-center w-11 px-0" : "gap-3 px-3"
                } ${
                  isActive
                    ? "bg-electric/10 text-electric-light"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 shrink-0 ${isActive ? "text-electric-light" : ""}`}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && !collapsed && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-electric-light"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-2">
        <Separator className="bg-white/5 mb-2" />
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-rose/10 hover:text-rose transition-colors"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-navy-light text-slate-400 hover:text-white transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>
    </motion.aside>
  );
}
