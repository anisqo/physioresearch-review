"use client";

import { useEffect, useState } from "react";

export function IntroOverlay() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  function closeIntro() {
    setLeaving(true);
    sessionStorage.setItem("prr-intro-seen", "true");

    window.setTimeout(() => {
      setVisible(false);
    }, 700);
  }

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("prr-intro-seen");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (alreadySeen || prefersReducedMotion) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const timer = window.setTimeout(() => {
      closeIntro();
    }, 4200);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[9999] bg-black transition-opacity duration-700",
        leaving ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={closeIntro}
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-8">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-white/60">
              PhysioResearchReview
            </p>

            <p className="max-w-xl text-2xl font-medium leading-tight text-white md:text-4xl">
              Nauka przyszłością fizjoterapii
            </p>
          </div>

          <button
            type="button"
            onClick={closeIntro}
            className="border border-white/30 px-5 py-3 text-[12px] uppercase tracking-[0.22em] text-white transition hover:border-white hover:bg-white hover:text-black"
          >
            Pomiń
          </button>
        </div>
      </div>
    </div>
  );
}