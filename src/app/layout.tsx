import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Outfit } from "next/font/google";
import { Providers } from "@/components/providers";
import { ChatBubble } from "@/components/chatbot/chatbot";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Toaster } from "@/components/ui/toaster";
import { CookieConsent } from "@/components/shared/cookie-consent";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.beyondintern.com"),
  title: {
    default: "Beyond Intern — Premium EdTech Platform",
    template: "%s | Beyond Intern",
  },
  description:
    "Level up your career with industry-leading courses, live webinars, and mentorship from world-class instructors. Join 10,000+ students transforming their futures.",
  keywords: [
    "online courses",
    "edtech",
    "webinars",
    "professional development",
    "career growth",
    "Beyond Intern",
  ],
  alternates: {
    canonical: "https://www.beyondintern.com",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.beyondintern.com",
    title: "Beyond Intern — Premium EdTech Platform",
    description:
      "Level up your career with industry-leading courses, live webinars, and mentorship.",
    siteName: "Beyond Intern",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Beyond Intern — Premium EdTech Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beyond Intern — Premium EdTech Platform",
    description:
      "Level up your career with industry-leading courses, live webinars, and mentorship.",
    images: ["/og-default.png"],
  },
  icons: {
    icon: "/logo-transparent.png.png",
    shortcut: "/logo-transparent.png.png",
    apple: "/logo-transparent.png.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wt5ero1e1j");
            `}
          </Script>
          <FloatingWhatsApp />
          <ChatBubble />
          <Toaster />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
