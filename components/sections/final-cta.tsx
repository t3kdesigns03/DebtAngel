"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function FinalCta() {
  const reduce = useReducedMotion();

  const imgMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, scale: 1.12 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
      };

  const copyMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section className="section">
      <div className="container">
        <div className="relative flex min-h-[560px] flex-col items-center justify-end overflow-hidden rounded-[2.5rem] border border-white/10 px-6 pb-12 text-center shadow-lift sm:min-h-[640px] sm:px-10 sm:pb-16">
          {/* Symbolic hero image — winged $ emblem, gentle fade + scale settle on scroll */}
          <motion.img
            src="/images/hero/hero-abstract.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
            {...imgMotion}
          />
          {/* Dark scrim: light at top (let the emblem glow), heavy at bottom for text */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/20 via-background/65 to-background" />
          {/* Warm gold aura behind the copy */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-gold/10 to-transparent" />

          <motion.div className="relative mx-auto max-w-2xl" {...copyMotion}>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-cloud sm:text-4xl lg:text-5xl">
              See your real plan.{" "}
              <span className="text-gradient-gold">Approve every step.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-cloud/75 sm:text-lg">
              Map your unsecured accounts, compare your current path side by side,
              and take the first step in minutes — self-serve or with an advisor.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="text-base">
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
            <p className="mt-5 text-xs text-cloud/55">
              No upfront fees · No prepayment penalty · No obligation
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
