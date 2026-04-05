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
      <main className="min-h-screen bg-slate-950 text-slate-300 py-20 px-4">
        <div className="max-w-4xl mx-auto glass-card rounded-2xl p-8 md:p-12 mt-10">
          <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-electric/10 border border-electric/20 mb-6 mx-auto">
            <ShieldCheck className="h-7 w-7 text-electric-light" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mb-8">
            Privacy <span className="gradient-text">Policy</span>
          </h1>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-slate-300 font-medium leading-relaxed mb-10 p-6 bg-slate-900/50 rounded-xl border border-slate-800">
              Beyond Intern&apos;s use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.
            </p>

            <div className="space-y-10">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Data Accessed</h2>
                <p className="text-slate-400 leading-relaxed text-[1.05rem]">
                  When you log in using Google, we access your basic profile information: your name, email address, and profile picture. We request only the minimum scopes necessary (openid, profile, email) for authentication.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Data Usage</h2>
                <p className="text-slate-400 leading-relaxed text-[1.05rem]">
                  Your Google data is used exclusively to create and manage your Beyond Intern account, provide seamless Single Sign-On (SSO) login functionality, and display your profile identity within your student dashboard.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Data Sharing</h2>
                <p className="text-slate-400 leading-relaxed text-[1.05rem]">
                  We do not sell, trade, or share your Google user data with third-party advertising or marketing networks. Your data is only shared with our secure infrastructure providers strictly for the purpose of operating the Beyond Intern platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Data Storage & Protection</h2>
                <p className="text-slate-400 leading-relaxed text-[1.05rem]">
                  Your data is stored securely in our encrypted PostgreSQL database. We implement strict Row Level Security (RLS) and industry-standard encryption protocols to ensure your data is protected against unauthorized access.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Data Retention & Deletion</h2>
                <p className="text-slate-400 leading-relaxed text-[1.05rem]">
                  We retain your Google data only as long as your Beyond Intern account remains active. You can request the complete deletion of your account and all associated Google user data at any time by emailing us at {" "}
                  <a href="mailto:info@beyondintern.com" className="text-electric-light hover:underline font-medium">info@beyondintern.com</a>. Upon request, your data will be permanently purged from our databases within 30 days.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
