"use client";

import { useFormContext } from "react-hook-form";
import { RadioCardField } from "@/components/application/fields";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { goalOptions, type ApplicationData } from "@/lib/application-schema";

export function StepGoals() {
  const { register } = useFormContext<ApplicationData>();
  return (
    <div className="space-y-7">
      <div>
        <p className="mb-3 text-sm font-medium text-navy">
          What would make the biggest difference for you?
        </p>
        <RadioCardField name="goal" options={goalOptions} />
      </div>
      <div>
        <Label htmlFor="breathingRoom" className="mb-1.5 block">
          In your words, what would breathing room feel like? <span className="text-slate-400">(optional)</span>
        </Label>
        <Textarea
          id="breathingRoom"
          placeholder="Sleeping through the night without doing math… answering the phone again… finally saving for my kids…"
          {...register("breathingRoom")}
        />
        <p className="mt-1.5 text-xs text-slate-500">
          This helps your advisor understand what actually matters to you.
        </p>
      </div>
    </div>
  );
}
