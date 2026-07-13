"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { updateApplicationStatus } from "@/lib/actions/admin";
import {
  APPLICATION_STATUSES,
  STATUS_META,
  type ApplicationStatus,
} from "@/lib/admin/status";

export function StatusSelect({
  applicationId,
  status,
}: {
  applicationId: string;
  status: ApplicationStatus;
}) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onChange = async (next: ApplicationStatus) => {
    setError(null);
    setPending(true);
    const result = await updateApplicationStatus({
      applicationId,
      status: next,
    });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <select
          value={status}
          disabled={pending}
          onChange={(e) => onChange(e.target.value as ApplicationStatus)}
          className="h-10 w-full appearance-none rounded-xl border border-input bg-card px-3 pr-9 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:opacity-60 sm:w-56"
          aria-label="Application status"
        >
          {APPLICATION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_META[s].label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "▾"}
        </span>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
