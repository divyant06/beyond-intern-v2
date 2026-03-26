"use client";

import { motion } from "framer-motion";
import { Settings, User, CreditCard, ShieldAlert, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const displayName = user?.name || user?.email?.split("@")[0] || "Student";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <h1 className="text-2xl font-bold text-white flex items-center gap-3">
        <Settings className="h-6 w-6 text-slate-400" />
        Settings
      </h1>

      {/* Profile Information */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2 mb-5">
          <User className="h-4 w-4 text-electric-light" />
          Profile Information
        </h2>
        <div className="flex items-center gap-4 mb-6">
          {user?.image ? (
            <Image
              src={user.image}
              alt={displayName}
              width={56}
              height={56}
              className="rounded-full ring-2 ring-electric/40"
            />
          ) : (
            <div className="h-14 w-14 rounded-full gradient-electric flex items-center justify-center text-xl font-bold text-white">
              {initial}
            </div>
          )}
          <div>
            <p className="text-base font-semibold text-white">{displayName}</p>
            <p className="text-sm text-slate-400">{user?.email || "No email linked"}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 border border-white/5">
            <div>
              <p className="text-xs text-slate-500">Full Name</p>
              <p className="text-sm text-white">{displayName}</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 border border-white/5">
            <div>
              <p className="text-xs text-slate-500">Email Address</p>
              <p className="text-sm text-white">{user?.email || "—"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Details */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
          <CreditCard className="h-4 w-4 text-gold" />
          Billing Details
        </h2>
        <p className="text-sm text-slate-400">
          Manage your payment methods and view transaction history.
        </p>
        <div className="mt-4 rounded-xl bg-white/5 px-4 py-3 border border-white/5">
          <p className="text-xs text-slate-500">Payment Method</p>
          <p className="text-sm text-slate-300">No payment method on file</p>
        </div>
      </div>

      {/* Deactivate Course */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
          <ShieldAlert className="h-4 w-4 text-rose" />
          Deactivate Course
        </h2>
        <p className="text-sm text-slate-400">
          Request unenrolment from an active course. This action cannot be undone
          without contacting support.
        </p>
        <Button
          variant="outline"
          className="mt-4 border-rose/20 text-rose hover:bg-rose/10 text-sm"
          disabled
        >
          No active courses to deactivate
        </Button>
      </div>

      {/* Sign Out */}
      <div className="glass-card rounded-2xl p-6">
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          variant="outline"
          className="w-full border-white/10 text-slate-300 hover:bg-rose/10 hover:text-rose hover:border-rose/20 gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </motion.div>
  );
}
