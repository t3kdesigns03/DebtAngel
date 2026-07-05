"use client";

import * as React from "react";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Loader2, ChevronLeft } from "lucide-react";

import {
  applicationSchema,
  defaultValues,
  stepFields,
  stepMeta,
  type ApplicationData,
} from "@/lib/application-schema";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { site } from "@/lib/site";

import { StepContact } from "./steps/step-contact";
import { StepDebt } from "./steps/step-debt";
import { StepSituation } from "./steps/step-situation";
import { StepGoals } from "./steps/step-goals";
import { StepQualify } from "./steps/step-qualify";
import { StepReview } from "./steps/step-review";
import { ThankYou } from "./thank-you";

const stepComponents = [
  StepContact,
  StepDebt,
  StepSituation,
  StepGoals,
  StepQualify,
  StepReview,
];

const TOTAL = stepComponents.length;

export function ApplicationWizard() {
  const [step, setStep] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [payload, setPayload] = React.useState<Partial<ApplicationData>>({});

  const methods = useForm<ApplicationData>({
    resolver: zodResolver(applicationSchema),
    defaultValues,
    mode: "onTouched",
    shouldFocusError: true,
  });

  const StepComponent = stepComponents[step];
  const isLast = step === TOTAL - 1;
  const progress = ((step + (submitted ? 1 : 0)) / TOTAL) * 100;

  const goNext = async () => {
    const valid = await methods.trigger(stepFields[step], { shouldFocus: true });
    if (!valid) return;
    if (isLast) {
      await handleSubmit();
      return;
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL - 1));
    scrollTop();
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
    scrollTop();
  };

  const handleSubmit = async () => {
    const data = methods.getValues();
    setSubmitting(true);
    // Simulate async persistence. Later: POST to /api or Supabase.
    await new Promise((r) => setTimeout(r, 900));
    // eslint-disable-next-line no-console
    console.log("JCS application submitted:", data);
    setPayload(data);
    setSubmitting(false);
    setSubmitted(true);
    scrollTop();
  };

  function scrollTop() {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <div className="container max-w-3xl py-16 lg:py-24">
        <ThankYou data={payload} />
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-10 lg:py-16">
      {/* Top bar */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-navy"
        >
          <ChevronLeft className="h-4 w-4" />
          Home
        </Link>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
          Private & secure
        </span>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>
            Step {step + 1} of {TOTAL}
          </span>
          <span>{Math.round(progress)}% there</span>
        </div>
        <Progress value={progress} />
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
          {stepMeta[step].title}
        </h1>
        <p className="mt-2 text-slate-600">{stepMeta[step].subtitle}</p>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            goNext();
          }}
        >
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 32 : -32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -32 : 32 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <StepComponent />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav */}
          <div className="mt-10 flex items-center justify-between gap-4">
            {step > 0 ? (
              <Button type="button" variant="ghost" onClick={goBack} disabled={submitting}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            ) : (
              <span />
            )}

            <Button type="submit" variant="primary" size="lg" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : isLast ? (
                <>Send my details</>
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </FormProvider>

      <p className="mt-8 text-center text-xs text-slate-400">
        No upfront fees · No obligation · Talk to a human at{" "}
        <a
          href={`tel:${site.phone.replace(/[^0-9]/g, "")}`}
          className="font-medium text-teal-600 hover:underline"
        >
          {site.phone}
        </a>
      </p>
    </div>
  );
}
