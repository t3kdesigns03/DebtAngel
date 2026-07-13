"use client";

import * as React from "react";
import { Info, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  incomeFrequencyOptions,
  incomeRangeOptions,
  type IncomeInput,
} from "@/lib/application-schema";
import { monthlyNetIncome } from "@/lib/income";
import { cn, currency } from "@/lib/utils";

type IncomeCaptureProps = {
  value: IncomeInput;
  onChange: (next: IncomeInput) => void;
  error?: string;
  className?: string;
};

/**
 * Reusable, controlled income input. Used in the apply wizard (via RHF
 * Controller) and the dashboard edit card. Optional by design: exact amount,
 * a range, or skip — never blocks progression.
 */
export function IncomeCapture({
  value,
  onChange,
  error,
  className,
}: IncomeCaptureProps) {
  const [showFrequency, setShowFrequency] = React.useState(
    value.frequency !== "monthly",
  );

  const set = (patch: Partial<IncomeInput>) => onChange({ ...value, ...patch });

  const label = value.includesHousehold
    ? "Household take-home income"
    : "Monthly take-home income";

  const normalized = monthlyNetIncome(value);
  const showConversion =
    value.precision === "exact" &&
    value.frequency !== "monthly" &&
    normalized != null;

  if (value.precision === "declined") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-white/10 bg-muted/40 px-4 py-3.5",
          className,
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Income skipped — we&rsquo;ll use a careful estimate. Adding it sharpens
            your plan.
          </p>
          <button
            type="button"
            onClick={() => set({ precision: "exact" })}
            className="shrink-0 text-sm font-semibold text-gold hover:underline"
          >
            Add income
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-gold/30 bg-gold/[0.06] p-4 sm:p-5",
        className,
      )}
    >
      <p className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground/75">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
        A rough number is all we need. We use it to size a plan you can afford —
        not to qualify or reject you. You can update it anytime.
      </p>

      <div className="mt-4">
        <Label htmlFor="income-amount">{label}</Label>
        <div className="mt-1.5">
          {value.precision === "range" ? (
            <select
              id="income-amount"
              value={value.rangeId ?? ""}
              onChange={(e) =>
                set({ rangeId: e.target.value as IncomeInput["rangeId"] })
              }
              className="flex h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              <option value="" disabled>
                Choose a range
              </option>
              {incomeRangeOptions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          ) : (
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                $
              </span>
              <Input
                id="income-amount"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="3,800"
                className="pl-7"
                value={value.amount != null ? String(value.amount) : ""}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9.]/g, "");
                  set({ amount: raw === "" ? undefined : Number(raw) });
                }}
              />
            </div>
          )}
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          {value.precision === "range"
            ? "A range is perfectly fine for an accurate estimate."
            : "What actually lands in your account each month, after taxes."}
        </p>
        {showConversion && (
          <p className="mt-1 text-[11px] text-gold">
            We&rsquo;ll convert that to about {currency(normalized!)}/mo.
          </p>
        )}
      </div>

      {/* Frequency (progressive, exact only) */}
      {value.precision === "exact" && showFrequency && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {incomeFrequencyOptions.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => set({ frequency: f.value })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                value.frequency === f.value
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-white/10 bg-card text-foreground/60 hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Action links */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px]">
        {value.precision === "exact" && !showFrequency && (
          <button
            type="button"
            onClick={() => setShowFrequency(true)}
            className="font-medium text-gold hover:underline"
          >
            Paid differently?
          </button>
        )}
        {value.precision === "exact" ? (
          <button
            type="button"
            onClick={() =>
              set({ precision: "range", amount: undefined, frequency: "monthly" })
            }
            className="font-medium text-gold hover:underline"
          >
            Prefer a range?
          </button>
        ) : (
          <button
            type="button"
            onClick={() => set({ precision: "exact", rangeId: undefined })}
            className="font-medium text-gold hover:underline"
          >
            Enter an exact amount
          </button>
        )}
        <button
          type="button"
          onClick={() => set({ precision: "declined" })}
          className="font-medium text-muted-foreground hover:text-foreground"
        >
          Skip for now
        </button>
      </div>

      {/* Household toggle */}
      <label className="mt-3 flex cursor-pointer items-center gap-2.5 text-[13px] text-foreground/70">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-input accent-[#D4AF37]"
          checked={value.includesHousehold}
          onChange={(e) => set({ includesHousehold: e.target.checked })}
        />
        <Users className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
        Include a co-applicant&rsquo;s income
      </label>

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
