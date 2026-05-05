"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Send, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { supabase } from "@/lib/supabase";

interface Review {
  id: string;
  user_name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  created_at: string;
  avatar_url: string;
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(review.created_at));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card rounded-2xl p-6 group hover:border-electric/20 transition-all"
    >
      <Quote className="h-8 w-8 text-electric/20 mb-3" />
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < review.rating ? "fill-gold text-gold" : "text-slate-700"
            }`}
          />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-slate-300">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3 pt-4 border-t border-white/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={review.avatar_url || "https://randomuser.me/api/portraits/lego/1.jpg"}
          alt={review.user_name}
          className="h-10 w-10 rounded-full object-cover bg-white/10"
        />
        <div>
          <p className="text-sm font-semibold text-white">{review.user_name}</p>
          <p className="text-xs text-slate-500">
            {review.role} {review.company ? `· ${review.company}` : ""}
          </p>
        </div>
        <span className="ml-auto text-[10px] text-slate-600">{formattedDate}</span>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [formData, setFormData] = useState({ name: "", review: "" });
  const [submitted, setSubmitted] = useState(false);

  // Fetch reviews on mount
  useEffect(() => {
    async function fetchReviews() {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setReviews(data);
      }
    }
    fetchReviews();
  }, []);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Assuming you want to insert a review directly from the form (if it's public) or submit to an admin queue
    // For now, let's do a simple insert if RLS allows, or just show success
    await supabase.from("reviews").insert({
      user_name: formData.name,
      text: formData.review,
      role: "Student",
      company: "",
      rating: 5, // Default rating for submitted
      avatar_url: "https://randomuser.me/api/portraits/lego/1.jpg"
    });
    setSubmitted(true);
    setFormData({ name: "", review: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="reviews" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 gradient-bg" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge className="bg-gold/10 text-gold-light border-gold/20 mb-4">
            Reviews
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Loved by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="mt-3 text-lg text-slate-400 max-w-xl mx-auto">
            Real stories from real professionals who levelled up with Beyond Intern.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {visibleReviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {reviews.length > 3 && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white rounded-full px-6"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Show All Reviews <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-2 text-center">
              Share Your Experience
            </h3>
            <p className="text-sm text-slate-400 mb-6 text-center">
              Were a Beyond Intern student? We&apos;d love to hear from you!
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="text-4xl mb-3">🎉</div>
                <p className="text-lg font-semibold text-white">Thank you!</p>
                <p className="text-sm text-slate-400 mt-1">
                  Your review has been submitted for approval.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-electric/50 h-11"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Tell us about your experience..."
                    value={formData.review}
                    onChange={(e) =>
                      setFormData({ ...formData, review: e.target.value })
                    }
                    required
                    rows={4}
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/30 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full gradient-electric text-white font-semibold rounded-full h-11 glow-blue hover:opacity-90 transition-opacity"
                >
                  Submit Review
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
