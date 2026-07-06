import { steps } from "@/lib/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { Icon } from "@/components/shared/icon";
import { Reveal } from "@/components/reveal";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title="Five clear phases — and you approve every one"
          description="Move through at your own pace, self-serve or on autopilot. No black boxes, no call-center queue. You see exactly what's happening the whole way."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.05}>
              <div className="group relative flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-gold">
                    <Icon name={step.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-muted">
                    {step.phase}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-1 text-[15px] font-medium text-money-deep">
                  {step.body}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-muted-foreground">
          Most plans span 24–48 months. Your estimator below shows a realistic
          range for your exact situation.
        </p>
      </div>
    </section>
  );
}
