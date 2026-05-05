"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { PressArticleRow } from "@/app/dashboard/admin/actions";

export function PressWall({ articles }: { articles: PressArticleRow[] }) {
  const [visibleCount, setVisibleCount] = useState(40);

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <div className="space-y-10">
      {/* Grid of Pills */}
      <div className="flex flex-wrap justify-center gap-3">
        {visibleArticles.map((pa) => (
          <a
            key={pa.id}
            href={pa.article_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 font-medium hover:bg-electric/10 hover:border-electric/30 hover:text-white transition-all duration-200 group"
          >
            {pa.publisher_name}
            <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-electric-light transition-colors shrink-0" />
          </a>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 40)}
            className="glass px-6 py-2.5 rounded-full border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:border-electric/50 hover:bg-white/5 transition-all duration-300"
          >
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
}
