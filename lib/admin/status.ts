/**
 * Single source of truth for the application pipeline status.
 * Must stay in sync with the DB check constraint in 008_applications_admin.sql.
 */

export const APPLICATION_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "enrolled",
  "active",
  "completed",
  "cancelled",
  "nurture",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export function isApplicationStatus(value: string): value is ApplicationStatus {
  return (APPLICATION_STATUSES as readonly string[]).includes(value);
}

type StatusMeta = {
  label: string;
  /** Tailwind classes for a subtle tinted pill on the dark theme. */
  badge: string;
  /** Short helper shown in the status dropdown. */
  hint: string;
};

export const STATUS_META: Record<ApplicationStatus, StatusMeta> = {
  new: {
    label: "New",
    badge: "border-gold/30 bg-gold/10 text-gold",
    hint: "Fresh lead — not yet contacted",
  },
  contacted: {
    label: "Contacted",
    badge: "border-sky-400/30 bg-sky-400/10 text-sky-300",
    hint: "Outreach made, awaiting response",
  },
  qualified: {
    label: "Qualified",
    badge: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    hint: "Good fit — moving toward enrollment",
  },
  enrolled: {
    label: "Enrolled",
    badge: "border-money/30 bg-money/10 text-money",
    hint: "Signed up for the program",
  },
  active: {
    label: "Active",
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    hint: "Actively funding their plan",
  },
  completed: {
    label: "Completed",
    badge: "border-teal-400/30 bg-teal-400/10 text-teal-300",
    hint: "Reached Debt Zero",
  },
  cancelled: {
    label: "Cancelled",
    badge: "border-white/15 bg-white/[0.04] text-muted-foreground",
    hint: "No longer in the program",
  },
  nurture: {
    label: "Nurture",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    hint: "Not ready now — follow up later",
  },
};

/** Statuses that count as an active client for overview metrics. */
export const ACTIVE_CLIENT_STATUSES: ApplicationStatus[] = [
  "enrolled",
  "active",
];

/** Statuses that represent open leads needing attention. */
export const OPEN_LEAD_STATUSES: ApplicationStatus[] = ["new", "contacted"];
