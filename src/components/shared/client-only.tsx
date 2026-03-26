"use client";

import { useEffect, useState, ReactNode } from "react";

/**
 * ClientOnly — renders children exclusively on the client after mount.
 * Prevents hydration mismatches for components with browser-dependent
 * calculations (Math.cos/sin positions, window access, Framer Motion
 * infinite animations, etc.)
 *
 * Falls back to a stable placeholder with the same dimensions during SSR
 * so layout doesn't shift when animations kick in.
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // requestAnimationFrame moves the state update to the next browser frame.
    // This prevents the "cascading render" ESLint error and ensures 
    // the hydration happens safely after the first paint.
    const frameId = requestAnimationFrame(() => {
      setMounted(true);
    });
    
    // Cleanup to prevent memory leaks if the user leaves the page quickly
    return () => cancelAnimationFrame(frameId);
  }, []);

  if (!mounted) return <>{fallback}</>;
  return <>{children}</>;
}
