import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";
import { Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers — Beyond Intern",
  description:
    "Join the Beyond Intern team. Explore open positions and be part of the mission to empower the next generation of professionals.",
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy">
        <section className="relative pt-32 pb-28 overflow-hidden">
          <div className="absolute inset-0 gradient-bg" />
          <div className="absolute top-20 right-1/4 h-80 w-80 rounded-full bg-electric/5 blur-[120px]" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-electric/10 border border-electric/20 mb-6">
              <Briefcase className="h-7 w-7 text-electric-light" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Join Our <span className="gradient-text">Team</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto">
              We&apos;re building the future of career education. Open positions
              will be listed here soon.
            </p>
            <div className="mt-10 glass-card rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-sm text-slate-300 leading-relaxed">
                Interested in joining Beyond Intern? Send your CV and a short
                cover letter to{" "}
                <a
                  href="mailto:info@beyondintern.com"
                  className="text-electric-light hover:underline"
                >
                  info@beyondintern.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
