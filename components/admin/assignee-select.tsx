"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { assignApplication } from "@/lib/actions/admin";
import type { StaffMember } from "@/lib/auth/roles";

function label(m: StaffMember): string {
  return (m.full_name && m.full_name.trim()) || m.email || "Staff member";
}

export function AssigneeSelect({
  applicationId,
  assignedTo,
  staff,
}: {
  applicationId: string;
  assignedTo: string | null;
  staff: StaffMember[];
}) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onChange = async (value: string) => {
    setError(null);
    setPending(true);
    const result = await assignApplication({
      applicationId,
      assigneeId: value === "" ? null : value,
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
          value={assignedTo ?? ""}
          disabled={pending}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full appearance-none rounded-xl border border-input bg-card px-3 pr-9 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:opacity-60 sm:w-56"
          aria-label="Assign to"
        >
          <option value="">Unassigned</option>
          {staff.map((m) => (
            <option key={m.id} value={m.id}>
              {label(m)}
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
