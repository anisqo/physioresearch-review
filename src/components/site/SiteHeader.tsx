"use client";

import { useState } from "react";
import { home } from "@/data/home";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const regularLinks = home.nav.filter(
    (item) => item.label.toLowerCase() !== "kontakt"
  );

  const contactLink = home.nav.find(
    (item) => item.label.toLowerCase() === "kontakt"
  );

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <div className="site-shell flex h-[136px] items-center justify-between">
        <a
          href="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label="Physio Research Review — strona główna"
        >
          <img
            src="/brand/logo1.svg"
            alt="PhysioResearchReview"
            className="h-[7.5rem] w-auto shrink-0"
          />

          <span
            className="whitespace-nowrap text-[15px] font-semibold tracking-[0.08em] text-black transition-colors"
          >
            Physio Research Review
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {regularLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative py-2 text-[13px] font-medium tracking-[0.02em] text-neutral-800 transition-colors hover:text-[#006B54]"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-[#006B54] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {contactLink ? (
            <a
              href={contactLink.href}
              className="border border-black/15 px-4 py-2 text-[13px] font-medium tracking-[0.02em] text-neutral-800 transition-colors hover:border-[#006B54] hover:text-[#006B54]"
            >
              {contactLink.label}
            </a>
          ) : null}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="border border-black/15 px-4 py-2 text-[12px] uppercase tracking-[0.22em] text-neutral-800 transition-colors hover:border-[#006B54] hover:text-[#006B54] lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? "Zamknij" : "Menu"}
        </button>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-black/10 bg-white lg:hidden"
        >
          <nav className="site-shell py-5">
            <div className="grid gap-0 border-y border-black/10">
              {home.nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between border-b border-black/10 py-4 text-[14px] font-medium tracking-[0.02em] text-neutral-900 transition-colors last:border-b-0 hover:text-[#006B54]"
                >
                  <span>{item.label}</span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
                    przejdź
                  </span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
