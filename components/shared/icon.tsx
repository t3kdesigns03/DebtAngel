import {
  BrainCircuit,
  Rocket,
  PiggyBank,
  Eye,
  SlidersHorizontal,
  Scale,
  ShieldCheck,
  TrendingUp,
  BadgeDollarSign,
  ListChecks,
  BarChart3,
  Wallet,
  Handshake,
  Trophy,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  BrainCircuit,
  Rocket,
  PiggyBank,
  Eye,
  SlidersHorizontal,
  Scale,
  ShieldCheck,
  TrendingUp,
  BadgeDollarSign,
  ListChecks,
  BarChart3,
  Wallet,
  Handshake,
  Trophy,
};

/** Render a lucide icon by the string name stored in lib/site.ts. */
export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = MAP[name] ?? ShieldCheck;
  return <Cmp className={className} />;
}
