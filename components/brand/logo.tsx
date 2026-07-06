import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Debt Angel wordmark — bold gold-gradient serif "DebtAngel".
 * Clean and premium; scales crisply and never distorts.
 *
 * To use the winged-$ emblem in the header instead, drop a transparent,
 * horizontal PNG lockup at /public/images/logo/logo.png and swap this for an
 * <img>. A raster emblem needs a transparent background — the poster-style
 * renders in the repo have baked-in backgrounds and don't sit cleanly in a bar.
 */
const SIZES = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl sm:text-3xl",
} as const;

export function Wordmark({
  className,
  size = "md",
}: {
  className?: string;
  size?: keyof typeof SIZES;
}) {
  return (
    <span
      className={cn(
        "font-display font-bold tracking-tight leading-none",
        SIZES[size],
        className,
      )}
    >
      <span className="text-gradient-gold">Debt</span>
      <span className="text-foreground">Angel</span>
    </span>
  );
}
