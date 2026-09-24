"use client";

import { useMemo, useState } from "react";
import type { Conference } from "@/lib/conferences";

type ConferenceCalendarProps = {
  conferences: Conference[];
  today: string;
};

const monthFormatter = new Intl.DateTimeFormat("pl-PL", {
  month: "long",
  year: "numeric",
  timeZone: "Europe/Warsaw",
});

const fullDateFormatter = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Warsaw",
});

function dateFromIso(value: string) {
  return new Date(`${value}T12:00:00Z`);
}

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pl");
}

function dateLabel(conference: Conference) {
  const start = dateFromIso(conference.dateStart);
  const end = dateFromIso(conference.dateEnd ?? conference.dateStart);
  const sameDay = conference.dateStart === (conference.dateEnd ?? conference.dateStart);
  const sameMonth =
    start.getUTCFullYear() === end.getUTCFullYear() &&
    start.getUTCMonth() === end.getUTCMonth();

  if (sameDay) {
    return fullDateFormatter.format(start);
  }

  if (sameMonth) {
    return fullDateFormatter
      .format(start)
      .replace(/^\d+/, `${start.getUTCDate()}–${end.getUTCDate()}`);
  }

  return `${fullDateFormatter.format(start)} – ${fullDateFormatter.format(end)}`;
}

function groupByMonth(items: Conference[]) {
  const groups = new Map<string, Conference[]>();

  for (const conference of items) {
    const key = conference.dateStart.slice(0, 7);
    const current = groups.get(key) ?? [];
    current.push(conference);
    groups.set(key, current);
  }

  return Array.from(groups, ([key, entries]) => ({
    key,
    label: monthFormatter.format(dateFromIso(`${key}-01`)),
    entries,
  }));
}

