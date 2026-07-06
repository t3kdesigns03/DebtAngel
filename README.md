# Debt Angel

A modern, transparent, client-driven **debt resolution** marketing site + self-serve
application. Built to feel calm, premium, and empowering — easier and more
transparent than the incumbents.

> **Smarter, Faster, Cheaper. Your Debt Zero with the least amount of risk.**

No bankruptcy · no foreclosure · no short sale · no repossession · no prepayment
penalty. Creditworthiness usually recovers faster as a byproduct of a structured,
responsible plan.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (hand-rolled Radix primitives)
- **Framer Motion** — subtle fades, lifts, phase transitions
- **React Hook Form** + **Zod** — the multi-step application
- **lucide-react** icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
```

Requires Node 18.18+ (Node 20 LTS recommended).

## Brand & design system

Gold + Money Green + Black. Tokens live in `tailwind.config.ts` and
`app/globals.css`:

- **Gold** `#D4AF37 / #C9A227` — accents, CTAs, highlights (`gold`, `gold-deep`, `gold-soft`, `gold-muted`)
- **Money Green** `#00A86B / #0D8A5C` — positive numbers, progress, success (`money`, `money-deep`, `money-soft`)
- **Black / Charcoal** `#0A0A0A / #111111` — backgrounds & text (`ink`, `ink-800`, `ink-700`)
- Supporting neutrals — warm off-white `cloud`, plus the shadcn CSS-variable scale

Fonts: **Playfair Display** (`--font-display`, headings & big numbers) + **Inter**
(`--font-inter`, body). The brandmark is an inline SVG (`components/brand/logo.tsx`)
so it stays crisp everywhere; raster logo variants also live in the repo.

## Standout features

- **Visual Individual Tradeline View** (`components/shared/tradeline-view.tsx`) —
  every account with utilization %, APR, balance, open date, status, monthly
  interest, and its share of the total debt load. Color-coded utilization bands.
- **Powerful Visual Comparison** (`components/shared/comparison-view.tsx`) — current
  path vs. Debt Angel plan in real dollars: new monthly amount, total cost, time
  saved, and total savings, with big numbers and comparison bars. The conversion
  moment.
- **Self-serve / autopilot application** (`components/application/apply-wizard.tsx`) —
  six guided phases with a jumpable progress nav: contact → map accounts → monthly
  picture → tradeline review → comparison → goals & submit.
- **Debt Freedom Estimator** (`components/estimator/estimator.tsx`) — live sliders
  that feed the same visual comparison.

## Project structure

```
app/
  layout.tsx              Root layout, fonts (Playfair + Inter), metadata
  page.tsx                Marketing home (all sections)
  apply/page.tsx          Self-serve application wizard route
  globals.css             Gold / money-green / ink tokens + utilities
components/
  brand/logo.tsx          Inline-SVG brandmark + wordmark
  sections/               Landing sections (hero, how-it-works, difference…)
  application/            Wizard, tradeline form, steps, thank-you
  shared/                 Tradeline view, comparison view, section heading, icons
  estimator/              Live Debt Freedom Estimator
  ui/                     shadcn-style primitives (button, card, slider…)
  reveal.tsx              Scroll-reveal motion wrapper (respects reduced-motion)
lib/
  site.ts                 ALL editable copy: motto, pillars, differentiators, FAQ…
  estimator.ts            Estimator math + tradeline/comparison helpers (documented)
  application-schema.ts   Zod schema, phase config, sample data, honest fit-check
  utils.ts                cn(), currency + month formatting
```

## Where to edit copy

Almost all marketing copy, the motto, pillars, differentiators, testimonials, and
FAQs live in **`lib/site.ts`**. Estimator assumptions live in **`lib/estimator.ts`**.

## ⚠️ Before you launch — replace placeholders

- **Proof points & stats in `lib/site.ts` are placeholders.** Debt-resolution
  marketing claims must be truthful and substantiated (FTC / Telemarketing Sales
  Rule). Swap in real, provable numbers.
- **Testimonials are illustrative composites.** Replace with real, consented client
  stories and outcomes, with appropriate results disclaimers.
- **Legal disclaimers in `lib/site.ts` (`disclaimers`) are a starting point.** Have
  counsel review all claims, fee language, and state availability.

## Application data

On submit, the wizard logs the payload to the console and shows the thank-you
screen (`onSubmit` in `apply-wizard.tsx`). To persist:

1. Add a Supabase project; put keys in `.env.local` (see `.env.example`).
2. Replace the simulated delay with an insert / API route call.

## Build config note

`next.config.mjs` currently sets `eslint.ignoreDuringBuilds` and
`typescript.ignoreBuildErrors` to `true` so a production build never blocks on
legacy files. Once any leftover JCS-era section files (e.g. `navbar.tsx`,
`footer.tsx`, `problem-approach.tsx`, `transparency.tsx`, and the old
`sections/estimator.tsx`) are removed, set both back to `false` to re-enable strict
checks.

## Accessibility & performance notes

- Semantic landmarks, labeled inputs, `aria-*` on interactive controls.
- Motion respects `prefers-reduced-motion`.
- Mobile-first throughout: columns stack, big numbers scale, nav collapses to a
  full-screen menu, and the wizard progress rail scrolls horizontally.
- Color contrast targets WCAG AA on ink/gold/green surfaces.
