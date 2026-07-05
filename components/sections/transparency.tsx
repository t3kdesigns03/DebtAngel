import { Check, AlertTriangle, Users, UserX } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";

const risks = [
  {
    title: "Your credit will likely dip first",
    body: "Settlement usually means letting accounts go delinquent so creditors will negotiate. Expect a short-term score drop, then a structured rebuild.",
  },
  {
    title: "Forgiven debt may be taxable",
    body: "The IRS can treat forgiven balances over $600 as income. Some qualify for an insolvency exclusion. We flag it early; a tax pro confirms it.",
  },
  {
    title: "Collections don't magically stop",
    body: "Creditors can still call, and occasionally sue. We prepare you for it and factor it into your plan — no false promises.",
  },
  {
    title: "You pay only when we deliver",
    body: "No upfront fees. Our performance-based fee (typically 18–25% of enrolled debt) applies only when a debt is actually settled.",
  },
];

const rightFit = [
  "You have $7,500+ in unsecured debt you're struggling to pay",
  "Minimums are barely denting your balances",
  "You can set aside a consistent monthly amount",
  "You want out of the cycle in 2–4 years, not decades",
];

const notFit = [
  "You can realistically pay balances off soon on your own",
  "You need to protect your credit for a mortgage or loan right now",
  "Your debt is mostly secured, student loans, or taxes",
  "You'd rather a lower-impact option like credit counseling",
];

export function Transparency() {
  return (
    <section className="bg-navy text-white">
      <div className="container py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-teal-300">
            <AlertTriangle className="h-3.5 w-3.5" />
            Radical transparency
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            The honest parts most companies bury
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            If we&rsquo;re asking for your trust, you deserve the trade-offs up
            front. Here&rsquo;s the real picture — and an honest read on whether
            this is even right for you.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {risks.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                  <AlertTriangle className="h-4 w-4 text-gold" />
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-teal-500/30 bg-teal-500/[0.08] p-7">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-teal-300">
                <Users className="h-5 w-5" />
                This is likely right for you if…
              </h3>
              <ul className="mt-4 space-y-3">
                {rightFit.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
                <UserX className="h-5 w-5 text-slate-400" />
                It&rsquo;s probably not right if…
              </h3>
              <ul className="mt-4 space-y-3">
                {notFit.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-slate-400">
                If any of these fit, we&rsquo;ll say so — and point you somewhere better.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
