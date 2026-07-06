import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { Wordmark } from "@/components/brand/logo";
import { site, disclaimers } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink text-cloud">
      <div className="container py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <Wordmark className="[&_span]:text-cloud" />
            <p className="mt-4 max-w-xs text-sm text-cloud/70">
              {site.motto}
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <a
                href={`tel:${site.phone.replace(/[^0-9]/g, "")}`}
                className="flex items-center gap-2 text-cloud/80 transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-cloud/80 transition-colors hover:text-gold"
              >
                <Mail className="h-4 w-4" /> {site.email}
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gold">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cloud/70 transition-colors hover:text-cloud"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={site.applyUrl}
                  className="text-cloud/70 transition-colors hover:text-cloud"
                >
                  Start your plan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gold">
              The promise
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-cloud/70">
              <li>No bankruptcy or foreclosure</li>
              <li>No short sale or repossession</li>
              <li>No prepayment penalty</li>
              <li>You approve every move</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs leading-relaxed text-cloud/50">
            {disclaimers.footer}
          </p>
          <p className="mt-4 text-xs text-cloud/40">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
