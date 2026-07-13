import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  Clock,
  StickyNote,
} from "lucide-react";
import { requireStaff, getStaffMembers, staffLabel } from "@/lib/auth/roles";
import { rowToTradeline } from "@/lib/plan";
import { StatusSelect } from "@/components/admin/status-select";
import { AssigneeSelect } from "@/components/admin/assignee-select";
import { NoteComposer } from "@/components/admin/note-composer";
import { StatusBadge } from "@/components/admin/status-badge";
import { StatusStepper } from "@/components/admin/status-stepper";
import { TradelineView } from "@/components/shared/tradeline-view";
import {
  isApplicationStatus,
  OPEN_LEAD_STATUSES,
  type ApplicationStatus,
} from "@/lib/admin/status";
import { currency, monthsToLabel, cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Application" };

type PageProps = { params: Promise<{ id: string }> };

type NoteRow = {
  id: string;
  body: string;
  created_at: string;
  author_id: string | null;
};

const DAY_MS = 86_400_000;
const STALE_DAYS = 2;

export default async function AdminApplicationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { supabase, user } = await requireStaff(`/admin/applications/${id}`);

  const { data: app } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .single();

  if (!app) notFound();

  const [{ data: tradelineRows }, { data: noteRows }, staff] = await Promise.all([
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
    getStaffMembers(),
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
  const assignee = app.assigned_to
    ? staff.find((s) => s.id === app.assigned_to) ?? null
    : null;
  const assigneeName = assignee ? staffLabel(assignee) : null;
  const name =
    `${app.first_name ?? ""} ${app.last_name ?? ""}`.trim() || app.email;

  // Needs attention: an open lead that hasn't been touched recently.
  const lastTouch = app.last_contacted_at ?? app.created_at;
  const daysSinceTouch = Math.floor(
    (Date.now() - new Date(lastTouch).getTime()) / DAY_MS,
  );
  const needsAttention =
    OPEN_LEAD_STATUSES.includes(status as never) && daysSinceTouch >= STALE_DAYS;

  const telHref = app.phone
    ? `tel:${String(app.phone).replace(/[^0-9+]/g, "")}`
    : null;

  return (
    <div className="space-y-5">
      <Link
        href="/admin/applications"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All applications
      </Link>

      {/* ── Ticket header ──────────────────────────────────────────────── */}
      <header className="rounded-2xl border border-white/10 bg-card p-5 shadow-soft sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {name}
              </h1>
              <StatusBadge status={status} />
              {needsAttention && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5" /> Needs attention
                </span>
              )}
            </div>

            {/* Contact row — the operational essentials */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <a
                href={`mailto:${app.email}`}
                className="inline-flex items-center gap-1.5 font-medium text-foreground/90 hover:text-gold"
              >
                <Mail className="h-4 w-4 text-muted-foreground" />
                {app.email}
              </a>
              {telHref && (
                <a
                  href={telHref}
                  className="inline-flex items-center gap-1.5 font-medium text-foreground/90 hover:text-gold"
                >
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {app.phone}
                </a>
              )}
              {app.zip && (
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {app.zip}
                </span>
              )}
            </div>

            {/* Meta line */}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span>Submitted {formatDate(app.created_at)}</span>
              <span aria-hidden>·</span>
              <span>Updated {formatDate(app.updated_at)}</span>
              {app.source && (
                <>
                  <span aria-hidden>·</span>
                  <span>Source: {app.source}</span>
                </>
              )}
              <span aria-hidden>·</span>
              <span>
                {assignedToMe
                  ? "Assigned to you"
                  : assigneeName
                    ? `Assigned to ${assigneeName}`
                    : app.assigned_to
                      ? "Assigned"
                      : "Unassigned"}
              </span>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex shrink-0 flex-wrap items-center gap-2 lg:flex-col lg:items-end">
            <StatusSelect applicationId={app.id} status={status} />
            <AssigneeSelect
              applicationId={app.id}
              assignedTo={app.assigned_to ?? null}
              staff={staff}
            />
          </div>
        </div>

        {/* Stage stepper */}
        <div className="mt-5 border-t border-white/10 pt-4">
          <div className="mb-2.5 flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Stage
            </span>
            {app.last_contacted_at && (
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3" /> Last contacted{" "}
                {formatDate(app.last_contacted_at)}
              </span>
            )}
          </div>
          <StatusStepper status={status} />
        </div>
      </header>

      {/* ── Financial snapshot ─────────────────────────────────────────── */}
      <section>
        <h2 className="mb-3 font-display text-lg font-semibold">
          Financial snapshot
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
            value={
              app.plan_cost_mid != null ? currency(Number(app.plan_cost_mid)) : "—"
            }
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

      {/* ── Accounts ───────────────────────────────────────────────────── */}
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

      {/* ── Internal notes ─────────────────────────────────────────────── */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <StickyNote className="h-4 w-4 text-gold" />
          <h2 className="font-display text-lg font-semibold">Internal notes</h2>
          <span className="text-xs text-muted-foreground">({notes.length})</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-4 sm:p-5">
          <NoteComposer applicationId={app.id} />

          {notes.length > 0 ? (
            <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
              {notes.map((n) => (
                <li key={n.id} className="rounded-xl bg-white/[0.03] p-3.5">
                  <p className="whitespace-pre-wrap text-sm text-foreground/90">
                    {n.body}
                  </p>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    <span className="font-medium text-foreground/70">
                      {n.author_id && authorNames.get(n.author_id)
                        ? authorNames.get(n.author_id)
                        : "Staff"}
                    </span>{" "}
                    · {formatDateTime(n.created_at)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 border-t border-white/10 pt-4 text-xs text-muted-foreground">
              No notes yet. Add the first one to start the record.
            </p>
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
    tone === "money"
      ? "text-money"
      : tone === "gold"
        ? "text-gold"
        : "text-foreground";
  return (
    <div className="rounded-2xl border border-white/10 bg-card p-4 shadow-soft">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className={cn("num-display mt-1 text-lg font-bold tabular", toneClass)}>
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
