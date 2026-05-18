"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "hasConsent";

export function CookieConsent() {
  // null = not yet checked (avoid SSR flash), true/false = decision made
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    // If the user already decided, keep the banner hidden
    // We use setTimeout to avoid calling setState synchronously in an effect
    const timer = setTimeout(() => {
      setVisible(stored === null);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "true");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "false");
    setVisible(false);
  };

  // Don't render anything until after the client-side check
  if (visible === null) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className={[
            // Position & stacking
            "fixed bottom-5 left-5 z-50",
            // Sizing
            "w-[calc(100vw-2.5rem)] max-w-sm",
            // Glass card appearance matching the app's dark theme
            "rounded-2xl border border-white/10 bg-navy/80 backdrop-blur-md shadow-2xl",
            "p-5",
          ].join(" ")}
        >
          {/* Header row */}
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-electric/10 shrink-0">
              <Cookie className="h-4 w-4 text-electric-light" />
            </span>
            <p className="text-sm font-semibold text-white">Cookie Preferences</p>
          </div>

          {/* Body text */}
          <p className="text-xs leading-relaxed text-slate-400 mb-5">
            We use local storage and cookies to save your course progress and
            improve your learning experience. You can change your preference at any
            time.
          </p>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button
              id="cookie-accept"
              size="sm"
              onClick={handleAccept}
              className="flex-1 gradient-electric text-white font-semibold rounded-full hover:opacity-90 transition-opacity text-xs h-9"
            >
              Accept
            </Button>
            <Button
              id="cookie-decline"
              size="sm"
              variant="outline"
              onClick={handleDecline}
              className="flex-1 border-white/10 text-slate-300 hover:bg-white/5 hover:text-white rounded-full text-xs h-9"
            >
              Decline
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
