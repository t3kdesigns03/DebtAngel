"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";
import { RadioCardField } from "@/components/application/fields";
import {
  creditPriorityOptions,
  timelineOptions,
  assessFit,
  type ApplicationData,
} from "@/lib/application-schema";
import { cn } from "@/lib/utils";

export function StepQualify() {
  const { control } = useFormContext<ApplicationData>();
  const data = useWatch({ control }) as Partial<ApplicationData>;
  const fit = assessFit(data);
  const show = Boolean(data.creditPriority && data.timeline);

  return (
    <div className="space-y-7">
      <div>
        <p className="mb-3 text-sm font-medium text-navy">
          How important is protecting your credit score right now?
        </p>
        <RadioCardField name="creditPriority" options={creditPriorityOptions} />
      </div>
      <div>
        <p className="mb-3 text-sm font-medium text-navy">
          When are you hoping to get started?
        </p>
        <RadioCardField name="timeline" options={timelineOptions} />
      </div>

      <AnimatePresence>
        {show ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "flex items-start gap-3 rounded-2xl border p-5",
              fit.tone === "good"
                ? "border-teal-200 bg-teal-50"
                : "border-amber-200 bg-amber-50"
            )}
          >
            {fit.tone === "good" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
            ) : (
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            )}
            <div>
              <p
                className={cn(
                  "text-sm font-semibold",
                  fit.tone === "good" ? "text-teal-800" : "text-amber-800"
                )}
              >
                {fit.headline}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{fit.body}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
