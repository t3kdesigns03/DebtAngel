import { Check, PauseCircle, XCircle } from "lucide-react";
import { STATUS_META, type ApplicationStatus } from "@/lib/admin/status";
import { cn } from "@/lib/utils";

/** The forward-moving sales/servicing pipeline (off-pipeline: cancelled, nurture). */
const PIPELINE: ApplicationStatus[] = [
  "new",
  "contacted",
  "qualified",
  "enrolled",
  "active",
  "completed",
];

export function StatusStepper({ status }: { status: ApplicationStatus }) {
  const activeIndex = PIPELINE.indexOf(status);

  // Off-pipeline states get a calm, explicit banner instead of a stepper.
  if (activeIndex === -1) {
    const nurture = status === "nurture";
    return (
      <div
        className={cn(
          "flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm",
          nurture
            ? "border-amber-400/30 bg-amber-400/10 text-amber-200"
            : "border-white/10 bg-white/[0.03] text-muted-foreground",
        )}
      >
        {nurture ? (
          <PauseCircle className="h-4 w-4 shrink-0" />
        ) : (
          <XCircle className="h-4 w-4 shrink-0" />
        )}
        <span>
          {nurture
            ? "On hold — nurture and follow up when the timing is better."
            : "This lead is cancelled and no longer moving through the pipeline."}
        </span>
      </div>
    );
  }

  return (
    <ol className="flex items-center gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {PIPELINE.map((s, i) => {
        const done = i < activeIndex;
        const current = i === activeIndex;
        return (
          <li key={s} className="flex shrink-0 items-center gap-2">
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                done && "border-money/40 bg-money/15 text-money",
                current && "border-gold bg-gold/20 text-gold",
                !done && !current && "border-white/10 bg-card text-foreground/40",
              )}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span
              className={cn(
                "whitespace-nowrap text-xs font-medium",
                done && "text-money",
                current && "text-gold",
                !done && !current && "text-foreground/40",
              )}
            >
              {STATUS_META[s].label}
            </span>
            {i < PIPELINE.length - 1 && (
              <span
                className={cn(
                  "mx-1 h-px w-6 shrink-0 sm:w-10",
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
