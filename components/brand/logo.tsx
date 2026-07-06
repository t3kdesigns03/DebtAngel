import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Debt Angel brandmark — a gold winged dollar sign inside a halo ring, with a
 * faint money-green glow. Pure inline SVG so it stays crisp at any size and
 * needs no asset pipeline. (Raster logo variants also live in the repo root.)
 */
export function LogoMark({
  className,
  title = "Debt Angel",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={cn("h-9 w-9", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="da-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3E7BE" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#C9A227" />
        </linearGradient>
        <linearGradient id="da-gold-soft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EBD79A" />
          <stop offset="100%" stopColor="#C9A227" />
        </linearGradient>
      </defs>

      {/* Halo ring — money-green whisper behind, gold ring in front */}
      <circle cx="32" cy="31" r="22" fill="none" stroke="#0D8A5C" strokeWidth="3" opacity="0.28" />
      <circle cx="32" cy="31" r="21" fill="none" stroke="url(#da-gold)" strokeWidth="2.4" opacity="0.55" />

      {/* Left wing */}
      <path
        d="M31 40 C22 28 15 25 5 25 C12 28 13 31 11 35 C17 33 18 36 18 40 C23 37 27 38 31 43 Z"
        fill="url(#da-gold)"
      />
      {/* Right wing (mirror) */}
      <path
        d="M33 40 C42 28 49 25 59 25 C52 28 51 31 53 35 C47 33 46 36 46 40 C41 37 37 38 33 43 Z"
        fill="url(#da-gold)"
      />

      {/* Dollar sign */}
      <text
        x="32"
        y="34"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="26"
        fill="url(#da-gold-soft)"
      >
        $
      </text>
    </svg>
  );
}

export function Wordmark({
  className,
  markClassName,
  compact = false,
}: {
  className?: string;
  markClassName?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      {!compact && (
        <span className="font-display text-lg font-semibold tracking-tight">
          <span className="text-gradient-gold">Debt</span>
          <span className="text-foreground">Angel</span>
        </span>
      )}
    </span>
  );
}
