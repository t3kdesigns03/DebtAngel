import { ShieldCheck } from "lucide-react";
import { pillars, differences, noList } from "@/lib/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { Icon } from "@/components/shared/icon";
import { Reveal } from "@/components/reveal";

export function Difference() {
  return (
    <section id="difference" className="relative scroll-mt-24 overflow-hidden bg-ink text-cloud">
      {/* subtle gold ambience for separation from adjacent sections */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[60rem] -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />

      <div className="container section relative">
        <SectionHeading
          tone="dark"
          eyebrow="The Debt Angel difference"
          title={
            <>
              A clear, structured way through{" "}
              <span className="text-gradient-gold">unsecured debt</span>.
            </>
          }
          description="A transparent plan you drive yourself — you see every account and approve every step. Designed for unsecured debt resolution; some debts, creditors, states, and situations may not qualify."
        />

        {/* Three pillars */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.06}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-gold">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-sheen text-ink shadow-gold">
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

        {/* The "No" list — the reassurance grid */}
        <Reveal className="mt-6">
          <div className="rounded-3xl border border-money/20 bg-gradient-to-br from-money/[0.08] via-white/[0.02] to-transparent p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-money/15 text-money ring-1 ring-money/30">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-semibold text-cloud sm:text-2xl">
                What Debt Angel is &mdash; and isn&rsquo;t
              </h3>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {noList.map((n) => (
                <li
                  key={n.label}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-money/40 hover:bg-white/[0.05]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-money/15 text-money ring-1 ring-money/25 transition-transform duration-300 group-hover:scale-105">
                    <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <p className="mt-4 font-semibold text-cloud">{n.label}</p>
                  <p className="mt-1 text-sm leading-snug text-cloud/60">{n.sub}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Differentiators grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differences.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.04}>
              <div className="group flex h-full gap-4 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-gold">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold ring-1 ring-gold/20 transition-colors duration-300 group-hover:bg-gold/15">
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
