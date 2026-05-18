"use client";

import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const DISMISSAL_KEY = "notif_prompt_dismissed";

type PromptState = "idle" | "visible" | "hidden";

export function NotificationPrompt() {
  const [promptState, setPromptState] = useState<PromptState>("idle");
  const [permissionResult, setPermissionResult] = useState<
    "granted" | "denied" | null
  >(null);

  useEffect(() => {
    // Guard: SSR safety — Notification API is browser-only
    if (typeof window === "undefined" || !("Notification" in window)) return;

    // Only show if permission hasn't been decided yet AND user hasn't dismissed our banner
    const alreadyDismissed = localStorage.getItem(DISMISSAL_KEY) === "true";
    if (Notification.permission === "default" && !alreadyDismissed) {
      // Defer to avoid flashing on initial render
      const timer = setTimeout(() => setPromptState("visible"), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleEnable = async () => {
    try {
      const result = await Notification.requestPermission();
      // Narrow: "default" means the prompt was dismissed without a decision
      // — treat it the same as "denied" for our state union.
      setPermissionResult(result === "granted" ? "granted" : "denied");
    } catch {
      // requestPermission can throw in some browsers (e.g., Firefox with strict settings)
      setPermissionResult("denied");
    } finally {
      setPromptState("hidden");
    }
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISSAL_KEY, "true");
    setPromptState("hidden");
  };

  // Nothing to render in SSR, idle, or hidden states
  if (promptState !== "visible") return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={[
        // Layout & positioning
        "relative flex items-start gap-4 px-5 py-4",
        // Glassmorphism aesthetic matching the dashboard theme
        "bg-white/5 backdrop-blur-md",
        "border-b border-white/10",
        // Slide-in animation via CSS (no extra dependency)
        "animate-[slideDown_0.35s_ease-out]",
      ].join(" ")}
    >
      {/* Bell icon */}
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
        <Bell className="size-4" aria-hidden="true" />
      </span>

      {/* Copy */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white leading-snug">
          Stay ahead of your cohort
        </p>
        <p className="mt-0.5 text-xs text-white/60 leading-relaxed">
          Enable notifications to get instant alerts for live classes and course
          updates.
        </p>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        <Button
          id="notif-prompt-enable"
          size="sm"
          onClick={handleEnable}
          className="bg-indigo-600 hover:bg-indigo-500 text-white border-transparent"
        >
          Enable
        </Button>
        <Button
          id="notif-prompt-dismiss"
          size="sm"
          variant="ghost"
          onClick={handleDismiss}
          className="text-white/50 hover:text-white hover:bg-white/10"
        >
          Not Now
        </Button>
      </div>

      {/* Close button */}
      <button
        id="notif-prompt-close"
        type="button"
        aria-label="Close notification prompt"
        onClick={handleDismiss}
        className="absolute right-3 top-3 text-white/30 hover:text-white/70 transition-colors"
      >
        <X className="size-3.5" aria-hidden="true" />
      </button>

      {/* Feedback after granting/denying (only shown briefly before hidden state kicks in) */}
      {permissionResult === "granted" && (
        <span className="sr-only">Notifications enabled. Thank you!</span>
      )}
    </div>
  );
}
