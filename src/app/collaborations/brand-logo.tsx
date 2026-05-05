"use client";

import { useState } from "react";

interface BrandLogoProps {
  logoUrl?: string;
  brandName: string;
}

export function BrandLogo({ logoUrl, brandName }: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);
  
  // First two initials (e.g. Apple -> Ap, LinkedIn -> Li)
  const initials = brandName.substring(0, 2).toUpperCase();

  return (
    <div className="relative h-12 w-12 rounded-lg bg-white shadow-md flex items-center justify-center overflow-hidden">
      {/* Premium Fallback (absolute, low z-index) */}
      <div className="absolute inset-0 m-auto h-10 w-10 rounded-full bg-linear-to-br from-electric to-indigo-600 flex items-center justify-center z-0">
        <span className="text-sm font-bold text-white tracking-widest select-none">
          {initials}
        </span>
      </div>

      {/* Main Database Logo (hides on error or if missing) */}
      {!hasError && logoUrl && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={logoUrl}
          alt={`${brandName} logo`}
          className="absolute inset-0 h-full w-full object-contain p-1.5 bg-white z-10"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
