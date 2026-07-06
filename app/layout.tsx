import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const description =
  "Debt Angel — a modern, transparent debt resolution program. See every account, compare your plan in real dollars, and reach Debt Zero Smarter, Faster, Cheaper. No bankruptcy, foreclosure, or repossession.";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — ${site.mottoShort} Your Debt Zero.`,
    template: `%s · ${site.name}`,
  },
  description,
  keywords: [
    "debt resolution",
    "debt relief",
    "debt settlement alternative",
    "credit recovery",
    "Debt Angel",
    "debt free",
  ],
  openGraph: {
    title: `${site.name} — ${site.motto}`,
    description,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-sans">{children}</body>
    </html>
  );
}
