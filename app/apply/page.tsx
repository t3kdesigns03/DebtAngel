import type { Metadata } from "next";
import { ApplicationWizard } from "@/components/application/application-wizard";

export const metadata: Metadata = {
  title: "Get Your Personalized Plan",
  description:
    "Answer a few questions and a dedicated JCS Financial advisor will build a personalized, no-pressure debt relief plan — and tell you honestly if it's the right fit.",
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-secondary/30 bg-grid">
      <ApplicationWizard />
    </main>
  );
}
