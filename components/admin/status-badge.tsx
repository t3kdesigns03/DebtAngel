import { STATUS_META, isApplicationStatus } from "@/lib/admin/status";
import { cn } from "@/lib/utils";

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const meta = isApplicationStatus(status)
    ? STATUS_META[status]
    : { label: status, badge: "border-white/15 bg-white/[0.04] text-muted-foreground" };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        meta.badge,
        className,
      )}
    >
      {meta.label}
    </span>
  );
}
