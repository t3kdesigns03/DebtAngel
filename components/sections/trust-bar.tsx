import { Lock, HandHeart, FileCheck2, PhoneCall } from "lucide-react";
import { Reveal } from "@/components/reveal";

const items = [
  { icon: Lock, label: "No upfront fees", sub: "Pay only when a debt settles" },
  { icon: FileCheck2, label: "Everything in writing", sub: "Costs & risks disclosed first" },
  { icon: HandHeart, label: "One dedicated advisor", sub: "The same person, start to finish" },
  { icon: PhoneCall, label: "Human, not a queue", sub: "Real conversations, no scripts" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-white">
      <div className="container py-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
