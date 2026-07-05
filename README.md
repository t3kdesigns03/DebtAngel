# JCS Financial

A premium, conversion-optimized marketing site + lead-qualification app for a
debt relief & credit recovery company. Built to feel calm, human, and radically
transparent — a deliberate contrast to the generic, corporate incumbents.

> Emotional promise: **"Finally, breathing room."**

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (hand-rolled Radix primitives)
- **Framer Motion** — subtle fades, lifts, progress
- **React Hook Form** + **Zod** — the multi-step application
- **lucide-react** icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Requires Node 18.18+ (Node 20 LTS recommended).

## Project structure

```
app/
  layout.tsx            Root layout, fonts, metadata
  page.tsx              Marketing home (all sections)
  apply/page.tsx        Multi-step application wizard route
  globals.css           Theme tokens (navy / teal / gold) + utilities
components/
  sections/             Landing sections (hero, how-it-works, estimator, faq…)
  application/          Wizard, step components, form fields, thank-you
  ui/                   shadcn-style primitives (button, card, slider, accordion…)
  reveal.tsx            Scroll-reveal motion wrapper (respects reduced-motion)
lib/
  site.ts               ALL editable copy: stats, steps, differentiators, FAQ…
  estimator.ts          Debt Freedom Estimator math (documented, conservative)
  application-schema.ts Zod schema, step config, honest fit-check
  utils.ts              cn(), currency formatting
```

## Where to edit copy

Almost all marketing copy, stats, testimonials, and FAQs live in
**`lib/site.ts`**. Estimator assumptions live in **`lib/estimator.ts`**.

## ⚠️ Before you launch — replace placeholders

- **Stats in `lib/site.ts` (`proofPoints`) are placeholders.** Debt-relief
  marketing claims must be truthful and substantiated (FTC / Telemarketing Sales
  Rule). Swap in real, provable numbers.
- **Testimonials are illustrative composites.** Replace with real, consented
  client stories and outcomes, with appropriate results disclaimers.
- **Hero + section imagery are placeholders.** Each has an inline generation note
  (see `components/sections/hero.tsx`) describing the intended image for Grok
  Imagine. Drop finals into `public/` and swap the placeholder blocks.
- **Legal disclaimers in `lib/site.ts` (`disclaimers`) are a starting point.**
  Have counsel review all claims, fee language, and state availability.

## Application data

On submit, the wizard currently logs the payload to the console and shows the
thank-you screen (`handleSubmit` in `application-wizard.tsx`). To persist:

1. Add a Supabase project; put keys in `.env.local` (see `.env.example`).
2. Replace the simulated delay with an insert / API route call.

## Deploy to Vercel

1. Push to GitHub (repo: `t3kdesigns03/JcsFinancialVenture`).
2. Import into Vercel — it auto-detects Next.js. No env vars required to run.
3. Add `NEXT_PUBLIC_SCHEDULING_URL` (and Supabase keys later) as needed.

## Accessibility & performance notes

- Semantic landmarks, labeled inputs, `aria-*` on interactive controls.
- Motion respects `prefers-reduced-motion`.
- System-font `Inter` via `next/font` (no layout shift).
- Color contrast targets WCAG AA on navy/teal/white.
