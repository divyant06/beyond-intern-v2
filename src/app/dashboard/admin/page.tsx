"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  UserPlus,
  CheckCircle,
  AlertCircle,
  BookOpen,
  BarChart3,
  PlusCircle,
  Trash2,
  Pencil,
  Users,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { courseData } from "@/lib/courses";
import {
  assignCourse,
  upsertCourse,
  deleteCourse,
  fetchAllCourses,
  fetchRegisteredUsers,
  fetchActiveEnrollments,
} from "./actions";

const ADMIN_EMAILS = ["info@beyondintern.com", "ansupoddar11@gmail.com"];

type Status = "idle" | "loading" | "success" | "error";
type Tab = "enrol" | "courses" | "analytics";

interface RawCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  outcomes: string;
  created_at?: string;
}

interface RegUser {
  id: string;
  email: string;
  created_at: string;
}

interface Enrollment {
  user_email: string;
  course_id: string;
  created_at: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<Tab>("enrol");

  // ── Enrol State ──
  const [userEmail, setUserEmail] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [submitStatus, setSubmitStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  // ── Course Management State ──
  const [courseForm, setCourseForm] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    duration: "",
    level: "",
    outcomes: "",
  });
  const [courseStatus, setCourseStatus] = useState<Status>("idle");
  const [courseMsg, setCourseMsg] = useState("");
  const [publishedCourses, setPublishedCourses] = useState<RawCourse[]>([]);
  const [editingCourse, setEditingCourse] = useState<string | null>(null);

  // ── Analytics State ──
  const [registeredUsers, setRegisteredUsers] = useState<RegUser[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  const isAdmin =
    session?.user?.email && ADMIN_EMAILS.includes(session.user.email);

  // ── Data Fetchers (defined outside effect so handlers can call them) ──
  const loadCourses = useCallback(async () => {
    const data = await fetchAllCourses();
    setPublishedCourses(data as RawCourse[]);
  }, []);

  const loadAnalytics = useCallback(async () => {
    const [users, enrols] = await Promise.all([
      fetchRegisteredUsers(),
      fetchActiveEnrollments(),
    ]);
    setRegisteredUsers(users as RegUser[]);
    setEnrollments(enrols as Enrollment[]);
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    // Invoke via .then() so setState is never called synchronously in the
    // effect body — satisfies the React cascading-render lint rule.
    loadCourses();
    loadAnalytics();
    // loadCourses/loadAnalytics are stable (empty deps) — safe to omit from
    // deps array, or include — either way there is no cascading render because
    // state is set inside an async callback, not synchronously.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  // ── Enrol Handler ──
  async function handleAssign(e: React.FormEvent) {
    e.preventDefault();
    if (!userEmail || !selectedCourseId) return;
    setSubmitStatus("loading");
    setMessage("");
    const result = await assignCourse(userEmail, selectedCourseId);
    if (result.success) {
      setMessage(
        `Successfully enrolled ${userEmail} in "${courseData.find((c) => c.id === selectedCourseId)?.title}".`
      );
      setSubmitStatus("success");
      setUserEmail("");
      setSelectedCourseId("");
      loadAnalytics();
    } else {
      setMessage(result.message || "Failed to assign course.");
      setSubmitStatus("error");
    }
  }

  // ── Course Publish Handler ──
  async function handlePublishCourse(e: React.FormEvent) {
    e.preventDefault();
    if (!courseForm.id || !courseForm.title) return;
    setCourseStatus("loading");
    setCourseMsg("");
    const result = await upsertCourse(courseForm);
    if (result.success) {
      setCourseMsg(
        editingCourse ? "Course updated successfully!" : "Course published successfully!"
      );
      setCourseStatus("success");
      setCourseForm({ id: "", title: "", description: "", category: "", duration: "", level: "", outcomes: "" });
      setEditingCourse(null);
      loadCourses();
    } else {
      setCourseMsg(result.message || "Failed to publish course.");
      setCourseStatus("error");
    }
  }

  // ── Course Delete Handler ──
  async function handleDeleteCourse(courseId: string) {
    if (!confirm("Remove this course permanently?")) return;
    const result = await deleteCourse(courseId);
    if (result.success) loadCourses();
  }

  // ── Edit Prefill ──
  function handleEditCourse(course: RawCourse) {
    setCourseForm({
      id: course.id,
      title: course.title,
      description: course.description,
      category: course.category,
      duration: course.duration,
      level: course.level,
      outcomes: course.outcomes,
    });
    setEditingCourse(course.id);
    setActiveTab("courses");
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

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "enrol", label: "Enrol Student", icon: <UserPlus className="h-4 w-4" /> },
    { key: "courses", label: "Manage Courses", icon: <BookOpen className="h-4 w-4" /> },
    { key: "analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-4xl"
    >
      {/* Tab Navigation */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === t.key
                ? "gradient-electric text-white glow-blue shadow-lg"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ════════════════════════ TAB 1: ENROL STUDENT ═══════════════════════ */}
        {activeTab === "enrol" && (
          <motion.div key="enrol" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <UserPlus className="h-6 w-6 text-electric-light" />
                Admin — Enrol a Student
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Assign a course to any registered user by their email address.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 space-y-6">
              <form onSubmit={handleAssign} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Student Email</label>
                  <Input
                    type="email"
                    placeholder="student@example.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-electric/50 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Select Course</label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    required
                    className="w-full h-11 rounded-xl bg-white/5 border border-white/10 text-white px-3 text-sm focus:outline-none focus:border-electric/50 transition-colors"
                  >
                    <option value="" disabled className="bg-slate-900">— Choose a course —</option>
                    {courseData.map((course) => (
                      <option key={course.id} value={course.id} className="bg-slate-900">
                        [{course.category}] {course.title}
                      </option>
                    ))}
                  </select>
                </div>

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
                        {courseData.find((c) => c.id === selectedCourseId)?.duration}{" "}·{" "}
                        {courseData.find((c) => c.id === selectedCourseId)?.level}
                      </p>
                    </div>
                  </motion.div>
                )}

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
        )}

        {/* ════════════════════ TAB 2: MANAGE COURSES ════════════════════════ */}
        {activeTab === "courses" && (
          <motion.div key="courses" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <PlusCircle className="h-6 w-6 text-electric-light" />
                {editingCourse ? "Edit Course" : "Publish a New Course"}
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                {editingCourse
                  ? "Modify the course details and save your changes."
                  : "Fill out the form to publish a course to the website."}
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <form onSubmit={handlePublishCourse} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">YouTube Video ID (Primary Key)</label>
                    <Input
                      placeholder="e.g. rfscVS0vtbw"
                      value={courseForm.id}
                      onChange={(e) => setCourseForm({ ...courseForm, id: e.target.value })}
                      required
                      disabled={!!editingCourse}
                      className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-electric/50 rounded-xl disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Title</label>
                    <Input
                      placeholder="Course title"
                      value={courseForm.title}
                      onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                      required
                      className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-electric/50 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Description</label>
                  <textarea
                    placeholder="Detailed course description..."
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    rows={3}
                    className="w-full rounded-xl bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-electric/50 transition-colors placeholder:text-white/40 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Category</label>
                    <Input
                      placeholder="e.g. Technical Skills"
                      value={courseForm.category}
                      onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                      className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-electric/50 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Duration</label>
                    <Input
                      placeholder="e.g. 16 Weeks"
                      value={courseForm.duration}
                      onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                      className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-electric/50 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Level</label>
                    <Input
                      placeholder="e.g. Beginner"
                      value={courseForm.level}
                      onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                      className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-electric/50 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Outcomes (one per line)</label>
                  <textarea
                    placeholder={"Junior Developer\nBackend Engineer\nAutomation Specialist"}
                    value={courseForm.outcomes}
                    onChange={(e) => setCourseForm({ ...courseForm, outcomes: e.target.value })}
                    rows={3}
                    className="w-full rounded-xl bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-electric/50 transition-colors placeholder:text-white/40 resize-none"
                  />
                </div>

                {courseStatus !== "idle" && courseStatus !== "loading" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-start gap-3 text-sm ${
                      courseStatus === "success"
                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                        : "bg-rose-500/10 border border-rose-500/20 text-rose-300"
                    }`}
                  >
                    {courseStatus === "success" ? <CheckCircle className="h-4 w-4 mt-0.5" /> : <AlertCircle className="h-4 w-4 mt-0.5" />}
                    {courseMsg}
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={courseStatus === "loading"}
                    className="flex-1 h-11 gradient-electric text-white font-semibold rounded-xl glow-blue hover:opacity-90 transition-opacity"
                  >
                    {courseStatus === "loading" ? (
                      <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : editingCourse ? (
                      <><Pencil className="mr-2 h-4 w-4" /> Update Course</>
                    ) : (
                      <><PlusCircle className="mr-2 h-4 w-4" /> Publish Course</>
                    )}
                  </Button>
                  {editingCourse && (
                    <Button
                      type="button"
                      onClick={() => {
                        setEditingCourse(null);
                        setCourseForm({ id: "", title: "", description: "", category: "", duration: "", level: "", outcomes: "" });
                      }}
                      className="h-11 bg-white/5 border border-white/10 text-slate-300 rounded-xl hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </div>

            {/* Published Courses List */}
            {publishedCourses.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-electric-light" />
                  Published Courses ({publishedCourses.length})
                </h2>
                <div className="space-y-2">
                  {publishedCourses.map((c) => (
                    <div
                      key={c.id}
                      className="glass-card rounded-xl p-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{c.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {c.category} · {c.duration} · {c.level}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleEditCourse(c)}
                          className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(c.id)}
                          className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ════════════════════ TAB 3: ANALYTICS ═════════════════════════════ */}
        {activeTab === "analytics" && (
          <motion.div key="analytics" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-electric-light" />
                Student Analytics
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Overview of registered users and active enrollments.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{registeredUsers.length}</p>
                  <p className="text-xs text-slate-400">Registered Users</p>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{enrollments.length}</p>
                  <p className="text-xs text-slate-400">Active Enrollments</p>
                </div>
              </div>
            </div>

            {/* Registered Users List */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                Registered Users
              </h2>
              {registeredUsers.length === 0 ? (
                <p className="text-sm text-slate-500">No users found.</p>
              ) : (
                <div className="max-h-64 overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                  {registeredUsers.map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/3 hover:bg-white/6 transition-colors"
                    >
                      <span className="text-sm text-slate-300 truncate">{u.email}</span>
                      <span className="text-[10px] text-slate-600 shrink-0 ml-3">
                        {new Date(u.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Active Enrollments List */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-emerald-400" />
                Active Enrollments
              </h2>
              {enrollments.length === 0 ? (
                <p className="text-sm text-slate-500">No enrollments yet.</p>
              ) : (
                <div className="max-h-64 overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                  {enrollments.map((en, i) => (
                    <div
                      key={`${en.user_email}-${en.course_id}-${i}`}
                      className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/3 hover:bg-white/6 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-slate-300 truncate">{en.user_email}</p>
                        <p className="text-xs text-slate-500 truncate">
                          {courseData.find((c) => c.id === en.course_id)?.title || en.course_id}
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-600 shrink-0 ml-3">
                        {new Date(en.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
