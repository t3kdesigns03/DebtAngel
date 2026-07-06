import { Check } from "lucide-react";
import { trustBar } from "@/lib/site";

export function TrustBar() {
  return (
    <section
      aria-label="Why clients trust Debt Angel"
      className="border-y border-white/10 bg-ink"
    >
      <div className="container py-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-9">
          {trustBar.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm font-medium text-cloud/80"
            >
              <Check className="h-4 w-4 text-money" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
