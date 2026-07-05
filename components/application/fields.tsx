"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioCard } from "@/components/ui/radio-group";
import type { ApplicationData } from "@/lib/application-schema";

type Name = keyof ApplicationData;

function ErrorText({ name }: { name: Name }) {
  const {
    formState: { errors },
  } = useFormContext<ApplicationData>();
  const err = errors[name];
  if (!err) return null;
  return (
    <p className="mt-1.5 text-sm text-destructive" role="alert">
      {String(err.message)}
    </p>
  );
}

export function TextField({
  name,
  label,
  placeholder,
  type = "text",
  hint,
  inputMode,
  autoComplete,
}: {
  name: Name;
  label: string;
  placeholder?: string;
  type?: string;
  hint?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}) {
  const { register } = useFormContext<ApplicationData>();
  return (
    <div>
      <Label htmlFor={name} className="mb-1.5 block">
        {label}
      </Label>
      <Input
        id={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        {...register(name)}
      />
      {hint ? <p className="mt-1.5 text-xs text-slate-500">{hint}</p> : null}
      <ErrorText name={name} />
    </div>
  );
}

export function CurrencyField({
  name,
  label,
  placeholder,
  hint,
}: {
  name: Name;
  label: string;
  placeholder?: string;
  hint?: string;
}) {
  const { register } = useFormContext<ApplicationData>();
  return (
    <div>
      <Label htmlFor={name} className="mb-1.5 block">
        {label}
      </Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          $
        </span>
        <Input
          id={name}
          type="number"
          inputMode="numeric"
          min={0}
          step={100}
          placeholder={placeholder}
          className="pl-8"
          {...register(name, { valueAsNumber: true })}
        />
      </div>
      {hint ? <p className="mt-1.5 text-xs text-slate-500">{hint}</p> : null}
      <ErrorText name={name} />
    </div>
  );
}

export function RadioCardField({
  name,
  options,
}: {
  name: Name;
  options: readonly { value: string; label: string; description?: string }[];
}) {
  const { control } = useFormContext<ApplicationData>();
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup
            value={(field.value as string) ?? ""}
            onValueChange={field.onChange}
            className="sm:grid-cols-2"
          >
            {options.map((o) => (
              <RadioCard
                key={o.value}
                value={o.value}
                label={o.label}
                description={o.description}
              />
            ))}
          </RadioGroup>
        )}
      />
      <ErrorText name={name} />
    </div>
  );
}

export function ChipMultiSelect({
  name,
  options,
}: {
  name: Name;
  options: readonly { value: string; label: string }[];
}) {
  const { control } = useFormContext<ApplicationData>();
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const selected: string[] = Array.isArray(field.value) ? field.value : [];
          const toggle = (v: string) =>
            selected.includes(v)
              ? field.onChange(selected.filter((s) => s !== v))
              : field.onChange([...selected, v]);
          return (
            <div className="flex flex-wrap gap-2.5">
              {options.map((o) => {
                const active = selected.includes(o.value);
                return (
                  <button
                    type="button"
                    key={o.value}
                    onClick={() => toggle(o.value)}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all",
                      active
                        ? "border-accent bg-teal-50 text-teal-700 shadow-sm"
                        : "border-border bg-card text-slate-600 hover:border-accent/50"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
                        active ? "border-accent bg-accent" : "border-slate-300"
                      )}
                    >
                      {active ? <Check className="h-3 w-3 text-white" strokeWidth={3} /> : null}
                    </span>
                    {o.label}
                  </button>
                );
              })}
            </div>
          );
        }}
      />
      <ErrorText name={name} />
    </div>
  );
}
