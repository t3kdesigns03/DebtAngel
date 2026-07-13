import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Inbox, UserCheck, Sparkles } from "lucide-react";
import { requireStaff } from "@/lib/auth/roles";
import { StatusBadge } from "@/components/admin/status-badge";
import {
  ACTIVE_CLIENT_STATUSES,
  OPEN_LEAD_STATUSES,
} from "@/lib/admin/status";
import { currency } from "@/lib/utils";

export const metadata: Metadata = { title: "Overview" };

type Row = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  total_debt: number | null;
  status: string;
  created_at: string;
  assigned_to: string | null;
};

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export default async function AdminOverviewPage() {
  const { supabase } = await requireStaff();

  const { data } = await supabase
    .from("applications")
    .select("id, first_name, last_name, email, total_debt, status, created_at, assigned_to")
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as Row[];
  const weekAgo = Date.now() - WEEK_MS;

  const newThisWeek = rows.filter(
    (r) => new Date(r.created_at).getTime() >= weekAgo,
  ).length;
  const openLeads = rows.filter((r) =>
    OPEN_LEAD_STATUSES.includes(r.status as never),
  );
  const activeClients = rows.filter((r) =>
    ACTIVE_CLIENT_STATUSES.includes(r.status as never),
  ).length;

  // Needs attention: open leads, oldest first (longest waiting).
  const needsAttention = [...openLeads]
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    )
    .slice(0, 8);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A quick pulse on your pipeline.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          icon={<Sparkles className="h-4 w-4" />}
          label="New this week"
          value={newThisWeek}
          tone="gold"
        />
        <MetricCard
          icon={<Inbox className="h-4 w-4" />}
          label="Open leads (new + contacted)"
          value={openLeads.length}
          tone="default"
        />
        <MetricCard
          icon={<UserCheck className="h-4 w-4" />}
          label="Active clients"
          value={activeClients}
          tone="money"
        />
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Needs attention</h2>
          <Link
            href="/admin/applications?status=new"
            className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:underline"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {needsAttention.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-card p-8 text-center text-sm text-muted-foreground">
            You&rsquo;re all caught up — no open leads waiting.
          </div>
        ) : (
          <ul className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-card">
            {needsAttention.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/admin/applications/${r.id}`}
                  className="flex items-center justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-white/[0.03]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {fullName(r)}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {r.email} · {waitingLabel(r.created_at)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="num-display hidden text-sm tabular text-muted-foreground sm:block">
                      {r.total_debt != null ? currency(r.total_debt) : "—"}
                    </span>
                    <StatusBadge status={r.status} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone: "gold" | "money" | "default";
}) {
  const toneClass =
    tone === "gold"
      ? "text-gold"
      : tone === "money"
        ? "text-money"
        : "text-foreground";
  return (
    <div className="rounded-2xl border border-white/10 bg-card p-5 shadow-soft">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className={toneClass}>{icon}</span>
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className={`num-display mt-2 text-3xl font-bold tabular ${toneClass}`}>
        {value}
      </p>
    </div>
  );
}

function fullName(r: Row): string {
  const name = `${r.first_name ?? ""} ${r.last_name ?? ""}`.trim();
  return name || r.email || "Unknown";
}

function waitingLabel(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "added today";
  if (days === 1) return "waiting 1 day";
  return `waiting ${days} days`;
}
