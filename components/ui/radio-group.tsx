"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root className={cn("grid gap-3", className)} {...props} ref={ref} />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/** Card-style radio option — the whole card is the control. */
const RadioCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label: string;
    description?: string;
  }
>(({ className, label, description, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "group relative flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=checked]:border-gold data-[state=checked]:bg-gold-soft/50 data-[state=checked]:shadow-soft",
      className
    )}
    {...props}
  >
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-muted-foreground/40 transition-colors group-data-[state=checked]:border-accent group-data-[state=checked]:bg-accent">
      <RadioGroupPrimitive.Indicator>
        <Check className="h-3 w-3 text-white" strokeWidth={3} />
      </RadioGroupPrimitive.Indicator>
    </span>
    <span className="flex flex-col">
      <span className="font-medium text-foreground">{label}</span>
      {description ? (
        <span className="text-sm text-muted-foreground">{description}</span>
      ) : null}
    </span>
  </RadioGroupPrimitive.Item>
));
RadioCard.displayName = "RadioCard";

export { RadioGroup, RadioCard };
