import { steps } from "@/lib/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { Icon } from "@/components/shared/icon";
import { Reveal } from "@/components/reveal";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative section scroll-mt-24 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/backgrounds/bg-how-it-works.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.12]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/85 to-background" />
      <div className="container relative">
        <SectionHeading
          eyebrow="How it works"
          title="Five clear phases — and you approve every one"
          description="Move through at your own pace, self-serve or on autopilot. No black boxes, no call-center queue. You see exactly what's happening the whole way."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.05}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-gold sm:p-7">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold ring-1 ring-gold/20">
                    <Icon name={step.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                    {step.phase}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-1 text-[15px] font-medium text-money">
                  {step.body}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/65">
                  {step.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-foreground/50">
          Most plans span 24–48 months. Your estimator below shows a realistic
          range for your exact situation.
        </p>
      </div>
    </section>
  );
}
