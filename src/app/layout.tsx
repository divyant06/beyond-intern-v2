import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Providers } from "@/components/providers";
import { ChatBubble } from "@/components/chatbot/chatbot";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Toaster } from "@/components/ui/toaster";
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
  openGraph: {
    type: "website",
    locale: "en_GB",
    title: "Beyond Intern — Premium EdTech Platform",
    description:
      "Level up your career with industry-leading courses, live webinars, and mentorship.",
    siteName: "Beyond Intern",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beyond Intern — Premium EdTech Platform",
    description:
      "Level up your career with industry-leading courses, live webinars, and mentorship.",
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
          <FloatingWhatsApp />
          <ChatBubble />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
