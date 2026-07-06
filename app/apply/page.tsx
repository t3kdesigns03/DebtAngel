import type { Metadata } from "next";
import { ApplyWizard } from "@/components/application/apply-wizard";

export const metadata: Metadata = {
  title: "Build your plan",
  description:
    "Map your accounts, review each tradeline, and see your current path next to a Debt Angel plan in real dollars — self-serve, in minutes.",
};

export default function ApplyPage() {
  return (
    <main className="relative min-h-screen bg-background bg-grid">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 gradient-halo" />
      <div className="container relative z-10 py-8 sm:py-12">
        <ApplyWizard />
      </div>
    </main>
  );
}
