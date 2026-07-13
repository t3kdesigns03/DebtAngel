import { Check, Clock, FileText, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "submitted", label: "Submitted", icon: FileText },
  { key: "reviewing", label: "In review", icon: Clock },
  { key: "enrolled", label: "Enrolled", icon: Check },
] as const;

// Map the internal pipeline status onto the client-facing 3-step journey.
const ORDER: Record<string, number> = {
  new: 0,
  contacted: 1,
  qualified: 1,
  enrolled: 2,
  active: 2,
  completed: 2,
};

const CLOSED = new Set(["cancelled", "nurture"]);
const FINAL = new Set(["enrolled", "active", "completed"]);

export function PlanStatus({ status }: { status: string }) {
  if (CLOSED.has(status)) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-card px-4 py-3 text-sm">
        <XCircle className="h-4 w-4 text-muted-foreground" />
        <span className="capitalize text-muted-foreground">
          {status === "nurture"
            ? "On hold — reach out whenever you'd like to revisit your options."
            : "Closed — reach out if you'd like to revisit your options."}
        </span>
      </div>
    );
  }

  const activeIndex = ORDER[status] ?? 0;
  const isFinal = FINAL.has(status);

  return (
    <ol className="flex items-center gap-2">
      {STEPS.map((step, i) => {
        const done = i < activeIndex || (isFinal && i <= activeIndex);
        const current = i === activeIndex && !isFinal;
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
