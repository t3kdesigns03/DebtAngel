"use client";

import * as React from "react";
import { ArrowDown, Clock, TrendingDown, Wallet } from "lucide-react";
import type { Comparison } from "@/lib/estimator";
import { currency, monthsToLabel, percent } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * The conversion moment: current path vs. the Debt Angel plan in real dollars.
 * Mobile-first — columns stack, bars remain legible, big numbers scale down.
 */
export function ComparisonView({
  comparison,
  className,
}: {
  comparison: Comparison;
  className?: string;
}) {
  const { current, proposed, totalSavings, savingsPct, monthsSaved, monthlyRelief } =
    comparison;

  // Bar widths: proposed cost as a share of the (larger) current payoff.
  const maxTotal = Math.max(current.totalPayoff, proposed.totalCost, 1);
  const currentBar = (current.totalPayoff / maxTotal) * 100;
  const proposedBar = (proposed.totalCost / maxTotal) * 100;

  return (
    <div className={cn("w-full", className)}>
      {/* Headline savings */}
      <div className="rounded-3xl bg-ink-fade p-6 text-center shadow-lift sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Your projected savings
        </p>
        <p className="num-display mt-2 text-5xl font-bold text-gradient-money sm:text-6xl">
          {currency(totalSavings)}
        </p>
        <p className="mt-2 text-sm text-cloud/70">
          {percent(savingsPct)} less than your current path — with no bankruptcy,
          foreclosure, or repossession.
        </p>
      </div>

      {/* Highlight chips */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Highlight
          icon={<Wallet className="h-4 w-4" />}
          label="Monthly relief"
          value={`${currency(monthlyRelief)}/mo`}
        />
        <Highlight
          icon={<Clock className="h-4 w-4" />}
          label="Time saved"
          value={monthsToLabel(monthsSaved)}
        />
        <Highlight
          icon={<TrendingDown className="h-4 w-4" />}
          label="Total cost to zero"
          value={currency(proposed.totalCost)}
        />
      </div>

      {/* Side-by-side columns */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PlanColumn
          tone="current"
          title="Your current path"
          subtitle="Paying minimums"
          monthly={current.monthlyPayment}
          total={current.totalPayoff}
          totalLabel="Total you'd pay"
          months={current.months}
        />
        <PlanColumn
          tone="proposed"
          title="With Debt Angel"
          subtitle="Smarter · Faster · Cheaper"
          monthly={proposed.monthlyPayment}
          total={proposed.totalCost}
          totalLabel="All-in cost"
          months={proposed.months}
        />
      </div>

      {/* Visual bars */}
      <div className="mt-4 rounded-3xl border border-border bg-card p-5 sm:p-6">
        <p className="mb-4 text-sm font-medium text-muted-foreground">
          Total dollars, side by side
        </p>
        <Bar
          label="Current path"
          amount={current.totalPayoff}
          width={currentBar}
          tone="current"
        />
        <div className="my-3 flex items-center gap-2 pl-1 text-money-deep">
          <ArrowDown className="h-4 w-4" />
          <span className="text-sm font-semibold">
            You keep {currency(totalSavings)}
          </span>
        </div>
        <Bar
          label="Debt Angel plan"
          amount={proposed.totalCost}
          width={proposedBar}
          tone="proposed"
        />
      </div>
    </div>
  );
}

function Highlight({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold-muted">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-muted-foreground">{label}</span>
        <span className="num-display block truncate text-base font-semibold">
          {value}
        </span>
      </span>
    </div>
  );
}

function PlanColumn({
  tone,
  title,
  subtitle,
  monthly,
  total,
  totalLabel,
  months,
}: {
  tone: "current" | "proposed";
  title: string;
  subtitle: string;
  monthly: number;
  total: number;
  totalLabel: string;
  months: number;
}) {
  const proposed = tone === "proposed";
  return (
    <div
      className={cn(
        "rounded-3xl border p-5 sm:p-6",
        proposed
          ? "border-money/40 bg-money-soft/40 shadow-money"
          : "border-border bg-muted/60",
      )}
    >
      <div className="flex items-baseline justify-between gap-2">
        <h4 className="font-display text-lg font-semibold">{title}</h4>
      </div>
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-wide",
          proposed ? "text-money-deep" : "text-muted-foreground",
        )}
      >
        {subtitle}
      </p>

      <dl className="mt-4 space-y-3">
        <Row label="Monthly payment" value={`${currency(monthly)}/mo`} strong={proposed} />
        <Row label={totalLabel} value={currency(total)} strong={proposed} />
        <Row label="Time to zero" value={monthsToLabel(months)} strong={proposed} />
      </dl>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "num-display text-right text-lg font-semibold tabular",
          strong ? "text-money-deep" : "text-foreground",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function Bar({
  label,
  amount,
  width,
  tone,
}: {
  label: string;
  amount: number;
  width: number;
  tone: "current" | "proposed";
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="num-display text-sm font-semibold tabular">
          {currency(amount)}
        </span>
      </div>
      <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full origin-left rounded-full animate-grow-bar",
            tone === "proposed" ? "bg-money-sheen" : "bg-ink-700",
          )}
          style={{ width: `${Math.max(width, 6)}%` }}
        />
      </div>
    </div>
  );
}
