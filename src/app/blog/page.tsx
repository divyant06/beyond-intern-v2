import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Beyond Intern",
  description:
    "Career tips, industry insights, internship guides, and success stories from the Beyond Intern community.",
};

type BlogCategory = "Career" | "Tech" | "Finance" | "Marketing" | "Mindset" | "Success Story";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTime: string;
  date: string;
  emoji: string;
  gradient: string;
}

const CATEGORY_COLORS: Record<BlogCategory, string> = {
  Career: "bg-electric/20 text-electric-light border-electric/30",
  Tech: "bg-emerald/20 text-emerald border-emerald/30",
  Finance: "bg-gold/20 text-gold-light border-gold/30",
  Marketing: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Mindset: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Success Story": "bg-rose/20 text-rose border-rose/30",
};

const POSTS: BlogPost[] = [
  {
    id: "1",
    title: "How to Land Your First Tech Internship in 2026",
    excerpt:
      "The tech job market has changed. Here's the step-by-step playbook that helped 500+ Beyond Intern students secure their first role — even with no prior experience.",
    category: "Career",
    readTime: "6 min read",
    date: "22 Mar 2026",
    emoji: "🚀",
    gradient: "from-blue-600/30 to-cyan-500/20",
  },
  {
    id: "2",
    title: "Python vs Java in 2026: Which Should You Learn First?",
    excerpt:
      "Both are powerful, both are in demand — but for a beginner, the choice matters. We break down salary data, job market trends, and learning curves to help you decide.",
    category: "Tech",
    readTime: "8 min read",
    date: "18 Mar 2026",
    emoji: "💻",
    gradient: "from-emerald-600/30 to-teal-500/20",
  },
  {
    id: "3",
    title: "Understanding UK Stock Markets: A Beginner's Guide",
    excerpt:
      "From the FTSE 100 to ISAs and ETFs — this plain-English guide demystifies investing in the UK and shows you how to start growing your wealth from your first paycheck.",
    category: "Finance",
    readTime: "10 min read",
    date: "15 Mar 2026",
    emoji: "📈",
    gradient: "from-green-600/30 to-emerald-500/20",
  },
  {
    id: "4",
    title: "The LinkedIn Profile Formula That Gets You Noticed by Recruiters",
    excerpt:
      "A well-optimised LinkedIn profile is the single highest ROI career move you can make in 2026. Here's the exact section-by-section structure our placement team uses.",
    category: "Career",
    readTime: "7 min read",
    date: "10 Mar 2026",
    emoji: "🔗",
    gradient: "from-indigo-600/30 to-violet-500/20",
  },
  {
    id: "5",
    title: "From Graduate to Google: Priya's Beyond Intern Success Story",
    excerpt:
      "Priya had no connections, no prior coding experience, and a degree in English Literature. Six months after joining Beyond Intern's Full Stack program, she accepted an offer from Google London.",
    category: "Success Story",
    readTime: "5 min read",
    date: "5 Mar 2026",
    emoji: "⭐",
    gradient: "from-rose-600/30 to-fuchsia-500/20",
  },
  {
    id: "6",
    title: "Digital Marketing in 2026: Trends Every Marketer Must Know",
    excerpt:
      "AI content generation, zero-click searches, short-form video dominance — the landscape has shifted dramatically. Here's how to stay ahead and become a sought-after digital marketer.",
    category: "Marketing",
    readTime: "9 min read",
    date: "1 Mar 2026",
    emoji: "📢",
    gradient: "from-orange-600/30 to-amber-500/20",
  },
];

const ALL_CATEGORIES = [
  "All",
  "Career",
  "Tech",
  "Finance",
  "Marketing",
  "Mindset",
  "Success Story",
] as const;

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 gradient-bg" />
          <div className="absolute top-20 left-1/4 h-80 w-80 rounded-full bg-electric/5 blur-[120px]" />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-electric/10 text-electric-light text-sm font-medium border border-electric/20 mb-6">
              ✍️ Beyond Intern Blog
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Insights to{" "}
              <span className="gradient-text">Accelerate Your Career</span>
            </h1>
            <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto">
              Career tips, industry insights, and real success stories from the Beyond Intern community.
            </p>
          </div>
        </section>

        {/* ── Filter bar ───────────────────────────────────────────────── */}
        <div className="relative border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 py-5 flex flex-wrap items-center gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <span
                key={cat}
                className={`text-xs font-medium px-4 py-1.5 rounded-full border cursor-pointer transition-all ${
                  cat === "All"
                    ? "gradient-electric text-white border-transparent"
                    : "border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-white/5"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* ── Post grid ─────────────────────────────────────────────────── */}
        <section className="relative py-12 pb-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {POSTS.map((post, i) => (
                <article
                  key={post.id}
                  className="group glass-card rounded-2xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {/* Thumbnail */}
                  <div
                    className={`relative h-44 bg-linear-to-br ${post.gradient} flex items-center justify-center overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-navy/30" />
                    <span className="relative z-10 text-6xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">
                      {post.emoji}
                    </span>
                    <div className="absolute top-3 left-3 z-10">
                      <Badge
                        className={`${CATEGORY_COLORS[post.category]} text-xs`}
                      >
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-base font-semibold text-white leading-snug group-hover:text-electric-light transition-colors line-clamp-2 mb-3">
                      {post.title}
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta + CTA */}
                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="flex items-center gap-1 text-xs font-semibold text-electric-light hover:text-white transition-colors"
                      >
                        Read More
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load more CTA */}
            <div className="mt-14 text-center">
              <button className="px-8 py-3 rounded-full glass border border-white/10 text-slate-300 text-sm font-medium hover:text-white hover:border-white/20 transition-all">
                Load More Articles
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
