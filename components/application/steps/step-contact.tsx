"use client";

import { TextField } from "@/components/application/fields";

export function StepContact() {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="firstName" label="First name" placeholder="Jordan" autoComplete="given-name" />
        <TextField name="lastName" label="Last name" placeholder="Rivera" autoComplete="family-name" />
      </div>
      <TextField
        name="email"
        label="Email"
        type="email"
        placeholder="you@email.com"
        autoComplete="email"
        inputMode="email"
        hint="We'll send your personalized plan here. No spam, ever."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          name="phone"
          label="Phone"
          type="tel"
          placeholder="(555) 123-4567"
          autoComplete="tel"
          inputMode="tel"
        />
        <TextField
          name="zip"
          label="ZIP code"
          placeholder="90210"
          inputMode="numeric"
          autoComplete="postal-code"
          hint="Programs vary by state."
        />
      </div>
    </div>
  );
}
