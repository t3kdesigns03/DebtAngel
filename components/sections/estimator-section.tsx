import { SectionHeading } from "@/components/shared/section-heading";
import { Estimator } from "@/components/estimator/estimator";

export function EstimatorSection() {
  return (
    <section
      id="estimator"
      className="section scroll-mt-24 border-y border-white/5 bg-white/[0.02]"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Debt Freedom Estimator"
          title="Your numbers, side by side, in seconds"
          description="No sign-up, nothing stored. Move the sliders to compare your current path with an estimated Debt Angel plan. These are illustrative estimates, not an offer — actual results vary."
        />
        <div className="mt-12">
          <Estimator />
        </div>
      </div>
    </section>
  );
}
