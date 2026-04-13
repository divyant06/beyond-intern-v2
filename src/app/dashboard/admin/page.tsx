"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  UserPlus,
  CheckCircle,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";
import { courseData } from "@/lib/courses";

const ADMIN_EMAILS = ["admin@beyondintern.com", "divyant@beyondintern.com"];

type Status = "idle" | "loading" | "success" | "error";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [userEmail, setUserEmail] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [submitStatus, setSubmitStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const isAdmin =
    session?.user?.email && ADMIN_EMAILS.includes(session.user.email);

  async function handleAssign(e: React.FormEvent) {
    e.preventDefault();
    if (!userEmail || !selectedCourseId) return;

    setSubmitStatus("loading");
    setMessage("");

    try {
      const { error } = await supabase.from("user_courses").insert({
        user_email: userEmail.trim().toLowerCase(),
        course_id: selectedCourseId,
      });

      if (error) {
        if (error.code === "23505") {
          setMessage("This user is already enrolled in that course.");
          setSubmitStatus("error");
        } else {
          throw error;
        }
      } else {
        setMessage(
          `Successfully enrolled ${userEmail} in "${courseData.find((c) => c.id === selectedCourseId)?.title}".`
        );
        setSubmitStatus("success");
        setUserEmail("");
        setSelectedCourseId("");
      }
    } catch (err) {
      console.error("Enrol error:", err);
      setMessage("An unexpected error occurred. Please try again.");
      setSubmitStatus("error");
    }
  }

  /* Loading skeleton */
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 rounded-full border-2 border-electric/30 border-t-electric animate-spin" />
      </div>
    );
  }

  /* Access denied */
  if (!session || !isAdmin) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto mt-16"
      >
        <div className="mx-auto mb-5 h-20 w-20 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
          <ShieldAlert className="h-10 w-10 text-rose-400" />
        </div>
        <h1 className="text-xl font-bold text-white">Access Denied</h1>
        <p className="mt-2 text-sm text-slate-400">
          You do not have permission to access the admin panel.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-2xl"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <UserPlus className="h-6 w-6 text-electric-light" />
          Admin — Enrol a Student
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Assign a course to any registered user by their email address.
        </p>
      </div>

      {/* Form card */}
      <div className="glass-card rounded-2xl p-8 space-y-6">
        <form onSubmit={handleAssign} className="space-y-5">
          {/* User email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">
              Student Email
            </label>
            <Input
              type="email"
              placeholder="student@example.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-electric/50 rounded-xl"
            />
          </div>

          {/* Course selector */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">
              Select Course
            </label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              required
              className="w-full h-11 rounded-xl bg-white/5 border border-white/10 text-white px-3 text-sm focus:outline-none focus:border-electric/50 transition-colors"
            >
              <option value="" disabled className="bg-slate-900">
                — Choose a course —
              </option>
              {courseData.map((course) => (
                <option
                  key={course.id}
                  value={course.id}
                  className="bg-slate-900"
                >
                  [{course.category}] {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Selected course preview */}
          {selectedCourseId && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-4 rounded-xl bg-electric/5 border border-electric/20 text-sm text-slate-300 flex items-start gap-3"
            >
              <BookOpen className="h-4 w-4 text-electric-light mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-white">
                  {courseData.find((c) => c.id === selectedCourseId)?.title}
                </p>
                <p className="text-slate-400 mt-0.5">
                  {courseData.find((c) => c.id === selectedCourseId)?.duration}{" "}
                  ·{" "}
                  {courseData.find((c) => c.id === selectedCourseId)?.level}
                </p>
              </div>
            </motion.div>
          )}

          {/* Status feedback */}
          {submitStatus !== "idle" && submitStatus !== "loading" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl flex items-start gap-3 text-sm ${
                submitStatus === "success"
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                  : "bg-rose-500/10 border border-rose-500/20 text-rose-300"
              }`}
            >
              {submitStatus === "success" ? (
                <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              )}
              {message}
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={submitStatus === "loading"}
            className="w-full h-11 gradient-electric text-white font-semibold rounded-xl glow-blue hover:opacity-90 transition-opacity"
          >
            {submitStatus === "loading" ? (
              <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Enrol Student
              </>
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
