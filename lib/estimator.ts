/**
 * Debt Freedom Estimator — realistic, transparent modeling.
 *
 * These are illustrative estimates for education only. Real programs vary by
 * creditor, balance, delinquency, state law, and a client's ability to fund a
 * dedicated account. Nothing here is a guarantee, an offer, or advice.
 */

export interface EstimatorInputs {
  /** Total enrolled unsecured debt (credit cards, personal loans, some medical). */
  totalDebt: number;
  /** What the person pays toward these debts today (minimums, roughly). */
  currentMonthlyPayment: number;
  /** Comfortable amount they could set aside monthly for a dedicated account. */
  monthlyBudget: number;
}

export interface EstimatorResult {
  /** Low/high settlement as a % of enrolled balance actually paid to creditors. */
  settlementLowPct: number;
  settlementHighPct: number;
  /** Dollar amount paid to creditors (before program fee), low/high. */
  settledLow: number;
  settledHigh: number;
  /** Performance-based program fee (a % of enrolled debt), low/high. */
  feeLow: number;
  feeHigh: number;
  /** All-in cost to become debt free (settlements + fee), low/high. */
  programCostLow: number;
  programCostHigh: number;
  /** Projected total savings vs. enrolled balance, low/high. */
  savingsLow: number;
  savingsHigh: number;
  /** Estimated program length in months, low/high. */
  monthsLow: number;
  monthsHigh: number;
  /** Suggested monthly program deposit (what we'd aim to fund the account with). */
  suggestedMonthly: number;
  /** Rough comparison: what minimum-only payoff might cost over time. */
  minimumOnlyTotal: number;
  minimumOnlyMonths: number;
  /** Whether the budget realistically supports a program in a sensible window. */
  budgetFit: "comfortable" | "workable" | "tight";
}

/* Assumptions — deliberately conservative and disclosed in the UI. */
const SETTLEMENT_LOW = 0.4; // 40% of balance paid to creditors (a strong outcome)
const SETTLEMENT_HIGH = 0.55; // 55% (a more conservative outcome)
const FEE_LOW = 0.18; // performance-based fee, low end of enrolled debt
const FEE_HIGH = 0.25; // performance-based fee, high end
const APR_ASSUMED = 0.24; // typical revolving APR for the minimum-only comparison
const MIN_PAYMENT_RATE = 0.02; // ~2% of balance as a typical minimum

export function estimate(inputs: EstimatorInputs): EstimatorResult {
  const totalDebt = Math.max(0, inputs.totalDebt || 0);
  const budget = Math.max(0, inputs.monthlyBudget || 0);

  const settledLow = totalDebt * SETTLEMENT_LOW;
  const settledHigh = totalDebt * SETTLEMENT_HIGH;
  const feeLow = totalDebt * FEE_LOW;
  const feeHigh = totalDebt * FEE_HIGH;

  const programCostLow = settledLow + feeLow;
  const programCostHigh = settledHigh + feeHigh;

  const savingsLow = Math.max(0, totalDebt - programCostHigh); // conservative savings
  const savingsHigh = Math.max(0, totalDebt - programCostLow); // optimistic savings

  // Suggested monthly deposit: fund the higher all-in cost over ~36 months,
  // but never suggest more than the person told us they can afford.
  const targetMonths = 36;
  const idealMonthly = programCostHigh / targetMonths;
  const suggestedMonthly = budget > 0 ? Math.min(budget, Math.max(idealMonthly, budget * 0.9)) : idealMonthly;

  // Program length driven by how fast the dedicated account can fund settlements.
  const fundingMonthly = budget > 0 ? budget : idealMonthly;
  const monthsLow = clampMonths(programCostLow / Math.max(fundingMonthly, 1));
  const monthsHigh = clampMonths(programCostHigh / Math.max(fundingMonthly, 1));

  // Minimum-only comparison (amortize at assumed APR with ~2% minimums).
  const minOnly = minimumOnlyPayoff(totalDebt);

  const ratio = budget > 0 && idealMonthly > 0 ? budget / idealMonthly : 0;
  const budgetFit: EstimatorResult["budgetFit"] =
    ratio >= 1.15 ? "comfortable" : ratio >= 0.85 ? "workable" : "tight";

  return {
    settlementLowPct: SETTLEMENT_LOW,
    settlementHighPct: SETTLEMENT_HIGH,
    settledLow,
    settledHigh,
    feeLow,
    feeHigh,
    programCostLow,
    programCostHigh,
    savingsLow,
    savingsHigh,
    monthsLow,
    monthsHigh,
    suggestedMonthly,
    minimumOnlyTotal: minOnly.totalPaid,
    minimumOnlyMonths: minOnly.months,
    budgetFit,
  };
}

function clampMonths(m: number): number {
  if (!Number.isFinite(m) || m <= 0) return 12;
  return Math.round(Math.min(Math.max(m, 12), 60));
}

/** Rough payoff simulation paying only ~2% minimums at a typical APR. */
function minimumOnlyPayoff(balance: number): { totalPaid: number; months: number } {
  if (balance <= 0) return { totalPaid: 0, months: 0 };
  const monthlyRate = APR_ASSUMED / 12;
  let bal = balance;
  let totalPaid = 0;
  let months = 0;
  const maxMonths = 480; // 40-year cap so the loop always terminates
  while (bal > 1 && months < maxMonths) {
    const interest = bal * monthlyRate;
    let payment = Math.max(bal * MIN_PAYMENT_RATE, 25);
    payment = Math.max(payment, interest + 1); // ensure the balance falls
    payment = Math.min(payment, bal + interest);
    bal = bal + interest - payment;
    totalPaid += payment;
    months += 1;
  }
  return { totalPaid: Math.round(totalPaid), months };
}
