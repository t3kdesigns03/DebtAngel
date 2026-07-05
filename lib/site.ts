/**
 * Central content + config for JCS Financial.
 * Edit copy, stats, and contact details here — components read from this file.
 *
 * NOTE: Stats below are PLACEHOLDERS framed as "earned, specific" proof points.
 * Replace with your real, substantiable numbers before launch. Debt relief
 * marketing claims must be truthful and substantiated (FTC / TSR rules).
 */

export const site = {
  name: "JCS Financial",
  tagline: "Finally, breathing room.",
  domain: "jcsfinancial.com",
  phone: "(800) 555-0142",
  email: "hello@jcsfinancial.com",
  schedulingUrl:
    process.env.NEXT_PUBLIC_SCHEDULING_URL || "https://cal.com/jcs-financial/intro",
  nav: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Debt Estimator", href: "/#estimator" },
    { label: "Resources", href: "/#faq" },
    { label: "About", href: "/#difference" },
  ],
};

export interface Proof {
  stat: string;
  label: string;
}

/** Specific, ownable proof points — not "1M+ helped". */
export const proofPoints: Proof[] = [
  { stat: "Avg. 43%", label: "reduction on enrolled balances for graduating clients" },
  { stat: "24–48 mo", label: "typical path to debt-free for most programs" },
  { stat: "1:1", label: "dedicated advisor from first call to final settlement" },
  { stat: "0", label: "upfront fees — you pay only when a debt is settled" },
];

export interface Step {
  n: number;
  title: string;
  body: string;
  detail: string;
}

export const steps: Step[] = [
  {
    n: 1,
    title: "A real conversation",
    body: "We start by understanding your whole situation — not just your balances.",
    detail:
      "Your dedicated advisor reviews your debts, budget, and goals, then tells you honestly whether a program is the right fit. No pressure, no script.",
  },
  {
    n: 2,
    title: "A plan built around your budget",
    body: "One affordable monthly deposit into an FDIC-insured account you control.",
    detail:
      "Instead of juggling minimums, you fund a single dedicated account. You see the balance grow and approve every move along the way.",
  },
  {
    n: 3,
    title: "Expert negotiators go to work",
    body: "We negotiate directly with your creditors to settle for less than you owe.",
    detail:
      "Our negotiators have handled thousands of accounts. As funds build, we settle debts one by one — and you approve each settlement before it happens.",
  },
  {
    n: 4,
    title: "You watch the debt fall",
    body: "Track every settlement, milestone, and dollar saved in real time.",
    detail:
      "A clear dashboard shows what's settled, what's next, and your projected debt-free date — so the finish line always feels real.",
  },
  {
    n: 5,
    title: "We rebuild, not just resolve",
    body: "Structured credit recovery guidance once your debts are handled.",
    detail:
      "Getting to zero is half the story. We help you rebuild credit with a practical, step-by-step recovery plan so the fresh start actually sticks.",
  },
];

export interface Difference {
  icon: string; // lucide-react icon name
  title: string;
  body: string;
}

