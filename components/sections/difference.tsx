import { X } from "lucide-react";
import { pillars, differences, noList } from "@/lib/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { Icon } from "@/components/shared/icon";
import { Reveal } from "@/components/reveal";

export function Difference() {
  return (
    <section id="difference" className="scroll-mt-24 bg-ink text-cloud">
      <div className="container section">
        <SectionHeading
          tone="dark"
          eyebrow="The Debt Angel difference"
          title={
            <>
              <span className="text-gradient-gold">Smarter.</span>{" "}
              <span className="text-gradient-gold">Faster.</span>{" "}
              <span className="text-gradient-gold">Cheaper.</span>
            </>
          }
          description="Your debt to zero with the least amount of risk — a structured, responsible plan, not a drastic one."
        />

        {/* Three pillars */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-sheen text-ink">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-gold">
                  {p.word}
                </h3>
                <p className="mt-1 font-medium text-cloud">{p.headline}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-cloud/70">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* The "No" list */}
        <Reveal className="mt-6">
          <div className="rounded-3xl border border-money/25 bg-money/[0.06] p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold text-cloud">
              What you&rsquo;ll never face with Debt Angel
            </h3>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {noList.map((n) => (
                <li key={n.label} className="rounded-2xl bg-white/[0.04] p-4">
                  <span className="flex items-center gap-2 font-semibold text-cloud">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive/20 text-destructive">
                      <X className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {n.label}
                  </span>
                  <span className="mt-1.5 block text-xs text-cloud/60">{n.sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Differentiators grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differences.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.04}>
              <div className="flex h-full gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-gold">
                  <Icon name={d.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-semibold text-cloud">{d.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-cloud/70">
                    {d.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
