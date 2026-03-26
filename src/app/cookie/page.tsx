import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";
import { Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy — Beyond Intern",
  description:
    "Read the Beyond Intern Cookie Policy. Learn how we use cookies to improve your experience.",
};

export default function CookiePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy">
        <section className="relative pt-32 pb-28 overflow-hidden">
          <div className="absolute inset-0 gradient-bg" />
          <div className="absolute top-20 left-1/3 h-80 w-80 rounded-full bg-gold/5 blur-[120px]" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gold/10 border border-gold/20 mb-6">
              <Cookie className="h-7 w-7 text-gold-light" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Cookie <span className="gradient-text">Policy</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto">
              We use cookies to improve your browsing experience. Our detailed
              cookie policy is currently being finalised.
            </p>
            <div className="mt-10 glass-card rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-sm text-slate-300 leading-relaxed">
                Updated policies coming soon. For any enquiries, please contact
                us at{" "}
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
