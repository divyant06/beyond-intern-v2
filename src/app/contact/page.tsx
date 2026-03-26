import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — Beyond Intern",
  description:
    "Get in touch with the Beyond Intern team. Reach us for career counselling, technical support, or general enquiries.",
};

const contacts = [
  {
    icon: MessageSquare,
    color: "text-electric-light",
    bg: "bg-electric/10",
    border: "border-electric/20",
    glow: "hover:glow-blue",
    label: "Career Counselor & Head Motivator",
    name: "Nandani Sharma",
    lines: [{ type: "email", value: "nandani.sharma@beyondintern.com" }],
    emoji: "🎓",
  },
  {
    icon: Mail,
    color: "text-gold-light",
    bg: "bg-gold/10",
    border: "border-gold/20",
    glow: "hover:shadow-gold/20",
    label: "Team Beyond Intern",
    name: "Success & Placements",
    lines: [{ type: "email", value: "success@beyondintern.com" }],
    emoji: "🏆",
  },
  {
    icon: MessageSquare,
    color: "text-purple-300",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    glow: "hover:shadow-purple-500/20",
    label: "Technical Team",
    name: "Platform & Engineering",
    lines: [{ type: "email", value: "technical@beyondintern.com" }],
    emoji: "⚙️",
  },
  {
    icon: MapPin,
    color: "text-emerald",
    bg: "bg-emerald/10",
    border: "border-emerald/20",
    glow: "hover:shadow-emerald/20",
    label: "Headquarters",
    name: "Beyond Intern HQ",
    lines: [
      { type: "email", value: "info@beyondintern.com" },
      { type: "phone", value: "+44 7405 483573" },
      {
        type: "address",
        value: "FF09-JTM Mall, Jagatpura, Jaipur, Rajasthan, India",
      },
    ],
    emoji: "🏢",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative pt-40 pb-20 overflow-hidden">
          <div className="absolute inset-0 gradient-bg" />
          <div className="absolute top-20 left-1/4 h-80 w-80 rounded-full bg-electric/6 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-gold/5 blur-[120px]" />

          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <span className="inline-block px-4 py-2 rounded-full glass border border-white/10 text-sm text-slate-300 font-medium mb-8">
              💬 We&apos;d Love to Hear From You
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re curious about our courses, need career advice, or have a
              partnership idea — our team is ready for you. Reach out and we&apos;ll respond
              within 24 hours.
            </p>
          </div>
        </section>

        {/* ── Contact Cards ─────────────────────────────────────────────── */}
        <section className="relative py-16 pb-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {contacts.map((c) => (
                <div
                  key={c.label}
                  className={`glass-card rounded-2xl p-6 flex flex-col gap-4 hover:-translate-y-2 transition-all duration-300 ${c.glow} border ${c.border} group`}
                >
                  {/* Icon + emoji */}
                  <div className="flex items-center justify-between">
                    <div className={`h-12 w-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                      <c.icon className={`h-6 w-6 ${c.color}`} />
                    </div>
                    <span className="text-2xl">{c.emoji}</span>
                  </div>

                  {/* Label & name */}
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-widest ${c.color} mb-1`}>
                      {c.label}
                    </p>
                    <h3 className="text-base font-bold text-white leading-snug">{c.name}</h3>
                  </div>

                  {/* Contact details */}
                  <ul className="space-y-2 mt-auto">
                    {c.lines.map((line) => (
                      <li key={line.value} className="flex items-start gap-2 text-sm">
                        {line.type === "email" && (
                          <>
                            <Mail className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" />
                            <a
                              href={`mailto:${line.value}`}
                              className={`${c.color} hover:underline break-all leading-snug`}
                            >
                              {line.value}
                            </a>
                          </>
                        )}
                        {line.type === "phone" && (
                          <>
                            <Phone className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" />
                            <a
                              href={`tel:${line.value.replace(/\s/g, "")}`}
                              className="text-slate-300 hover:text-white leading-snug"
                            >
                              {line.value}
                            </a>
                          </>
                        )}
                        {line.type === "address" && (
                          <>
                            <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" />
                            <span className="text-slate-400 leading-snug">{line.value}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* ── Quick note ─────────────────────────────────────────────── */}
            <div className="mt-16 glass-card rounded-2xl px-8 py-10 text-center max-w-2xl mx-auto">
              <p className="text-2xl mb-3">🕐</p>
              <h3 className="text-lg font-bold text-white mb-2">Response Time</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Our team typically responds within{" "}
                <span className="text-electric-light font-semibold">24 business hours</span>.
                For urgent matters, please email{" "}
                <a
                  href="mailto:info@beyondintern.com"
                  className="text-electric-light hover:underline"
                >
                  info@beyondintern.com
                </a>{" "}
                or call us directly.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
