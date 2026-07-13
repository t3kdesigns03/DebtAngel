import {
  incomeFrequencyOptions,
  incomeRangeOptions,
  type IncomeInput,
} from "@/lib/application-schema";

/**
 * Normalize any income input to a single monthly net figure.
 * Returns null when the user declined or gave nothing usable — callers then
 * fall back to the estimator heuristic in `lib/cash-flow.ts`.
 */
export function monthlyNetIncome(income?: IncomeInput | null): number | null {
  if (!income || income.precision === "declined") return null;

  const raw =
    income.precision === "range"
      ? incomeRangeOptions.find((r) => r.value === income.rangeId)?.mid ?? null
      : income.amount ?? null;

  if (raw == null || !Number.isFinite(raw) || raw <= 0) return null;

  const perMonth =
    incomeFrequencyOptions.find((f) => f.value === income.frequency)?.perMonth ??
    1;

  return Math.round(raw * perMonth);
}

/**
 * Map an income input to the `applications` table's income_* columns.
 * `income_monthly_net` is the server-normalized, authoritative value —
 * mirrors how plan_* numbers are recomputed server-side and never trusted
 * from the client.
 */
export function incomeColumns(income?: IncomeInput | null) {
  const monthly = monthlyNetIncome(income);
  return {
    income_precision: income?.precision ?? "declined",
    income_amount: income?.amount ?? null,
    income_range_id: income?.rangeId ?? null,
    income_frequency: income?.frequency ?? "monthly",
    income_type: income?.type ?? "net",
    income_includes_household: income?.includesHousehold ?? false,
    income_source: income?.source ?? "self_reported",
    income_monthly_net: monthly,
  };
}

/** Rebuild an IncomeInput from stored income_* columns (dashboard prefill). */
export function rowToIncome(row: {
  income_precision?: string | null;
  income_amount?: number | string | null;
  income_range_id?: string | null;
  income_frequency?: string | null;
  income_type?: string | null;
  income_includes_household?: boolean | null;
  income_source?: string | null;
}): IncomeInput {
  return {
    precision: (row.income_precision as IncomeInput["precision"]) ?? "declined",
    amount: row.income_amount != null ? Number(row.income_amount) : undefined,
    rangeId: (row.income_range_id as IncomeInput["rangeId"]) ?? undefined,
    frequency:
      (row.income_frequency as IncomeInput["frequency"]) ?? "monthly",
    type: (row.income_type as IncomeInput["type"]) ?? "net",
    includesHousehold: row.income_includes_household ?? false,
    source: (row.income_source as IncomeInput["source"]) ?? "self_reported",
  };
}
