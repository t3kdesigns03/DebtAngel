"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="container flex h-[4.5rem] items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label={site.name}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-white">
            <ShieldCheck className="h-5 w-5 text-teal-400" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-navy">
            {site.name}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="primary" size="sm">
            <Link href="/apply">Get Your Personalized Plan</Link>
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container flex flex-col gap-1 py-4">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="primary" className="mt-2">
              <Link href="/apply" onClick={() => setOpen(false)}>
                Get Your Personalized Plan
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
