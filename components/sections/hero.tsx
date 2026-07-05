"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { proofPoints, site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-relief" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-70" />

      <div className="container grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge className="mb-6">
              <ShieldCheck className="h-3.5 w-3.5" />
              Debt relief + credit recovery, done honestly
            </Badge>
            <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Finally,{" "}
              <span className="relative whitespace-nowrap text-teal-600">
                breathing room
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 9C60 3 120 3 180 6C220 8 260 8 298 4"
                    stroke="#D9A441"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              If the debt has been running the show, it&rsquo;s time to hand it to
              someone who&rsquo;s seen it all. We negotiate what you owe down,
              keep you in control, and stay with you all the way through to
              rebuilding your credit.
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button asChild size="lg" variant="primary">
              <Link href="/apply">
                Get Your Personalized Plan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#how-it-works">
                <Play className="h-4 w-4" />
                See how it works
              </Link>
            </Button>
          </motion.div>

          <motion.p
            className="mt-4 text-sm text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            No upfront fees · No obligation · A real person, not a call center
          </motion.p>

          {/* Trust bar */}
          <motion.dl
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8 sm:grid-cols-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {proofPoints.map((p) => (
              <div key={p.label}>
                <dt className="text-2xl font-semibold tracking-tight text-navy">
                  {p.stat}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-slate-500">{p.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Hero visual */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Placeholder hero visual.
 *
 * IMAGE TO GENERATE (Grok Imagine):
 * A calm, cinematic photo of a person (40s, relatable, not a stock-smile) sitting
 * by a large window at golden hour, shoulders relaxed, holding a warm mug, eyes
 * softly closed mid-exhale. Muted navy + warm amber light. Editorial, premium,
 * emotionally warm — the feeling of relief and a weight lifted. 4:5 portrait.
 * Overlay the floating "progress" card in the bottom-left corner.
 */
function HeroVisual() {
  return (
    <div className="relative mx-auto max-w-md">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-navy via-navy-800 to-teal-600 shadow-lift">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
          <p className="text-sm font-medium text-white/70">
            [ Hero image placeholder — calm person mid-exhale at golden hour.
            See generation note in <code className="text-teal-300">hero.tsx</code>. ]
          </p>
        </div>
      </div>

      {/* Floating progress card */}
      <motion.div
        className="absolute -bottom-6 -left-6 w-60 rounded-2xl border border-border bg-white/95 p-4 shadow-lift backdrop-blur"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Debt resolved</span>
          <span className="text-xs font-semibold text-teal-600">68%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-[68%] rounded-full bg-teal-500" />
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Projected debt-free: <span className="font-semibold text-navy">Mar 2027</span>
        </p>
      </motion.div>

      {/* Floating rating chip */}
      <motion.div
        className="absolute -right-4 top-8 flex items-center gap-2 rounded-full border border-border bg-white/95 px-3 py-2 shadow-lift backdrop-blur"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
          ))}
        </div>
        <span className="text-xs font-medium text-navy">Client-first, always</span>
      </motion.div>
    </div>
  );
}
