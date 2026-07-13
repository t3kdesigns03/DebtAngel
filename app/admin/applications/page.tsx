import type { Metadata } from "next";
import Link from "next/link";
import { requireStaff } from "@/lib/auth/roles";
import { StatusBadge } from "@/components/admin/status-badge";
import {
  APPLICATION_STATUSES,
  STATUS_META,
  isApplicationStatus,
} from "@/lib/admin/status";
import { currency } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Applications" };

type Row = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  total_debt: number | null;
  income_monthly_net: number | null;
  essential_expenses_total: number | null;
  plan_suggested_monthly: number | null;
  status: string;
  created_at: string;
  assigned_to: string | null;
};

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { supabase, user } = await requireStaff();
  const { status } = await searchParams;
  const activeStatus =
    status && isApplicationStatus(status) ? status : null;

  let query = supabase
    .from("applications")
    .select(
      "id, first_name, last_name, email, total_debt, income_monthly_net, essential_expenses_total, plan_suggested_monthly, status, created_at, assigned_to",
    )
    .order("created_at", { ascending: false });

  if (activeStatus) query = query.eq("status", activeStatus);

  const { data } = await query;
  const rows = (data ?? []) as Row[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Applications
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {rows.length} {activeStatus ? STATUS_META[activeStatus].label.toLowerCase() : ""}{" "}
          {rows.length === 1 ? "application" : "applications"}
        </p>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        <FilterChip href="/admin/applications" label="All" active={!activeStatus} />
        {APPLICATION_STATUSES.map((s) => (
          <FilterChip
            key={s}
            href={`/admin/applications?status=${s}`}
            label={STATUS_META[s].label}
            active={activeStatus === s}
          />
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-12 text-center">
          <p className="text-sm text-muted-foreground">
            {activeStatus
              ? `No applications in “${STATUS_META[activeStatus].label}”.`
              : "No applications yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-card">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Name / Email</th>
                <th className="px-4 py-3 font-medium">Total debt</th>
                <th className="px-4 py-3 font-medium">Residual</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Assigned</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const residual =
                  r.income_monthly_net != null &&
                  r.essential_expenses_total != null
                    ? r.income_monthly_net - r.essential_expenses_total
                    : null;
                return (
                  <tr
                    key={r.id}
                    className="group border-b border-white/5 last:border-b-0 transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/applications/${r.id}`}
                        className="block"
                      >
                        <span className="block font-medium group-hover:text-gold">
                          {fullName(r)}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {r.email}
                        </span>
                      </Link>
                    </td>
                    <td className="num-display px-4 py-3 tabular">
                      {r.total_debt != null ? currency(r.total_debt) : "—"}
                    </td>
                    <td className="num-display px-4 py-3 tabular">
                      {residual != null ? (
                        <span className={residual >= 0 ? "text-money" : "text-gold"}>
                          {currency(residual)}
                        </span>
                      ) : r.income_monthly_net != null ? (
                        <span className="text-muted-foreground">
                          {currency(r.income_monthly_net)} inc.
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(r.created_at)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {r.assigned_to == null
                        ? "—"
                        : r.assigned_to === user.id
                          ? "You"
                          : "Assigned"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-gold bg-gold/15 text-gold"
          : "border-white/10 bg-card text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );
}

function fullName(r: Row): string {
  const name = `${r.first_name ?? ""} ${r.last_name ?? ""}`.trim();
  return name || "Unknown";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
