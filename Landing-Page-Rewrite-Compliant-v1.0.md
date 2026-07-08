# Debt Angel — Landing Page Rewrite (FTC-Compliant)
**Applies to:** mydebtangel.com and debtangel.t3kdesigns.app (same landing page)
**Binding standard:** Debt Angel Compliant Language Reference v1.0
**Prepared:** July 2026

This is a section-by-section rewrite of the live landing page. Each section lists the **key changes** (what's being fixed and why) followed by the **recommended copy** to ship.

---

## Global change: retire "Debt Zero" as a promised outcome

The current page uses "Debt Zero" as a guaranteed end state — in the page title ("Your Debt Zero"), headings ("Debt Zero, on their own terms"), a testimonial ("the year after Debt Zero"), and the final CTA ("Ready to reach Debt Zero?"). Presenting a zero-balance outcome as a brand promise implies a guaranteed result, which the reference forbids.

**Rule going forward:** "Debt Zero" may only appear as *the user's goal* or an *illustrative target*, never as something Debt Angel delivers or guarantees. Preferred replacement framing: "a clear path through your unsecured debt" / "see both paths before you decide." The browser `<title>` tag should change from *"Debt Angel — A clearer way through unsecured debt. Your Debt Zero."* to **"Debt Angel — Compare your options for unsecured debt before you decide."**

---

## 1. Hero

**Key changes**
- Lead with the reference's primary message (side-by-side comparison before deciding) rather than an outcome promise.
- Remove "Finally see your way out of debt" (implies a guaranteed exit).
- Keep and tighten the existing is/is-not disclaimer already present in the hero.
- Keep the trust row (no upfront fees / you approve every step / unsecured only) — these are compliant and are the real differentiators.

**Recommended copy**

> **Eyebrow:** A CALMER WAY THROUGH UNSECURED DEBT
>
> **Headline:** See both paths, side by side — before you decide.
>
> **Subhead:** Build a plan for your qualifying unsecured debt and compare it against your current path: your estimated monthly deposit, timeline, and all-in cost, right next to what you'd pay continuing minimum payments. You stay in control and approve every step.
>
> **Support line:** A transparent program you drive yourself. Designed for qualifying unsecured debt only. Debt Angel is not bankruptcy, and it is not a foreclosure, mortgage-modification, or repossession program. Some debts, creditors, and states may not qualify.
>
> **Primary CTA:** Start free   **Secondary CTA:** See how it works
>
> **Trust row:** No upfront fees · You approve every step · Unsecured debt only

**Stat tiles (keep, lightly reworded):**

> **$0** upfront fees — performance-based pricing only
> **Unsecured** credit cards, personal loans & similar balances
> **Every step** you review and approve before anything moves
> **Side by side** your current path next to an estimated plan

---

## 2. What Debt Angel Is / Is Not

**Key changes**
- Promote this from a buried hero sentence into its own labeled section (reference §3).
- State plainly what Debt Angel is *not*, with no language implying protection of homes, cars, or other secured assets.

**Recommended copy**

> **Section header:** What Debt Angel is designed for — and what it is not
>
> **What it is:** Debt Angel is a debt resolution program for qualifying unsecured debt — such as credit cards, personal loans, and certain medical bills. You stay in control and approve every settlement. There are no upfront fees; pricing is performance-based.
>
> **What it is not:**
> - Debt Angel is not bankruptcy.
> - Debt Angel is not a foreclosure prevention or mortgage modification program.
> - Debt Angel is not a repossession prevention program.
> - Debt Angel is not a short-sale service.
> - Debt Angel does not work with secured debts such as mortgages or auto loans in most cases.
>
> Some debts, creditors, and states may not be eligible.

---

## 3. Estimator

**Key changes**
- Rename the result from **"ESTIMATED SAVINGS · ILLUSTRATIVE"** to **"ESTIMATED DIFFERENCE VERSUS MINIMUM PAYMENTS · ILLUSTRATIVE."**
- Reframe the headline number: not "$5,580 — about 31% less than you owe" (which reads as money we save you), but the *difference between two paths.*
- Keep the two-column comparison but label each path clearly and put the assumptions block directly beside/below the result (it's already good — keep it visible, don't hide it).
- Keep the credit and tax context line adjacent to the number.

**Recommended copy**

> **Result label:** ESTIMATED DIFFERENCE VERSUS MINIMUM PAYMENTS · ILLUSTRATIVE
>
> **Primary number:** $X,XXX
>
> **Caption:** Estimated difference between continuing minimum payments and a structured Debt Angel plan, based on typical settlement ranges and program fees. This is an illustration — not an offer or a guarantee. Actual results vary.

**Two-path comparison (side by side):**

> **If you continue minimum payments** *(no new charges)*
> - Monthly payment: $800/mo
> - Estimated total you'd pay: $252,808
> - Estimated time to zero: ~40 yrs
>
> **With a Debt Angel plan** *(estimated)*
> - Estimated monthly deposit: $552/mo
> - Estimated all-in program cost: $22,080
> - Estimated time to zero: ~3 yrs 4 mo

**Assumptions (keep visible, immediately below results):**

> This estimate assumes: continued minimum payments on your current path, no new charges, an estimated APR (~23.0% revolving baseline — not your exact creditor terms), creditor participation, consistent monthly deposits into your program account, and typical settlement ranges (example: 40–60% of enrolled balances). The performance fee shown uses an 18–25% range (≈22% midpoint in examples). Your plan is built from your actual accounts.
>
> **Required context:** Estimates are illustrative and for educational purposes only. They are not an offer, a guarantee of results, or financial, legal, or tax advice. Debt resolution may negatively affect your credit during the program. Forgiven debt may be taxable. Actual resolutions, fees, timelines, and figures vary by creditor, balance, delinquency, state, and your ability to fund your account.

*(Note: keep the "31% less than the $X you owe" phrasing out of the primary result — if a percentage is shown at all, label it "estimated reduction from enrolled balance in this illustration," never "savings.")*

---

## 4. Example Scenarios (was "Testimonials / REAL MOMENTUM")

**Key changes**
- Rename section from "REAL MOMENTUM — Debt Zero, on their own terms" to **"Example scenarios."**
- Apply the required illustrative-composite label prominently at the top of the section, not just in fine print below.
- Remove every forbidden element from the current testimonials:
  - "my credit started climbing back faster than I expected" → removed (forbidden faster-recovery).
  - "628 → 704 the year after Debt Zero" and "Rebuilt past 700" / "My score kept rising" → removed (forbidden specific score examples).
  - "Reached Debt Zero, kept his car and home" → removed (forbidden secured-asset protection).
  - "$38,400 owed → resolved for $17,100" and "I was going to save years and thousands" → reframed (specific settled-amount outcomes read as guarantees).
- Recast each as an educational illustration of *how the program works*, using the reference's approved example format.

**Recommended copy**

> **Section title:** Example scenarios
>
> **Label (top of section, prominent):** These are illustrative examples based on composite client experiences. They are not real individual results and do not guarantee similar outcomes. Individual results vary based on your specific debts, creditors, ability to fund a plan, and other factors.

**Scenario cards (illustrative):**

> **Seeing it all in one place.** Every account on one screen — balances, APRs, and utilization — can make a plan feel concrete instead of hoped-for.
> *Example: $38,400 in qualifying unsecured debt addressed through a structured plan over about 30 months.*
>
> **Comparing before committing.** A side-by-side view of your current path versus an estimated plan, in real dollars, so you can decide with the numbers in front of you.
> *Example: 5 unsecured accounts organized into a single structured plan over about 26 months.*
>
> **One deposit, one dashboard.** A single monthly deposit instead of multiple due dates, with a dashboard that tracks progress toward your goal.
> *Example: qualifying unsecured balances consolidated into one monthly program deposit.*
>
> **You approve every step.** No upfront fees and no surprise charges — a plan you review and approve as it moves forward.
> *Example: a structured plan the client approved settlement by settlement.*
>
> **Guidance after resolution.** After accounts are resolved, general educational guidance is available to help you work on rebuilding credit. Credit recovery is possible but not guaranteed, and timing and results vary by individual.

---

## 5. FAQ (answers must be visible)

**Key changes**
- The live page shows only the questions (answers collapsed). Make answers visible on the page (reference §6), especially credit impact and taxability.
- Use the reference's approved direct answers verbatim for the three high-risk questions.

**Recommended copy**

> **Section eyebrow:** STRAIGHT ANSWERS — including the uncomfortable ones.

> **What is Debt Angel, exactly?**
> Debt Angel is a debt resolution program for qualifying unsecured debt. You build a plan from your actual accounts, compare it side by side against your current path, and approve every settlement yourself. We are not a lender, credit repair organization, credit counseling agency, or law firm.
>
> **How is this different from bankruptcy or other options?**
> Debt Angel is not bankruptcy and is not a substitute for legal or financial advice. It is a structured way to resolve qualifying unsecured debts that you direct yourself. We can't tell you it carries less risk than other options — the right choice depends on your situation, and you should weigh alternatives, including credit counseling and bankruptcy, before enrolling.
>
> **What does it cost, and is there a prepayment penalty?**
> There are no upfront fees. Pricing is performance-based, applied to enrolled debt as accounts are resolved. There is no prepayment penalty. You'll see the estimated all-in cost before you commit, and you approve every step.
>
> **Can I really do this myself, on autopilot?**
> Yes — the program is self-serve, with advisor assistance available if you want it. You set up consistent monthly deposits, review proposed settlements, and approve each one.
>
> **Will this affect my credit?**
> Yes, it may. Debt settlement programs can negatively impact your credit score during the time you are enrolled. After accounts are resolved, many people work to rebuild their credit, but results vary.
>
> **How long does it take?**
> Timelines vary based on your balances, creditors, and how consistently you can fund your plan. The estimator shows an illustrative timeline for your situation; it is not a guarantee.
>
> **What kinds of debt qualify?**
> Debt Angel is designed for qualifying unsecured debts, such as credit cards, personal loans, and certain medical bills. Secured debts (mortgages, auto loans, etc.) and some other types of debt typically do not qualify. Some debts, creditors, and states may not be eligible.
>
> **Is forgiven debt taxable?**
> It can be. The IRS generally treats canceled or forgiven debt as taxable income unless an exception or exclusion applies. You should consult a tax professional regarding your specific situation.

---

## 6. Final CTA & Footer

**Key changes**
- Replace "Ready to reach Debt Zero?" (outcome promise) with comparison-first CTA.
- Align the footer disclaimer to the reference's required disclaimer, adding the credit and tax lines.

**Recommended copy**

> **Final CTA heading:** Ready to compare your options?
> **Subline:** Build a clear plan for your qualifying unsecured debt and see it next to your current path. Start free, no obligation — you approve every step.
> **Button:** Build my free plan
>
> **Closing line (replaces "See your way out of debt"):** See both paths in real dollars — a clear comparison for your unsecured balances, with you approving every step.

**Footer disclaimer (use consistently near major claims and the estimator):**

> Debt Angel is not a lender, credit repair organization, credit counseling agency, or law firm. We do not provide legal or tax advice. Programs are not available in all states. Read and understand all program documents before enrolling. Results are not guaranteed and vary based on individual circumstances, creditor participation, and ability to fund a plan. Debt resolution may negatively affect your credit. Forgiven debt may be taxable. This content is for informational purposes only.

---

## Compliance audit — forbidden phrases

Checked the rewrite against the reference's forbidden list. None of the following appear in the recommended copy above:

- "Least amount of risk" / "least risk" — not used
- "Smarter. Faster. Cheaper." — not used
- "No foreclosure / your home stays your home" — removed
- "No repossession / keep the car in the driveway" — removed
- "Faster credit recovery" / "credit started climbing back faster" — removed
- Specific score examples (628 → 704, past 700) — removed
- "Projected savings" / "you could save" as primary framing — replaced with "estimated difference versus minimum payments"
- Guarantees of timelines, savings percentages, or outcomes — removed; all figures labeled illustrative

**Still to do outside copy:** update the HTML `<title>` and any meta description that still contains "Your Debt Zero," and confirm the estimator's on-page result label is changed in code (not just the marketing copy).
