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

    const fallbackTimer = window.setTimeout(() => {
      closeIntro();
    }, 14000);

    return () => window.clearTimeout(fallbackTimer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700",
        leaving ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <video
        className="h-[100dvh] w-auto max-w-full object-contain"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={closeIntro}
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={closeIntro}
        className="absolute right-6 top-6 border border-white/30 bg-black/30 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-black"
      >
        Pomiń
      </button>
    </div>
  );
}