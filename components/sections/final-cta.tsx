"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="bg-secondary/40">
      <div className="container py-20 lg:py-28">
        <motion.div
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-navy-800 to-teal-600 px-8 py-16 text-center shadow-lift sm:px-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-teal-300">
              <Clock className="h-3.5 w-3.5" />
              Takes about 3 minutes · No obligation
            </span>
            <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Let&rsquo;s find your breathing room.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Answer a few questions and we&rsquo;ll build a personalized,
              no-pressure plan. If a program isn&rsquo;t right for you, we&rsquo;ll
              tell you that too.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="gold">
                <Link href="/apply">
                  Get Your Personalized Plan
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/#estimator">Try the estimator first</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-slate-400">
              A dedicated advisor reaches out within 24 hours — never a robocall.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
