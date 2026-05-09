"use client";

import { useEffect, useRef, useState } from "react";

type StatCard = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  accent: string;
};

const stats: StatCard[] = [
  {
    value: 200,
    prefix: "+",
    label: "uczestników",
    accent: "#ACFF5F",
  },
  {
    value: 15,
    label: "wykładów",
    accent: "#2AA8C8",
  },
  {
    value: 7,
    label: "warsztatów praktycznych",
    accent: "#E0AE2C",
  },
  {
    value: 0,
    label: "liczne wystawy technologiczne",
    suffix: "",
    accent: "#E8681E",
  },
];

function useCountUp(target: number, startAnimation: boolean, duration = 1300) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startAnimation || target === 0) {
      if (target === 0) setValue(0);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, startAnimation, target]);

  return value;
}

function StatValue({
  target,
  prefix,
  suffix,
  label,
  accent,
  startAnimation,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  accent: string;
  startAnimation: boolean;
}) {
  const current = useCountUp(target, startAnimation);

  if (target === 0) {
    return (
      <>
        <p
          className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.03em]"
          style={{ color: accent }}
        >
          liczne
        </p>
        <p className="mt-4 text-[1.02rem] leading-8 text-white/88">{label}</p>
      </>
    );
  }

  return (
    <>
      <p
        className="text-[clamp(2.2rem,4.4vw,3.4rem)] font-semibold leading-none tracking-[-0.03em]"
        style={{ color: accent }}
      >
        {prefix}
        {current}
        {suffix}
      </p>
      <p className="mt-4 text-[1.02rem] leading-8 text-white/88">{label}</p>
    </>
  );
}

export function EditionStats() {
  const wrapRef = useRef<HTMLUListElement | null>(null);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (!wrapRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartAnimation(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <ul
      ref={wrapRef}
      className="grid h-full auto-rows-fr gap-5 sm:grid-cols-2"
      aria-label="Podsumowanie pierwszej edycji konferencji"
    >
      {stats.map((card) => (
        <li
          key={card.label}
          className="flex min-h-[220px] flex-col items-center justify-center border p-8 text-center transition-all duration-300 hover:-translate-y-1 md:min-h-[240px] lg:min-h-0 lg:p-10"
          style={{
            borderColor: `${card.accent}66`,
            backgroundColor: "#000000",
            boxShadow: `inset 0 1px 0 ${card.accent}24`,
          }}
        >
          <div
            className="mb-6 h-px w-14"
            style={{ backgroundColor: `${card.accent}B3` }}
            aria-hidden="true"
          />
          <div className="w-full">
            <StatValue
              target={card.value}
              prefix={card.prefix}
              suffix={card.suffix}
              label={card.label}
              accent={card.accent}
              startAnimation={startAnimation}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
