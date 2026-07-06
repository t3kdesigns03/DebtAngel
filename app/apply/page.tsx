import type { Metadata } from "next";
import { ApplyWizard } from "@/components/application/apply-wizard";

export const metadata: Metadata = {
  title: "Build your plan",
  description:
    "Map your accounts, review each tradeline, and see your current path next to a Debt Angel plan in real dollars — self-serve, in minutes.",
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-cloud bg-grid">
      <div className="container py-8 sm:py-12">
        <ApplyWizard />
      </div>
    </main>
  );
}