function ConferenceRow({
  conference,
  dark,
}: {
  conference: Conference;
  dark: boolean;
}) {
  const date = dateLabel(conference);
  const status =
    conference.status && conference.status !== "Potwierdzone"
      ? conference.status
      : null;

  return (
    <article
      className={`grid gap-6 border-t px-4 py-8 transition-colors duration-300 sm:px-5 sm:py-9 lg:grid-cols-[11rem_minmax(0,1fr)_13rem] lg:gap-10 lg:px-5 ${
        dark
          ? "border-[#46514e] bg-[#293230] hover:bg-[#323d3a]"
          : "border-[#cfd7d2] bg-white/60 hover:bg-[#e4ece8]"
      }`}
    >
      <div
        className={`border-l pl-4 pt-1 lg:border-l-0 lg:border-r lg:pl-0 lg:pr-7 ${
          dark ? "border-[#8ba89d]/45" : "border-[#729487]/60"
        }`}
      >
        <time
          dateTime={conference.dateStart}
          className={`block text-[0.95rem] font-medium leading-6 tracking-[0.01em] tabular-nums ${
            dark ? "text-[#afd3c5]" : "text-[#345e50]"
          }`}
        >
          {date}
        </time>
      </div>

      <div className="min-w-0">
        {status ? (
          <p className={`text-[10px] font-semibold uppercase tracking-[0.17em] ${dark ? "text-[#e6b79f]" : "text-[#8b4b32]"}`}>
            {status}
          </p>
        ) : null}

        <h3 className={`${status ? "mt-3" : ""} max-w-3xl text-[1.35rem] leading-[1.2] tracking-[-0.025em] sm:text-[1.6rem] ${dark ? "text-white" : "text-[color:var(--ink)]"}`}>
          {conference.name}
        </h3>

        <p className={`mt-3 text-sm font-medium ${dark ? "text-white/85" : "text-[color:var(--ink)]"}`}>
          {conference.city}
          {conference.venue ? `, ${conference.venue}` : ""}
        </p>

        <p className={`mt-4 max-w-3xl text-[0.98rem] leading-7 ${dark ? "text-white/65" : "text-[color:var(--muted)]"}`}>
          {conference.description}
        </p>

      </div>

      <div className={`flex flex-col items-start border-t pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0 ${dark ? "border-white/20" : "border-[#bfcac4]"}`}>
        {conference.price ? (
          <div>
            <p className={`text-[10px] uppercase tracking-[0.2em] ${dark ? "text-white/45" : "text-[color:var(--quiet)]"}`}>
              Cena
            </p>
            <p className={`mt-2 text-sm leading-6 ${dark ? "text-white/65" : "text-[color:var(--muted)]"}`}>
              {conference.price}
            </p>
          </div>
        ) : null}

        <a
          href={conference.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-5 inline-flex min-h-11 items-center border-b text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 lg:mt-auto ${
            dark
              ? "border-[#9ccfbd] text-[#9ccfbd] hover:border-white hover:text-white focus-visible:outline-[#9ccfbd]"
              : "border-[#006B54] text-[#006B54] hover:border-[color:var(--ink)] hover:text-[color:var(--ink)] focus-visible:outline-[#006B54]"
          }`}
        >
          <span>Strona konferencji</span>
          <span aria-hidden="true" className="ml-2 text-base font-normal">
            ↗
          </span>
        </a>
      </div>
    </article>
  );
}
function MonthGroups({ items }: { items: Conference[] }) {
  return (
    <div className="space-y-14 md:space-y-18">
      {groupByMonth(items).map((group) => (
        <section
          key={group.key}
          aria-labelledby={`month-${group.key}`}
          className="conference-month"
        >
          <div className="mb-3 border-y border-[#343c3a] bg-[#1d2322] px-4 py-4 sm:px-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#aeb4b1]" aria-hidden="true" />
              <h2
                id={`month-${group.key}`}
                className="text-base font-semibold capitalize tracking-[0.02em] text-[#f4f4f1] tabular-nums sm:text-lg"
              >
                {group.label}
              </h2>
            </div>
          </div>

          <div className="border-b border-[#c3cec8]">
            {group.entries.map((conference, index) => (
              <ConferenceRow
                key={conference.id}
                conference={conference}
                dark={index % 2 === 1}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function ConferenceCalendar({
  conferences,
  today,
}: ConferenceCalendarProps) {
  const [query, setQuery] = useState("");
  const [showArchive, setShowArchive] = useState(false);

  const filtered = useMemo(() => {
    const normalizedQuery = normalizeSearch(query.trim());

    return conferences.filter((conference) => {
      const searchable = normalizeSearch(
        [
          conference.name,
          conference.city,
          conference.description,
          conference.organizer,
          ...conference.tags,
        ].join(" ")
      );

      return !normalizedQuery || searchable.includes(normalizedQuery);
    });
  }, [conferences, query]);

  const upcoming = filtered.filter(
    (conference) => (conference.dateEnd ?? conference.dateStart) >= today
  );
  const archived = filtered.filter(
    (conference) => (conference.dateEnd ?? conference.dateStart) < today
  );
  return (
    <>
      <section
        aria-label="Wyszukiwanie konferencji"
        className="relative z-20 -mt-10 bg-transparent"
      >
        <div className="site-shell">
          <div className="conference-search-panel border border-[#c7d1cc] bg-[#fbfaf7]/95 px-5 py-7 shadow-[0_22px_60px_rgba(18,45,39,0.13)] backdrop-blur-sm sm:px-7 md:px-9 md:py-8">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <label
                htmlFor="conference-search"
                className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--quiet)]"
              >
                Szukaj konferencji
              </label>
              <input
                id="conference-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nazwa, miasto, temat"
                className="mt-3 min-h-12 w-full border-0 border-b border-black/25 bg-transparent px-0 text-base text-[color:var(--ink)] outline-none transition-colors placeholder:text-neutral-400 focus:border-[#006B54] focus-visible:ring-0"
              />
            </div>

            <p className="text-sm text-[color:var(--muted)] tabular-nums" aria-live="polite">
              {upcoming.length} {upcoming.length === 1 ? "nadchodzące wydarzenie" : "nadchodzących wydarzeń"}
            </p>
          </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden pb-12 pt-14 md:pb-16 md:pt-18 lg:pb-20 lg:pt-22">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 8% 8%, rgba(80, 124, 107, 0.12), transparent 24rem), radial-gradient(circle at 92% 48%, rgba(135, 111, 64, 0.07), transparent 28rem)",
          }}
        />
        <div className="site-shell relative z-10">
          {upcoming.length > 0 ? (
            <MonthGroups items={upcoming} />
          ) : (
            <div className="border-y border-[color:var(--line)] py-12 text-center">
              <h2 className="font-editorial text-3xl tracking-[-0.03em] text-[color:var(--ink)]">
                Brak wydarzeń spełniających kryteria
              </h2>
              <p className="mx-auto mt-3 max-w-xl leading-7 text-[color:var(--muted)]">
                Zmień wyszukiwaną frazę.
              </p>
            </div>
          )}

          {archived.length > 0 ? (
            <div className="mt-16 border-t border-[color:var(--line)] pt-8">
              <button
                type="button"
                aria-expanded={showArchive}
                onClick={() => setShowArchive((value) => !value)}
                className="min-h-11 border border-black/20 px-5 py-2.5 text-sm font-medium text-[color:var(--ink)] transition-colors hover:border-[#006B54] hover:text-[#006B54] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#006B54]"
              >
                {showArchive
                  ? "Ukryj minione wydarzenia"
                  : `Zobacz minione wydarzenia (${archived.length})`}
              </button>

              {showArchive ? (
                <div className="mt-12 opacity-80">
                  <p className="mb-8 text-[10px] uppercase tracking-[0.22em] text-[color:var(--quiet)]">
                    Archiwum
                  </p>
                  <MonthGroups items={archived} />
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
