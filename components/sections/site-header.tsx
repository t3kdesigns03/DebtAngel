"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/brand/logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-background/40 backdrop-blur",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phone.replace(/[^0-9]/g, "")}`}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
          <Button asChild size="sm">
            <Link href={site.applyUrl}>Start free</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-foreground lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden">
          <div className="container flex flex-col gap-1 border-t border-border pb-6 pt-2">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              <Button asChild size="lg" onClick={() => setOpen(false)}>
                <Link href={site.applyUrl}>Start free</Link>
              </Button>
              <a
                href={`tel:${site.phone.replace(/[^0-9]/g, "")}`}
                className="flex items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground"
              >
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
