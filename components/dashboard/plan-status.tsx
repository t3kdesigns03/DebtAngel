import { Check, Clock, FileText, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "submitted", label: "Submitted", icon: FileText },
  { key: "reviewing", label: "In review", icon: Clock },
  { key: "accepted", label: "Decision", icon: Check },
] as const;

const ORDER: Record<string, number> = {
  submitted: 0,
  reviewing: 1,
  accepted: 2,
};

export function PlanStatus({ status }: { status: string }) {
  if (status === "declined" || status === "withdrawn") {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-card px-4 py-3 text-sm">
        <XCircle className="h-4 w-4 text-muted-foreground" />
        <span className="capitalize text-muted-foreground">
          {status} — reach out if you&rsquo;d like to revisit your options.
        </span>
      </div>
    );
  }

  const activeIndex = ORDER[status] ?? 0;

  return (
    <ol className="flex items-center gap-2">
      {STEPS.map((step, i) => {
        const done = i < activeIndex || (status === "accepted" && i <= activeIndex);
        const current = i === activeIndex && status !== "accepted";
        const StepIcon = done ? Check : step.icon;
        return (
          <li key={step.key} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                done && "border-money/40 bg-money/15 text-money",
                current && "border-gold bg-gold/15 text-gold",
                !done && !current && "border-white/10 bg-card text-foreground/50",
              )}
            >
              <StepIcon className="h-4 w-4" />
            </span>
            <span
              className={cn(
                "text-xs font-semibold sm:text-sm",
                done && "text-money",
                current && "text-gold",
                !done && !current && "text-foreground/50",
              )}
            >
              {step.label}
            </span>
            {i < STEPS.length - 1 && (
              <span
                className={cn(
                  "hidden h-px flex-1 sm:block",
                  i < activeIndex ? "bg-money/40" : "bg-white/10",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
