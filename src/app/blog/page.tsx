"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  reading_time_minutes: number;
  url: string;
  cover_image: string | null;
  tag_list: string[];
}

const ALL_CATEGORIES = [
  "All",
  "Career",
  "Tech",
  "Finance",
  "Marketing",
  "Mindset",
  "Success Story",
];

const categoryTags: Record<string, string> = {
  All: "programming",
  Career: "career",
  Tech: "webdev",
  Finance: "fintech",
  Marketing: "marketing",
  Mindset: "productivity",
  "Success Story": "success",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      try {
        const tag = categoryTags[activeCategory] || "programming";
        const res = await fetch(
          `https://dev.to/api/articles?tag=${tag}&per_page=6`
        );
        if (!res.ok) throw new Error("Failed to fetch articles");
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching dev.to posts:", error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();
  }, [activeCategory]);

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
              Beyond Intern Blog
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Insights to{" "}
              <span className="gradient-text">Accelerate Your Career</span>
            </h1>
            <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto">
              Career tips, industry insights, and real success stories from the
              Beyond Intern community.
            </p>
          </div>
        </section>

        {/* ── Filter bar ───────────────────────────────────────────────── */}
        <div className="relative border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 py-5 flex flex-wrap items-center gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-medium px-4 py-1.5 rounded-full border cursor-pointer transition-all ${
                  activeCategory === cat
                    ? "gradient-electric text-white border-transparent"
                    : "border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Post grid ─────────────────────────────────────────────────── */}
        <section className="relative py-12 pb-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {isLoading ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-96 rounded-2xl glass-card animate-pulse bg-white/5"
                  />
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center text-slate-400 py-10">
                No articles found for &quot;{activeCategory}&quot;.
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((post, i) => {
                  const fallBackImage =
                    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80";
                  const coverImage = post.cover_image || fallBackImage;
                  const formattedDate = new Date(
                    post.published_at
                  ).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
                  const tag = post.tag_list?.[0] || "Tech";

                  return (
                    <Link
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={post.id}
                      className="group glass-card rounded-2xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      {/* Thumbnail */}
                      <div className="relative h-44 flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={coverImage}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute top-3 left-3 z-10">
                          <Badge className="bg-electric/20 text-electric-light border-electric/30 text-xs capitalize">
                            {tag}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">
                        <h2 className="text-base font-semibold text-white leading-snug group-hover:text-electric-light transition-colors line-clamp-2 mb-3">
                          {post.title}
                        </h2>
                        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1">
                          {post.description}
                        </p>

                        {/* Meta + CTA */}
                        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formattedDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.reading_time_minutes} min read
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-semibold text-electric-light group-hover:text-white transition-colors">
                            Read More
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