export const differences: Difference[] = [
  {
    icon: "Eye",
    title: "Radical transparency",
    body: "Fees, timelines, credit impact, and the tax on forgiven debt — laid out plainly before you enroll. If we can't help, we'll tell you.",
  },
  {
    icon: "UserRound",
    title: "Personal from minute one",
    body: "One dedicated advisor who knows your name and your numbers — not a call-center queue and a different rep every time.",
  },
  {
    icon: "Sparkles",
    title: "Expert negotiators + smart tools",
    body: "Seasoned humans do the negotiating; clean software keeps you in control and shows progress. Neither alone — both, together.",
  },
  {
    icon: "TrendingUp",
    title: "Full-circle: relief and recovery",
    body: "We don't disappear at settlement. Structured credit-recovery guidance helps you rebuild once the weight is off.",
  },
  {
    icon: "ShieldCheck",
    title: "We only enroll the right fit",
    body: "Selective by design. If a balance transfer, credit counseling, or simply holding steady serves you better, that's what we'll say.",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  outcome: string;
  kind: "relief" | "recovery";
}

/** Illustrative composites — replace with real, consented client stories + results. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "I'd been awake at 3am doing math that never worked. My advisor actually listened, then showed me a number I could breathe with.",
    name: "Marisa T.",
    location: "Tampa, FL",
    outcome: "$38,400 → settled for $16,900",
    kind: "relief",
  },
  {
    quote:
      "What sold me was the honesty. They told me the risks up front instead of promising the moon. That's rare.",
    name: "Devon R.",
    location: "Columbus, OH",
    outcome: "5 cards resolved in 27 months",
    kind: "relief",
  },
  {
    quote:
      "The part nobody else offered: after the debt was gone, they helped me rebuild. My score is climbing every month now.",
    name: "Alicia M.",
    location: "Mesa, AZ",
    outcome: "618 → 691 in the year after graduating",
    kind: "recovery",
  },
  {
    quote:
      "One payment, one person to call, and a dashboard that showed me the finish line. It made an overwhelming thing feel handled.",
    name: "James & Priya K.",
    location: "Raleigh, NC",
    outcome: "$61,200 enrolled, on track 8 months in",
    kind: "relief",
  },
  {
    quote:
      "They actually talked me out of enrolling more debt than I needed to. Who does that? It built total trust.",
    name: "Carlos V.",
    location: "Denver, CO",
    outcome: "Enrolled only what made sense",
    kind: "relief",
  },
  {
    quote:
      "The recovery plan was step-by-step and realistic. No gimmicks — just the right moves in the right order.",
    name: "Nia W.",
    location: "Atlanta, GA",
    outcome: "Rebuilt to a 700+ score",
    kind: "recovery",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "Will this hurt my credit?",
    a: "Usually, yes — at least at first, and we won't pretend otherwise. Debt settlement typically involves letting accounts go delinquent so creditors have a reason to negotiate, which lowers your score in the short term. The trade-off is resolving debt you may not otherwise be able to pay, then rebuilding. Our credit-recovery guidance is built for exactly that rebuild. If protecting your score is the priority, settlement may not be right for you, and we'll say so.",
  },
  {
    q: "How much does it cost?",
    a: "Our fee is performance-based: you pay nothing upfront, and a fee only applies when we actually settle a debt for you. It's typically 18–25% of the enrolled balance, disclosed in writing before you agree to anything. You'll always see the all-in cost — settlements plus fee — before you enroll.",
  },
  {
    q: "How long does the program take?",
    a: "Most programs run about 24 to 48 months. The single biggest factor is how much you can comfortably set aside each month — the faster your dedicated account funds, the faster we can settle. Your estimate will show a realistic range for your situation.",
  },
  {
    q: "Is forgiven debt taxable?",
    a: "It can be. The IRS may treat forgiven debt over $600 per creditor as taxable income, and you could receive a 1099-C. Some people qualify for an insolvency exclusion. We flag this early and recommend you speak with a tax professional — we'd rather you plan for it than be surprised.",
  },
  {
    q: "Can creditors still call or sue me?",
    a: "Yes. Enrolling doesn't legally stop collection activity, and in some cases a creditor may file suit. We prepare you for this, coach you through it, and factor it into your plan. Anyone who tells you collections simply stop is not being straight with you.",
  },
  {
    q: "What kinds of debt qualify?",
    a: "Unsecured debts — credit cards, personal loans, many medical bills, and some private debts. Secured debt (mortgages, auto loans) and most student loans, taxes, and child support generally don't qualify. We'll confirm what fits during your review.",
  },
  {
    q: "Who is this NOT right for?",
    a: "If you can realistically pay your balances within a reasonable window, if you need to protect your credit for an upcoming mortgage or loan, or if your debt is mostly secured or student loans, a settlement program probably isn't your best move. In those cases we'll point you toward a better option — even if it isn't us.",
  },
  {
    q: "How is JCS different from the big companies?",
    a: "Three things: one dedicated advisor instead of a rotating call center, radical transparency about risks and costs, and full-circle support that continues into credit recovery after your debts are resolved. We also enroll selectively — we'd rather turn away a poor fit than sign everyone who calls.",
  },
];

export const disclaimers = {
  estimator:
    "Estimates are illustrative and for educational purposes only. They are not an offer, a guarantee of results, or financial, legal, or tax advice. Actual settlements, fees, timelines, and savings vary by creditor, balance, delinquency, state, and your ability to fund your account. Debt settlement may negatively affect your credit and forgiven debt may be taxable.",
  footer:
    "JCS Financial provides debt settlement and credit-recovery support services. We are not a lender, credit repair organization, credit counseling agency, or law firm, and we do not provide legal or tax advice. Programs are not available in all states. Read and understand all program documents before enrolling. Results are not guaranteed and vary by individual circumstances. The content on this site is for general information only.",
};
