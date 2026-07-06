import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-fade px-6 py-14 text-center shadow-lift sm:px-10 sm:py-20">
          <div className="absolute inset-0 grid-noise opacity-60" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <LogoMark className="mx-auto h-14 w-14" />
            <h2 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-cloud sm:text-4xl">
              Your debt to zero.{" "}
              <span className="text-gradient-gold">The least amount of risk.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-cloud/70 sm:text-lg">
              Smarter, Faster, Cheaper. Map your accounts, see your real plan, and
              take the first step in minutes — self-serve or with an advisor.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={site.applyUrl}>
                  Build my free plan <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 text-cloud hover:bg-white/10 hover:text-cloud"
              >
                <a href={`tel:${site.phone.replace(/[^0-9]/g, "")}`}>
                  <Phone className="h-4 w-4" /> {site.phone}
                </a>
              </Button>
            </div>
            <p className="mt-5 text-xs text-cloud/50">
              No upfront fees · No prepayment penalty · No obligation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
