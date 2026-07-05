"use client";

import * as Icons from "lucide-react";
import { differences } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function Difference() {
  return (
    <section id="difference" className="scroll-mt-24 bg-secondary/40">
      <div className="container py-20 lg:py-28">
        <SectionHeading
          eyebrow="The JCS difference"
          title="What makes us the breath of fresh air"
          description="The big players get you into a program. We get you through it — and out the other side, rebuilt."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {differences.map((d, i) => {
            const Icon = (Icons[d.icon as keyof typeof Icons] ||
              Icons.Sparkles) as unknown as Icons.LucideIcon;
            const featured = i === 0;
            return (
              <Reveal key={d.title} delay={i * 0.06}>
                <div
                  className={cn(
                    "group h-full rounded-2xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift",
                    featured && "lg:row-span-1"
                  )}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-navy">{d.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{d.body}</p>
                </div>
              </Reveal>
            );
          })}

          {/* Emphasis card */}
          <Reveal delay={differences.length * 0.06}>
            <div className="flex h-full flex-col justify-between rounded-2xl bg-navy p-7 text-white shadow-lift">
              <div>
                <p className="text-sm font-medium text-teal-300">The bottom line</p>
                <p className="mt-3 text-lg font-medium leading-relaxed">
                  &ldquo;We only enroll people when it&rsquo;s genuinely the right
                  fit — and we don&rsquo;t leave until you&rsquo;re rebuilt.&rdquo;
                </p>
              </div>
              <p className="mt-6 text-sm text-slate-400">
                That&rsquo;s the whole promise. No asterisks.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
