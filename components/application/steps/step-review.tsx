"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { estimate } from "@/lib/estimator";
import { formatCurrency } from "@/lib/utils";
import {
  debtTypeOptions,
  goalOptions,
  employmentOptions,
  type ApplicationData,
} from "@/lib/application-schema";

function labelFor(
  opts: readonly { value: string; label: string }[],
  value?: string
) {
  return opts.find((o) => o.value === value)?.label ?? "—";
}

export function StepReview() {
  const { control, register, formState } = useFormContext<ApplicationData>();
  const d = useWatch({ control }) as Partial<ApplicationData>;

  const est = estimate({
    totalDebt: Number(d.totalDebt || 0),
    currentMonthlyPayment: Number(d.currentMonthlyPayment || 0),
    monthlyBudget: Number(d.monthlyBudget || 0),
  });

  const debtLabels =
    (d.debtTypes || [])
      .map((v) => debtTypeOptions.find((o) => o.value === v)?.label)
      .filter(Boolean)
      .join(", ") || "—";

  const rows: [string, string][] = [
    ["Name", `${d.firstName ?? ""} ${d.lastName ?? ""}`.trim() || "—"],
    ["Email", d.email || "—"],
    ["Phone", d.phone || "—"],
    ["ZIP", d.zip || "—"],
    ["Debt types", debtLabels],
    ["Total debt", d.totalDebt ? formatCurrency(Number(d.totalDebt)) : "—"],
    ["Current payments", d.currentMonthlyPayment ? formatCurrency(Number(d.currentMonthlyPayment)) : "—"],
    ["Monthly budget", d.monthlyBudget ? formatCurrency(Number(d.monthlyBudget)) : "—"],
    ["Income", labelFor(employmentOptions, d.employment)],
    ["Main goal", labelFor(goalOptions, d.goal)],
  ];

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-border">
        <dl className="divide-y divide-border">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[1fr_1.4fr] gap-4 px-5 py-3 text-sm">
              <dt className="text-slate-500">{k}</dt>
              <dd className="font-medium text-navy">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {Number(d.totalDebt) > 0 ? (
        <div className="rounded-2xl bg-navy p-5 text-white">
          <p className="text-sm font-medium text-teal-300">Your preliminary estimate</p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-slate-400">Est. new monthly</p>
              <p className="text-lg font-semibold">{formatCurrency(est.suggestedMonthly)}</p>
            </div>
            <div>
              <p className="text-slate-400">Est. length</p>
              <p className="text-lg font-semibold">
                {est.monthsLow}–{est.monthsHigh} mo
              </p>
            </div>
            <div>
              <p className="text-slate-400">Est. savings</p>
              <p className="text-lg font-semibold text-gold">
                {formatCurrency(est.savingsLow)}+
              </p>
            </div>
            <div>
              <p className="text-slate-400">Settlement range</p>
              <p className="text-lg font-semibold">
                {formatCurrency(est.settledLow)}–{formatCurrency(est.settledHigh)}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Preliminary and illustrative only — your advisor confirms real numbers.
          </p>
        </div>
      ) : null}

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-secondary/50 p-4 text-sm">
        <input
          type="checkbox"
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-accent accent-teal-600"
          {...register("consent")}
        />
        <span className="text-slate-600">
          I&rsquo;d like a dedicated JCS advisor to review my situation and reach out.
          I understand this is a no-obligation consultation and that any estimates are
          not a guarantee of results.
        </span>
      </label>
      {formState.errors.consent ? (
        <p className="text-sm text-destructive" role="alert">
          {String(formState.errors.consent.message)}
        </p>
      ) : null}
    </div>
  );
}
