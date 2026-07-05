import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { site, disclaimers } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-slate-300">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
                <ShieldCheck className="h-5 w-5 text-teal-400" />
              </span>
              <span className="text-lg font-semibold text-white">{site.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Premium debt relief and credit recovery, done with radical
              transparency. Relief, dignity, and a clear path forward.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              <a href={`tel:${site.phone.replace(/[^0-9]/g, "")}`} className="hover:text-white">
                {site.phone}
              </a>{" "}
              ·{" "}
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/apply" className="text-slate-400 hover:text-white">
                  Get Your Personalized Plan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>About JCS</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs leading-relaxed text-slate-500">{disclaimers.footer}</p>
          <p className="mt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
