"use client";

import { motion } from "framer-motion";
import { steps } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white">
      <div className="container py-20 lg:py-28">
        <SectionHeading
          eyebrow="How it works"
          title="Five calm steps — and you approve every one"
          description="No black boxes. Expert negotiators do the hard part; you stay in control and watch the debt fall in real time."
        />

        <div className="relative mt-16">
          {/* connecting line */}
          <div
            className="absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-teal-200 via-teal-300 to-gold/40 md:block"
            aria-hidden
          />
          <ol className="space-y-6">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.05}>
                <li className="relative grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift md:grid-cols-[auto_1fr] md:gap-6 md:p-7">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-lg font-semibold text-white ring-4 ring-white">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy">{step.title}</h3>
                    <p className="mt-1 text-base font-medium text-teal-600">{step.body}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                      {step.detail}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <motion.p
          className="mx-auto mt-12 max-w-xl text-center text-sm text-slate-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Steps 1&ndash;5 typically span 24&ndash;48 months. Your estimate below shows a
          realistic range for your situation.
        </motion.p>
      </div>
    </section>
  );
}
