"use client";

import { Star, Quote, Sparkles, TrendingUp } from "lucide-react";
import { testimonials } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";

export function Testimonials() {
  return (
    <section className="bg-white">
      <div className="container py-20 lg:py-28">
        <SectionHeading
          eyebrow="Real stories"
          title="Relief you can feel — and a rebuild that lasts"
          description="A mix of settlement wins and credit-recovery comebacks. Names changed for privacy; outcomes are illustrative composites of client results."
        />

        <div className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.06}>
              <figure className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <Badge variant={t.kind === "recovery" ? "gold" : "default"}>
                    {t.kind === "recovery" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <Sparkles className="h-3 w-3" />
                    )}
                    {t.kind === "recovery" ? "Recovery" : "Relief"}
                  </Badge>
                </div>
                <Quote className="mt-4 h-6 w-6 text-teal-200" />
                <blockquote className="mt-2 text-[15px] leading-relaxed text-slate-700">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-navy">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.location}</p>
                  <p className="mt-2 inline-block rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700">
                    {t.outcome}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-slate-400">
          Testimonials reflect illustrative composite outcomes and do not
          guarantee similar results. Individual results vary based on your
          circumstances, creditors, and ability to fund your program.
        </p>
      </div>
    </section>
  );
}
