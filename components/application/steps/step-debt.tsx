"use client";

import { ChipMultiSelect, CurrencyField } from "@/components/application/fields";
import { debtTypeOptions } from "@/lib/application-schema";

export function StepDebt() {
  return (
    <div className="space-y-7">
      <div>
        <p className="mb-3 text-sm font-medium text-navy">
          What kinds of debt are weighing on you?
        </p>
        <ChipMultiSelect name="debtTypes" options={debtTypeOptions} />
        <p className="mt-3 text-xs text-slate-500">
          Pick all that apply. Secured debts like a mortgage or car loan don&rsquo;t
          usually qualify — we&rsquo;ll sort that out together.
        </p>
      </div>
      <CurrencyField
        name="totalDebt"
        label="Roughly how much do these add up to?"
        placeholder="32,000"
        hint="A ballpark is perfectly fine. We'll confirm exact figures later."
      />
    </div>
  );
}
