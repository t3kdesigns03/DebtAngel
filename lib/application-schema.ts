import { z } from "zod";

export const debtTypeOptions = [
  { value: "credit_cards", label: "Credit cards" },
  { value: "personal_loans", label: "Personal loans" },
  { value: "medical", label: "Medical bills" },
  { value: "collections", label: "Collections / charge-offs" },
  { value: "store_cards", label: "Store / retail cards" },
  { value: "other", label: "Other unsecured" },
] as const;

export const goalOptions = [
  {
    value: "one_payment",
    label: "One manageable payment",
    description: "Stop juggling minimums and due dates",
  },
  {
    value: "less_stress",
    label: "Less stress and fewer calls",
    description: "Get the weight — and the phone calls — off my back",
  },
  {
    value: "debt_free_faster",
    label: "Be debt-free faster",
    description: "A real finish line in years, not decades",
  },
  {
    value: "rebuild_credit",
    label: "Rebuild my credit",
    description: "Resolve the debt, then repair my score",
  },
] as const;

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "few_months", label: "In the next few months" },
  { value: "exploring", label: "Just exploring for now" },
] as const;

export const employmentOptions = [
  { value: "employed", label: "Employed" },
  { value: "self_employed", label: "Self-employed" },
  { value: "retired", label: "Retired / fixed income" },
  { value: "between_jobs", label: "Between jobs" },
] as const;

export const creditPriorityOptions = [
  {
    value: "not_priority",
    label: "Not a priority right now",
    description: "I'm focused on getting out of debt",
  },
  {
    value: "somewhat",
    label: "Somewhat important",
    description: "I'd like to protect it if reasonable",
  },
  {
    value: "critical",
    label: "Critical — I need it soon",
    description: "I have a mortgage or loan coming up",
  },
] as const;

const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [string, ...string[]];

export const applicationSchema = z.object({
  // Step 1 — contact
  firstName: z.string().min(1, "Please enter your first name"),
  lastName: z.string().min(1, "Please enter your last name"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[0-9()+\-.\s]+$/, "Please enter a valid phone number"),
  zip: z.string().regex(/^\d{5}$/, "Enter a 5-digit ZIP code"),

  // Step 2 — debt overview
  debtTypes: z.array(z.enum(values(debtTypeOptions))).min(1, "Select at least one"),
  totalDebt: z
    .number({ invalid_type_error: "Enter your approximate total" })
    .min(1000, "Enter your approximate total"),

  // Step 3 — current situation
  currentMonthlyPayment: z
    .number({ invalid_type_error: "Enter an approximate amount" })
    .min(0, "Enter an approximate amount"),
  monthlyBudget: z
    .number({ invalid_type_error: "Enter an approximate amount" })
    .min(0, "Enter an approximate amount"),
  employment: z.enum(values(employmentOptions), {
    errorMap: () => ({ message: "Select one" }),
  }),

  // Step 4 — goals
  goal: z.enum(values(goalOptions), { errorMap: () => ({ message: "Pick what fits best" }) }),
  breathingRoom: z.string().max(500).optional().or(z.literal("")),

  // Step 5 — qualification
  creditPriority: z.enum(values(creditPriorityOptions), {
    errorMap: () => ({ message: "Select one" }),
  }),
  timeline: z.enum(values(timelineOptions), {
    errorMap: () => ({ message: "Select one" }),
  }),

  // Step 6 — review
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm to continue" }),
  }),
});

export type ApplicationData = z.infer<typeof applicationSchema>;

export const defaultValues: Partial<ApplicationData> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  zip: "",
  debtTypes: [],
  totalDebt: undefined,
  currentMonthlyPayment: undefined,
  monthlyBudget: undefined,
  goal: undefined,
  breathingRoom: "",
  creditPriority: undefined,
  timeline: undefined,
  consent: undefined as unknown as true,
};

/** Fields validated at each step (0-indexed) before advancing. */
export const stepFields: (keyof ApplicationData)[][] = [
  ["firstName", "lastName", "email", "phone", "zip"],
  ["debtTypes", "totalDebt"],
  ["currentMonthlyPayment", "monthlyBudget", "employment"],
  ["goal"],
  ["creditPriority", "timeline"],
  ["consent"],
];

export const stepMeta = [
  { title: "Let's start with hello", subtitle: "So your advisor knows who they're helping." },
  { title: "Your debt, roughly", subtitle: "Ballpark is fine — we'll confirm the details together." },
  { title: "Your monthly picture", subtitle: "This helps us build a plan you can actually breathe with." },
  { title: "What breathing room means to you", subtitle: "There are no wrong answers here." },
  { title: "A quick honesty check", subtitle: "So we can tell you if this is genuinely the right fit." },
  { title: "Review and send", subtitle: "One last look before your advisor reaches out." },
];

/**
 * Honest fit signal shown to the user on the qualification step.
 * This is guidance, not a hard gate — we never reject anyone outright.
 */
export function assessFit(data: Partial<ApplicationData>): {
  tone: "good" | "caution";
  headline: string;
  body: string;
} {
  const debt = Number(data.totalDebt || 0);
  if (data.creditPriority === "critical") {
    return {
      tone: "caution",
      headline: "Let's talk before you enroll",
      body: "Because protecting your credit is critical right now, a settlement program may not be your best first move. Your advisor will walk through lower-impact options honestly — even if that means not enrolling.",
    };
  }
  if (debt > 0 && debt < 7500) {
    return {
      tone: "caution",
      headline: "There may be a simpler path",
      body: "At this balance, options like a focused payoff plan or credit counseling might serve you better than settlement. We'll give you a straight recommendation — no pressure to enroll.",
    };
  }
  return {
    tone: "good",
    headline: "This looks like a strong fit",
    body: "Based on what you've shared, a program could create real breathing room. Your advisor will confirm the details and build your exact plan.",
  };
}
