import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Beyond Intern",
  description:
    "Read the Beyond Intern Privacy Policy. We are committed to protecting your personal data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy">
        <section className="relative pt-32 pb-28 overflow-hidden">
          <div className="absolute inset-0 gradient-bg" />
          <div className="absolute top-20 left-1/3 h-80 w-80 rounded-full bg-electric/5 blur-[120px]" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-electric/10 border border-electric/20 mb-6">
              <ShieldCheck className="h-7 w-7 text-electric-light" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto">
              We take your privacy seriously. Our updated privacy policy is
              currently being finalised and will be published shortly.
            </p>
            <div className="mt-10 glass-card rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-sm text-slate-300 leading-relaxed">
                Updated policies coming soon. For any data-related enquiries,
                please contact us at{" "}
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
