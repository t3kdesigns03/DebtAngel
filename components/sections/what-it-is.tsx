import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/reveal";

/**
 * Plain statement of what Debt Angel is designed for — and what it is not.
 * Language sourced from the Compliant Language Reference v1.0.
 */
export function WhatItIs() {
  return (
    <section id="what-it-is" className="section scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow="Know what you're getting"
          title="What Debt Angel is designed for — and what it is not"
          description="Designed for qualifying unsecured debt only. Some debts, creditors, and states may not be eligible."
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-money/20 bg-money/[0.06] p-6 shadow-soft sm:p-7">
              <h3 className="font-display text-lg font-semibold text-money">
                What it is
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/75">
                Debt Angel is a debt resolution program for qualifying unsecured
                debt — such as credit cards, personal loans, and certain medical
                bills. You stay in control and approve every settlement. There are
                no upfront fees; pricing is performance-based.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-soft sm:p-7">
              <h3 className="font-display text-lg font-semibold">What it is not</h3>
              <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-foreground/75">
                <li>Debt Angel is not bankruptcy.</li>
                <li>
                  It is not a foreclosure prevention or mortgage modification
                  program.
                </li>
                <li>It is not a repossession prevention program.</li>
                <li>It is not a short-sale service.</li>
                <li>
                  It does not work with secured debts such as mortgages or auto
                  loans in most cases.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
