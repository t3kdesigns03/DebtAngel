import { Check } from "lucide-react";
import { trustBar } from "@/lib/site";

export function TrustBar() {
  return (
    <section
      aria-label="Why clients trust Debt Angel"
      className="border-y border-white/10 bg-white/[0.03]"
    >
      <div className="container py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10">
          {trustBar.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm font-medium text-foreground/80"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-money/15 text-money">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
