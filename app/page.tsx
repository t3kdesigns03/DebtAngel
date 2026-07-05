import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ProblemApproach } from "@/components/sections/problem-approach";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Difference } from "@/components/sections/difference";
import { Estimator } from "@/components/sections/estimator";
import { Testimonials } from "@/components/sections/testimonials";
import { Transparency } from "@/components/sections/transparency";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ProblemApproach />
        <HowItWorks />
        <Difference />
        <Estimator />
        <Testimonials />
        <Transparency />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
