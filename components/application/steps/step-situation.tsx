"use client";

import { CurrencyField, RadioCardField } from "@/components/application/fields";
import { employmentOptions } from "@/lib/application-schema";

export function StepSituation() {
  return (
    <div className="space-y-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <CurrencyField
          name="currentMonthlyPayment"
          label="Current monthly payments"
          placeholder="850"
          hint="Toward these debts today, roughly."
        />
        <CurrencyField
          name="monthlyBudget"
          label="Comfortable monthly budget"
          placeholder="550"
          hint="What you could set aside without stretching."
        />
      </div>
      <div>
        <p className="mb-3 text-sm font-medium text-navy">Your income situation</p>
        <RadioCardField name="employment" options={employmentOptions} />
      </div>
    </div>
  );
}
