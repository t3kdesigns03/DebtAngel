import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";

export function ProblemApproach() {
  return (
    <section className="bg-secondary/40">
      <div className="container py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Badge variant="outline" className="mb-4">
              If this sounds familiar
            </Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              You&rsquo;re not behind because you&rsquo;re careless.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600">
              <p>
                Life happened — a job change, a medical bill, an interest rate
                that quietly doubled. Now the minimums barely dent the balance,
                the calls have started, and the math you do at midnight never
                works out.
              </p>
              <p>
                It&rsquo;s exhausting. And most &ldquo;solutions&rdquo; either
                talk down to you or gloss over the parts that actually matter.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Badge className="mb-4">Our approach</Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              A seasoned guide, and a plan you can actually breathe with.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600">
              <p>
                We&rsquo;ve spent years in the debt-relief and credit-recovery
                world. We know which creditors settle, where the traps are, and
                how to build a plan around one number you can afford.
              </p>
              <p>
                We&rsquo;ll tell you the truth about the trade-offs, keep you in
                control of every decision, and stay with you past the finish line
                — until your credit is rebuilt, not just your balances cleared.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
