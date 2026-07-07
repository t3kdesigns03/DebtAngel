/**
 * Build the email redirect URL for magic-link auth flows.
 *
 * In the browser we use window.location.origin so the magic link always points
 * back to the exact domain the user requested it from (mydebtangel.com,
 * debtangel.t3kdesigns.app, or localhost during dev). Server-side we fall back
 * to the configured site URL, then the primary production domain.
 */
export function getEmailRedirectUrl(nextPath = "/dashboard"): string {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
        "https://mydebtangel.com");

  const next = encodeURIComponent(nextPath);
  return `${origin}/auth/callback?next=${next}`;
}

/** Returns true when the user is signed in but still anonymous. */
export function isAnonymousUser(user: { is_anonymous?: boolean } | null): boolean {
  return Boolean(user?.is_anonymous);
}

/** Returns true when the user has a verified, non-anonymous session. */
export function isVerifiedUser(user: { is_anonymous?: boolean; email?: string } | null): boolean {
  return Boolean(user && user.email && !user.is_anonymous);
}
