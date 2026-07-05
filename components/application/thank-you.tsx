"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, CalendarCheck, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import type { ApplicationData } from "@/lib/application-schema";

export function ThankYou({ data }: { data: Partial<ApplicationData> }) {
  const next = [
    {
      icon: CheckCircle2,
      title: "We've got your details",
      body: "Your advisor is reviewing your situation right now — a real person, not a queue.",
    },
    {
      icon: Phone,
      title: "A call within 24 hours",
      body: "Expect a friendly, no-pressure conversation to confirm your numbers and answer anything.",
    },
    {
      icon: CalendarCheck,
      title: "Your personalized plan",
      body: "You'll get a clear, written plan with real costs, timeline, and trade-offs — then you decide.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-xl text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-50"
      >
        <CheckCircle2 className="h-11 w-11 text-teal-600" />
      </motion.div>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
        Take a breath{data.firstName ? `, ${data.firstName}` : ""}. You&rsquo;ve
        done the hard part.
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        Reaching out is the step most people put off for months. It&rsquo;s handled
        now — here&rsquo;s exactly what happens next.
      </p>

      <div className="mt-10 space-y-3 text-left">
        {next.map((n, i) => (
          <motion.div
            key={n.title}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <n.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-navy">{n.title}</p>
              <p className="mt-0.5 text-sm text-slate-600">{n.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild size="lg" variant="primary">
          <a href={site.schedulingUrl} target="_blank" rel="noopener noreferrer">
            <Clock className="h-4 w-4" />
            Prefer to book a time? Schedule now
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>

      <p className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
        <ShieldCheck className="h-3.5 w-3.5" />
        Your information is kept private and is never sold.
      </p>
    </motion.div>
  );
}
