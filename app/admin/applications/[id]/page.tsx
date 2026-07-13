import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, StickyNote } from "lucide-react";
import { requireStaff } from "@/lib/auth/roles";
import { rowToTradeline } from "@/lib/plan";
import { StatusSelect } from "@/components/admin/status-select";
import { AssignButton } from "@/components/admin/assign-button";
import { NoteComposer } from "@/components/admin/note-composer";
import { TradelineView } from "@/components/shared/tradeline-view";
import { isApplicationStatus, type ApplicationStatus } from "@/lib/admin/status";
import { currency, monthsToLabel } from "@/lib/utils";

export const metadata: Metadata = { title: "Application" };

type PageProps = { params: Promise<{ id: string }> };

type NoteRow = {
  id: string;
  body: string;
  created_at: string;
  author_id: string | null;
};

export default async function AdminApplicationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { supabase, user } = await requireStaff(`/admin/applications/${id}`);

  const { data: app } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .single();

  if (!app) notFound();

  const [{ data: tradelineRows }, { data: noteRows }] = await Promise.all([
    supabase
      .from("application_tradelines")
      .select("*")
      .eq("application_id", id)
      .order("created_at", { ascending: true }),
    supabase
      .from("application_notes")
      .select("id, body, created_at, author_id")
      .eq("application_id", id)
      .order("created_at", { ascending: false }),
  ]);

  const tradelines = (tradelineRows ?? []).map(rowToTradeline);
  const notes = (noteRows ?? []) as NoteRow[];

  // Resolve note author names.
  const authorIds = [...new Set(notes.map((n) => n.author_id).filter(Boolean))];
  const authorNames = new Map<string, string>();
  if (authorIds.length > 0) {
    const { data: authors } = await supabase
      .from("profiles")
      .select("id, full_name")
      .in("id", authorIds as string[]);
    for (const a of authors ?? []) {
      if (a.full_name) authorNames.set(a.id, a.full_name);
    }
  }

  const status: ApplicationStatus = isApplicationStatus(app.status)
    ? app.status
    : "new";

  const income =
    app.income_monthly_net != null ? Number(app.income_monthly_net) : null;
  const expenses =
    app.essential_expenses_total != null
      ? Number(app.essential_expenses_total)
      : null;
  const residual = income != null && expenses != null ? income - expenses : null;
  const months = Math.round(
    (Number(app.plan_months_low) + Number(app.plan_months_high)) / 2,
  );
  const assignedToMe = app.assigned_to === user.id;
  const name = `${app.first_name ?? ""} ${app.last_name ?? ""}`.trim() || app.email;

  return (
    <div className="space-y-6">
      <Link
        href="/admin/applications"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All applications
      </Link>

      {/* Sticky header */}
      <div className="sticky top-16 z-20 -mx-4 border-y border-white/10 bg-background/90 px-4 py-4 backdrop-blur sm:rounded-2xl sm:border sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h1 className="truncate font-display text-2xl font-semibold tracking-tight">
              {name}
            </h1>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {app.email}
              {app.phone ? ` · ${app.phone}` : ""} · {app.zip}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span>Submitted {formatDate(app.created_at)}</span>
              {app.source && <span>Source: {app.source}</span>}
              {app.last_contacted_at && (
                <span>Last contacted {formatDate(app.last_contacted_at)}</span>
              )}
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <StatusSelect applicationId={app.id} status={status} />
            <AssignButton
              applicationId={app.id}
              assignedToMe={assignedToMe}
              userId={user.id}
            />
          </div>
        </div>
      </div>

      {/* Financial overview */}
      <section>
        <h2 className="mb-3 font-display text-lg font-semibold">
          Financial overview
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <FinancialStat
            label="Monthly income"
            value={income != null ? currency(income) : "—"}
          />
          <FinancialStat
            label="Essential expenses"
            value={expenses != null ? currency(expenses) : "—"}
          />
          <FinancialStat
            label="Monthly residual"
            value={residual != null ? currency(residual) : "—"}
            tone={residual == null ? "default" : residual >= 0 ? "money" : "gold"}
          />
          <FinancialStat
            label="Total debt"
            value={app.total_debt != null ? currency(Number(app.total_debt)) : "—"}
          />
          <FinancialStat
            label="Recommended deposit"
            value={
              app.plan_suggested_monthly != null
                ? `${currency(Number(app.plan_suggested_monthly))}/mo`
                : "—"
            }
            tone="gold"
          />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MiniStat
            label="Est. all-in cost"
            value={app.plan_cost_mid != null ? currency(Number(app.plan_cost_mid)) : "—"}
          />
          <MiniStat
            label="Est. difference vs. minimums"
            value={
              app.plan_savings_mid != null
                ? currency(Number(app.plan_savings_mid))
                : "—"
            }
          />
          <MiniStat label="Est. timeline" value={monthsToLabel(months)} />
          <MiniStat
            label="Comfortable budget"
            value={
              app.monthly_budget != null
                ? `${currency(Number(app.monthly_budget))}/mo`
                : "—"
            }
          />
        </div>
      </section>

      {/* Accounts */}
      <section>
        <h2 className="mb-3 font-display text-lg font-semibold">
          Accounts &amp; debts
        </h2>
        {tradelines.length > 0 ? (
          <TradelineView tradelines={tradelines} />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-card p-6 text-sm text-muted-foreground">
            No accounts on this application.
          </div>
        )}
      </section>

      {/* Internal notes */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <StickyNote className="h-4 w-4 text-gold" />
          <h2 className="font-display text-lg font-semibold">Internal notes</h2>
          <span className="text-xs text-muted-foreground">({notes.length})</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-4 sm:p-5">
          <NoteComposer applicationId={app.id} />

          {notes.length > 0 && (
            <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
              {notes.map((n) => (
                <li key={n.id} className="rounded-xl bg-white/[0.03] p-3.5">
                  <p className="whitespace-pre-wrap text-sm text-foreground/90">
                    {n.body}
                  </p>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    {n.author_id && authorNames.get(n.author_id)
                      ? authorNames.get(n.author_id)
                      : "Staff"}{" "}
                    · {formatDateTime(n.created_at)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

function FinancialStat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "money" | "gold";
}) {
  const toneClass =
    tone === "money" ? "text-money" : tone === "gold" ? "text-gold" : "text-foreground";
  return (
    <div className="rounded-2xl border border-white/10 bg-card p-4 shadow-soft">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className={`num-display mt-1 text-lg font-bold tabular ${toneClass}`}>
        {value}
      </p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="num-display mt-0.5 text-sm font-semibold tabular">{value}</p>
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
