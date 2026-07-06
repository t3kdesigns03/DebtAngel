import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section id="testimonials" className="section scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow="Real momentum"
          title="Debt Zero, on their own terms"
          description="Illustrative client composites showing the kinds of outcomes a structured, responsible plan can create."
        />

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.05}>
              <figure className="break-inside-avoid rounded-3xl border border-white/10 bg-card p-6 shadow-soft transition-all hover:border-gold/25 hover:shadow-lift">
                <Quote className="h-6 w-6 text-gold" />
                <blockquote className="mt-3 text-[15px] leading-relaxed text-foreground">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-3">
                    {t.avatar ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-gold/30"
                      />
                    ) : (
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-sm font-bold text-gold ring-1 ring-gold/25">
                        {initialsOf(t.name)}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-semibold">{t.name}</span>
                        <span className="flex shrink-0">
                          {[...Array(5)].map((_, s) => (
                            <Star key={s} className="h-3.5 w-3.5 fill-gold text-gold" />
                          ))}
                        </span>
                      </div>
                      <span className="block text-xs text-foreground/55">
                        {t.location}
                      </span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ring-1",
                      t.kind === "recovery"
                        ? "bg-gold/10 text-gold ring-gold/25"
                        : "bg-money/10 text-money ring-money/25",
                    )}
                  >
                    {t.outcome}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-foreground/50">
          Testimonials reflect illustrative composite outcomes and do not
          guarantee similar results. Individual results vary based on your
          circumstances, creditors, and ability to fund your plan.
        </p>
      </div>
    </section>
  );
}
