import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

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
              <figure className="break-inside-avoid rounded-3xl border border-border bg-card p-6 shadow-soft">
                <Quote className="h-6 w-6 text-gold" />
                <blockquote className="mt-3 text-[15px] leading-relaxed text-foreground">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{t.name}</span>
                    <span className="flex">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-gold text-gold" />
                      ))}
                    </span>
                  </div>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {t.location}
                  </span>
                  <span
                    className={cn(
                      "mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold",
                      t.kind === "recovery"
                        ? "bg-gold-soft text-gold-muted"
                        : "bg-money-soft text-money-deep",
                    )}
                  >
                    {t.outcome}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
          Testimonials reflect illustrative composite outcomes and do not
          guarantee similar results. Individual results vary based on your
          circumstances, creditors, and ability to fund your plan.
        </p>
      </div>
    </section>
  );
}
