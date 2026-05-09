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
      <div className="site-shell flex h-[84px] items-center justify-between md:h-[104px] lg:h-[136px]">
        <a
          href="/"
          className="group flex max-w-[calc(100%-96px)] min-w-0 flex-1 items-center gap-2 sm:max-w-none md:gap-3"
          aria-label="Physio Research Review — strona główna"
        >
          <img
            src="/brand/logo1.svg"
            alt="PhysioResearchReview"
            className="h-[50px] w-auto shrink-0 md:h-[78px] lg:h-[120px]"
          />

          <div className="hidden min-w-0 min-[480px]:block">
            <span className="block truncate text-[11px] font-semibold tracking-[0.06em] text-black transition-colors sm:text-[12px] md:text-[14px] lg:text-[15px] lg:tracking-[0.08em]">
              Physio Research Review
            </span>
          </div>
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
          className="ml-2 min-w-[88px] shrink-0 border border-black/15 px-2.5 py-2 text-center text-[10px] uppercase tracking-[0.16em] text-neutral-800 transition-colors hover:border-[#006B54] hover:text-[#006B54] sm:ml-3 sm:px-4 sm:text-[12px] sm:tracking-[0.22em] lg:hidden"
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
