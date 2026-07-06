import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Whole-dollar currency, e.g. $1,240 (pass { cents: true } for $1,240.50). */
export function formatCurrency(value: number, opts?: { cents?: boolean }): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: opts?.cents ? 2 : 0,
    maximumFractionDigits: opts?.cents ? 2 : 0,
  }).format(Number.isFinite(value) ? value : 0);
}

/** Alias kept short for JSX call sites. */
export const currency = formatCurrency;

/** Compact currency, e.g. $12.4K / $1.2M */
export function currencyCompact(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number.isFinite(value) ? value : 0);
}

export function percent(value: number, digits = 0): string {
  return `${(Number.isFinite(value) ? value : 0).toFixed(digits)}%`;
}

/** Convert a number of whole months into "X yrs Y mo". */
export function monthsToLabel(months: number): string {
  const m = Math.max(0, Math.round(months));
  const years = Math.floor(m / 12);
  const rem = m % 12;
  if (years === 0) return `${rem} mo`;
  if (rem === 0) return `${years} yr${years > 1 ? "s" : ""}`;
  return `${years} yr${years > 1 ? "s" : ""} ${rem} mo`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
