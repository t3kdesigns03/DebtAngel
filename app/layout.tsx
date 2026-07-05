import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Finally, breathing room.`,
    template: `%s · ${site.name}`,
  },
  description:
    "Premium debt relief and credit recovery, done with radical transparency. One dedicated advisor, expert negotiators, and full-circle support from relief to rebuild.",
  keywords: [
    "debt relief",
    "debt settlement",
    "credit recovery",
    "debt consolidation alternative",
    "JCS Financial",
  ],
  openGraph: {
    title: `${site.name} — Finally, breathing room.`,
    description:
      "Premium debt relief and credit recovery with radical transparency. Relief, dignity, and a clear path forward.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans">{children}</body>
    </html>
  );
}
