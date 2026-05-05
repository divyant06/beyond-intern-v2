import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ExternalLink } from "lucide-react";
import {
  fetchCarouselImages,
  fetchBrandPartners,
  fetchPressArticles,
} from "@/app/dashboard/admin/actions";
import type {
  CarouselImageRow,
  BrandPartnerRow,
  PressArticleRow,
} from "@/app/dashboard/admin/actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Collaborations & Associations | Beyond Intern",
  description:
    "Explore Beyond Intern's global brand partnerships, media presence, and press coverage driving career transformation worldwide.",
};

/* ── Helper: extract clean domain from a URL ─────────────────────────── */
function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    // fallback: strip protocol and www manually
    return url
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0];
  }
}

/* ══════════════════════════════════════════════════════════════════════ */
export default async function CollaborationsPage() {
  const [carouselImages, brandPartners, pressArticles] = await Promise.all([
    fetchCarouselImages(),
    fetchBrandPartners(),
    fetchPressArticles(),
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy text-slate-300">
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 gradient-bg" />
          <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-electric/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />

          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <span className="inline-block px-4 py-2 rounded-full glass border border-white/10 text-sm text-slate-300 font-medium mb-8">
              🤝 Partnerships &amp; Press
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Our Collaborations &amp;{" "}
              <span className="gradient-text">Media Presence</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Partnering with global leaders to bring the best value to your
              career. From world-class brands to leading publications, here is
              the ecosystem powering Beyond Intern.
            </p>
          </div>
        </section>

        {/* ── Media Carousel ──────────────────────────────────────── */}
        {carouselImages.length > 0 && (
          <section className="relative py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white">
                  Media <span className="gradient-text">Gallery</span>
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Highlights from our events, partnerships, and campus drives.
                </p>
              </div>

              {/* CSS-only horizontal scroll — hides scrollbar */}
              <div
                className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <style>{`section .flex::-webkit-scrollbar { display: none; }`}</style>

                {carouselImages.map((img: CarouselImageRow) => (
                  <div
                    key={img.id}
                    className={`shrink-0 snap-center rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(37,99,235,0.1)] group ${
                      img.orientation === "portrait"
                        ? "w-56 aspect-3/4"
                        : "w-80 aspect-video"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.image_url}
                      alt="Beyond Intern media"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Brand Partners ──────────────────────────────────────── */}
        {brandPartners.length > 0 && (
          <section className="relative py-20">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-electric/20 to-transparent" />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-14">
                <h2 className="text-3xl font-bold text-white">
                  Trusted by{" "}
                  <span className="gradient-text">Industry Leaders</span>
                </h2>
                <p className="mt-3 text-sm text-slate-400 max-w-xl mx-auto">
                  We collaborate with globally recognised organisations to
                  deliver real-world learning experiences and placement
                  opportunities.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {brandPartners.map((bp: BrandPartnerRow) => {
                  const domain = extractDomain(bp.website_link);
                  return (
                    <a
                      key={bp.id}
                      href={bp.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-center group hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 border border-white/10"
                    >
                      {/* Clearbit logo with initial-letter fallback */}
                      <div className="relative h-12 w-12 rounded-lg bg-white shadow-md flex items-center justify-center overflow-hidden">
                        <span className="text-lg font-bold text-slate-400 select-none">
                          {bp.name.charAt(0).toUpperCase()}
                        </span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://logo.clearbit.com/${domain}`}
                          alt={`${bp.name} logo`}
                          className="absolute inset-0 h-full w-full object-contain p-1.5"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-sm font-semibold text-white group-hover:text-electric-light transition-colors">
                        {bp.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── Press Wall ──────────────────────────────────────────── */}
        {pressArticles.length > 0 && (
          <section className="relative py-20">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-14">
                <h2 className="text-3xl font-bold text-white">
                  Featured Press &amp;{" "}
                  <span className="gradient-text">Media</span>
                </h2>
                <p className="mt-3 text-sm text-slate-400 max-w-xl mx-auto">
                  Beyond Intern in the news — coverage from publishers and media
                  outlets around the world.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {pressArticles.map((pa: PressArticleRow) => (
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
            </div>
          </section>
        )}

        {/* ── Closing CTA ─────────────────────────────────────────── */}
        <section className="relative py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center shadow-2xl border border-white/20">
              <div className="absolute inset-0 bg-linear-to-r from-electric via-blue-600 to-indigo-600 opacity-90" />
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Want to Partner with Us?
                </h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  We&apos;re always looking for forward-thinking organisations,
                  educators, and media partners to join our mission. Let&apos;s
                  create impact together.
                </p>
                <div className="pt-4">
                  <a
                    href="mailto:info@beyondintern.com"
                    className="inline-flex items-center justify-center bg-white text-electric font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300 shadow-xl"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
