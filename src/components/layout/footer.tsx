import Link from "next/link";
import Image from "next/image";

const footerSections = [
  {
    title: "Platform",
    links: [
      { name: "Courses", href: "#courses" },
      { name: "Webinars", href: "#webinars" },
      { name: "Pricing", href: "#courses" },
      { name: "For Teams", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "/contact" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  },
];

const socials = [
  { label: "Twitter", icon: "𝕏", href: "#" },
  { label: "LinkedIn", icon: "in", href: "#" },
  { label: "YouTube", icon: "▶", href: "#" },
  { label: "Instagram", icon: "📷", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-navy/80">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-electric/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo-transparent.png.png"
                alt="Beyond Intern Logo"
                width={150}
                height={40}
                className="object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Empowering the next generation of professionals with industry-leading
              courses, live webinars, and mentorship from world-class instructors.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-all hover:bg-electric/20 hover:text-electric-light text-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                {section.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-electric-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © 2026 Beyond Intern | All Rights Reserved | Powered by The Writers Company
          </p>
          <p className="text-xs text-slate-500">
            Built with ❤️ for aspiring professionals & students worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
