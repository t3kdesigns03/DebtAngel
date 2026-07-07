import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { claimApplicationsByEmail } from "@/lib/actions/auth";

/** Only allow same-site relative redirect targets. */
function safeNext(next: string | null): string {
  if (next && next.startsWith("/") && !next.startsWith("//")) return next;
  return "/dashboard";
}

/**
 * Resolve the origin to redirect back to. Behind Netlify/proxies the request
 * origin can be unreliable, so prefer the configured public site URL.
 */
function resolveOrigin(requestOrigin: string): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return configured || requestOrigin;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const base = resolveOrigin(origin);
  const next = safeNext(searchParams.get("next"));

  // Token-hash flow (recommended for @supabase/ssr magic links).
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  // PKCE flow (kept for backward compatibility).
  const code = searchParams.get("code");

  const supabase = await createClient();

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      await claimApplicationsByEmail();
      return NextResponse.redirect(`${base}${next}`);
    }
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      await claimApplicationsByEmail();
      return NextResponse.redirect(`${base}${next}`);
    }
  }

  return NextResponse.redirect(`${base}/login?error=auth`);
}
