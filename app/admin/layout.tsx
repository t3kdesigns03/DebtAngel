import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { requireStaff } from "@/lib/auth/roles";
import { AdminNav } from "@/components/admin/admin-nav";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Wordmark } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Debt Angel Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Gate: staff only. Unauthenticated → login, clients → dashboard.
  const { user, role } = await requireStaff();

  return (
    <div className="min-h-screen bg-background bg-grid">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" aria-label="Debt Angel Admin">
              <Wordmark size="sm" withMark />
            </Link>
            <span className="hidden items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gold sm:inline-flex">
              <ShieldCheck className="h-3 w-3" /> {role}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <AdminNav />
            <div className="hidden items-center gap-3 border-l border-white/10 pl-3 md:flex">
              <span className="max-w-[180px] truncate text-xs text-muted-foreground">
                {user.email}
              </span>
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">{children}</main>
    </div>
  );
}
