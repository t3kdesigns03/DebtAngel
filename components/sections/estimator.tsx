"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  TrendingDown,
  CalendarClock,
  PiggyBank,
  Wallet,
  Info,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { estimate, type EstimatorResult } from "@/lib/estimator";
import { formatCurrency, cn } from "@/lib/utils";
import { disclaimers } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Field {
  key: "totalDebt" | "currentMonthlyPayment" | "monthlyBudget";
  label: string;
  help: string;
  min: number;
  max: number;
  step: number;
  icon: React.ElementType;
}

const fields: Field[] = [
  {
    key: "totalDebt",
    label: "Total unsecured debt",
    help: "Credit cards, personal loans, some medical bills",
    min: 5000,
    max: 150000,
    step: 500,
    icon: Wallet,
  },
  {
    key: "currentMonthlyPayment",
    label: "Current monthly payments",
    help: "What you pay toward these debts now (roughly)",
    min: 100,
    max: 4000,
    step: 25,
    icon: TrendingDown,
  },
  {
    key: "monthlyBudget",
    label: "Comfortable monthly budget",
    help: "What you could set aside without stretching too thin",
    min: 100,
    max: 4000,
    step: 25,
    icon: PiggyBank,
  },
];

const fitCopy: Record<EstimatorResult["budgetFit"], { label: string; tone: string; note: string }> = {
  comfortable: {
    label: "Comfortable fit",
    tone: "text-teal-700 bg-teal-50",
    note: "Your budget comfortably supports a program in a healthy timeframe.",
  },
  workable: {
    label: "Workable fit",
    tone: "text-gold bg-gold-soft",
    note: "This is workable — small budget tweaks could shorten your timeline.",
  },
  tight: {
    label: "Tight — let's talk",
    tone: "text-amber-700 bg-amber-50",
    note: "This may be tight. An advisor can help find a realistic monthly number.",
  },
};

export function Estimator() {
  const [values, setValues] = React.useState({
    totalDebt: 32000,
    currentMonthlyPayment: 850,
    monthlyBudget: 550,
  });

  const result = React.useMemo(() => estimate(values), [values]);
  const fit = fitCopy[result.budgetFit];

  const outputs = [
    {
      icon: TrendingDown,
      label: "Estimated settlement range",
      value: `${formatCurrency(result.settledLow)} – ${formatCurrency(result.settledHigh)}`,
      sub: `≈ ${Math.round(result.settlementLowPct * 100)}–${Math.round(
        result.settlementHighPct * 100
      )}% of what you owe, paid to creditors`,
    },
    {
      icon: CalendarClock,
      label: "Estimated program length",
      value: `${result.monthsLow}–${result.monthsHigh} months`,
      sub: "Driven mostly by your monthly deposit",
    },
    {
      icon: Wallet,
      label: "New monthly commitment",
      value: formatCurrency(result.suggestedMonthly),
      sub: "One deposit into an account you control",
    },
    {
      icon: PiggyBank,
      label: "Projected total savings",
      value: `${formatCurrency(result.savingsLow)} – ${formatCurrency(result.savingsHigh)}`,
      sub: "Vs. your enrolled balance, after our fee",
    },
  ];

  return (
    <section id="estimator" className="scroll-mt-24 bg-secondary/40">
      <div className="container py-20 lg:py-28">
        <SectionHeading
          eyebrow="Debt Freedom Estimator"
          title="See what breathing room could look like"
          description="Move the sliders. Everything updates live. It's an honest estimate — not a sales pitch — built to help you think clearly."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Inputs */}
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <div className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500">
              <Calculator className="h-4 w-4 text-teal-600" />
              Your situation
            </div>
            <div className="space-y-8">
              {fields.map((f) => (
                <div key={f.key}>
                  <div className="flex items-baseline justify-between">
                    <label className="flex items-center gap-2 text-sm font-medium text-navy">
                      <f.icon className="h-4 w-4 text-teal-600" />
                      {f.label}
                    </label>
                    <span className="text-lg font-semibold tabular-nums text-navy">
                      {formatCurrency(values[f.key])}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{f.help}</p>
                  <Slider
                    className="mt-4"
                    value={[values[f.key]]}
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    onValueChange={([v]) =>
                      setValues((prev) => ({ ...prev, [f.key]: v }))
                    }
                    aria-label={f.label}
                  />
                  <div className="mt-1.5 flex justify-between text-[11px] text-slate-400">
                    <span>{formatCurrency(f.min)}</span>
                    <span>{formatCurrency(f.max)}+</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={cn("mt-6 flex items-start gap-2 rounded-xl px-4 py-3 text-sm", fit.tone)}>
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                <span className="font-semibold">{fit.label}.</span> {fit.note}
              </span>
            </div>
          </div>

          {/* Outputs */}
          <div className="rounded-3xl border border-border bg-navy p-7 text-white shadow-lift">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-teal-300">Your estimate</p>
              <Badge variant="gold">Live</Badge>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {outputs.map((o) => (
                <div key={o.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                    <o.icon className="h-4 w-4 text-teal-400" />
                    {o.label}
                  </div>
                  <AnimatePresence mode="popLayout">
                    <motion.p
                      key={o.value}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="mt-2 text-xl font-semibold tabular-nums"
                    >
                      {o.value}
                    </motion.p>
                  </AnimatePresence>
                  <p className="mt-1 text-[11px] leading-snug text-slate-400">{o.sub}</p>
                </div>
              ))}
            </div>

            {/* "What this could look like" preview */}
            <div className="mt-5 rounded-2xl bg-gradient-to-br from-teal-600/20 to-transparent p-5">
              <p className="text-sm font-medium text-white">What this could look like for you</p>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-200">
                Instead of paying{" "}
                <span className="font-semibold text-white">
                  {formatCurrency(result.minimumOnlyTotal)}
                </span>{" "}
                over {Math.round(result.minimumOnlyMonths / 12)}+ years making minimum
                payments, you&rsquo;d aim to be debt-free in about{" "}
                <span className="font-semibold text-teal-300">
                  {Math.round((result.monthsLow + result.monthsHigh) / 2)} months
                </span>{" "}
                — keeping an estimated{" "}
                <span className="font-semibold text-gold">
                  {formatCurrency(result.savingsLow)}+
                </span>{" "}
                in your pocket.
              </p>
            </div>

            <Button asChild size="lg" variant="gold" className="mt-5 w-full">
              <Link href="/apply">
                Get my exact plan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Honest notes */}
        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-border bg-white p-5">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
            <div className="text-xs leading-relaxed text-slate-500">
              <p className="mb-1 font-medium text-slate-600">A few honest notes:</p>
              <p>{disclaimers.estimator}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
