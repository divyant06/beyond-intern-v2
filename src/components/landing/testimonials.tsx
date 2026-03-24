"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Send, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Charlotte Williams",
    role: "Junior Developer",
    company: "Barclays",
    rating: 5,
    text: "Beyond Intern completely transformed my understanding of full-stack development. The hands-on projects were incredibly practical and the mentorship quality is unmatched. Landed my first dev role within 2 months!",
    date: "2 weeks ago",
    avatar: "CW",
  },
  {
    id: "2",
    name: "Rajesh Patel",
    role: "Data Analyst",
    company: "Deloitte",
    rating: 5,
    text: "The Data Science course is genuinely world-class. Professor Williams explains complex ML concepts in such an accessible way. The community support and career resources made all the difference.",
    date: "1 month ago",
    avatar: "RP",
  },
  {
    id: "3",
    name: "Emma Thompson",
    role: "UX Designer",
    company: "Revolut",
    rating: 5,
    text: "As someone transitioning from graphic design to UX, this platform was a godsend. The design course by Lisa Nakamura is pure gold. My portfolio went from basic to interview-ready.",
    date: "3 weeks ago",
    avatar: "ET",
  },
  {
    id: "4",
    name: "Omar Hassan",
    role: "DevOps Engineer",
    company: "Sky",
    rating: 4,
    text: "The AWS certification prep was outstanding. Alex Rivera's real-world examples make abstract cloud concepts click immediately. Highly recommend for anyone eyeing a cloud career.",
    date: "1 month ago",
    avatar: "OH",
  },
  {
    id: "5",
    name: "Sophie Martinez",
    role: "Product Manager",
    company: "Monzo",
    rating: 5,
    text: "The PM bootcamp exceeded every expectation. The frameworks taught here are the same ones used at top tech companies. The live webinars are an amazing bonus for staying current.",
    date: "2 months ago",
    avatar: "SM",
  },
  {
    id: "6",
    name: "James O'Brien",
    role: "Software Engineer",
    company: "Starling Bank",
    rating: 5,
    text: "Went from a complete career changer to a confident developer in under 6 months. The structured learning path, weekly webinars, and amazing community made the journey enjoyable.",
    date: "3 months ago",
    avatar: "JO",
  },
];

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card rounded-2xl p-6 group hover:border-electric/20 transition-all"
    >
      {/* Quote icon */}
      <Quote className="h-8 w-8 text-electric/20 mb-3" />

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < review.rating
                ? "fill-gold text-gold"
                : "text-slate-700"
            }`}
          />
        ))}
      </div>

      {/* Review text */}
      <p className="text-sm leading-relaxed text-slate-300">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-5 flex items-center gap-3 pt-4 border-t border-white/5">
        <div className="h-10 w-10 rounded-full gradient-electric flex items-center justify-center text-sm font-bold text-white">
          {review.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{review.name}</p>
          <p className="text-xs text-slate-500">
            {review.role} · {review.company}
          </p>
        </div>
        <span className="ml-auto text-[10px] text-slate-600">{review.date}</span>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const [showAll, setShowAll] = useState(false);
  const [formData, setFormData] = useState({ name: "", review: "" });
  const [submitted, setSubmitted] = useState(false);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", review: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="reviews" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 gradient-bg" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
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

        {/* Reviews grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {visibleReviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Show more/less */}
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

        {/* Submit review form */}
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
