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

function ConferenceRow({ conference }: { conference: Conference }) {
  const date = dateLabel(conference);
  const status =
    conference.status && conference.status !== "Potwierdzone"
      ? conference.status
      : null;

  return (
    <article className="grid gap-6 border-t border-[color:var(--line)] py-8 transition-colors hover:bg-white/45 sm:py-9 lg:grid-cols-[11rem_minmax(0,1fr)_13rem] lg:gap-10 lg:px-4">
      <div className="pt-1">
        <time
          dateTime={conference.dateStart}
          className="block text-[0.95rem] font-medium leading-6 tracking-[0.01em] text-[color:var(--muted)] tabular-nums"
        >
          {date}
        </time>
      </div>

      <div className="min-w-0">
        {status ? (
          <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#8b4b32]">
            {status}
          </p>
        ) : null}

        <h3 className={`${status ? "mt-3" : ""} max-w-3xl text-[1.35rem] leading-[1.2] tracking-[-0.025em] text-[color:var(--ink)] sm:text-[1.6rem]`}>
          {conference.name}
        </h3>

        <p className="mt-3 text-sm font-medium text-[color:var(--ink)]">
          {conference.city}
          {conference.venue ? `, ${conference.venue}` : ""}
        </p>

        <p className="mt-4 max-w-3xl text-[0.98rem] leading-7 text-[color:var(--muted)]">
          {conference.description}
        </p>

      </div>

      <div className="flex flex-col items-start border-t border-[color:var(--line)] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
        {conference.price ? (
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--quiet)]">
              Cena
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              {conference.price}
            </p>
          </div>
        ) : null}

        <a
          href={conference.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center border-b border-[#006B54] text-sm font-semibold text-[#006B54] transition-colors hover:border-[color:var(--ink)] hover:text-[color:var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006B54] lg:mt-auto"
        >
          Strona konferencji
        </a>
      </div>
    </article>
  );
}
function MonthGroups({ items }: { items: Conference[] }) {
  return (
    <div className="space-y-14 md:space-y-18">
      {groupByMonth(items).map((group) => (
        <section key={group.key} aria-labelledby={`month-${group.key}`}>
          <div className="mb-4">
            <h2
              id={`month-${group.key}`}
              className="text-xl font-medium capitalize tracking-[-0.015em] text-[color:var(--ink)] tabular-nums sm:text-2xl"
            >
              {group.label}
            </h2>
          </div>

          <div className="border-b border-[color:var(--line)]">
            {group.entries.map((conference) => (
              <ConferenceRow key={conference.id} conference={conference} />
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
        className="border-b border-[color:var(--line)] bg-white"
      >
        <div className="site-shell py-8 md:py-10">
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
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="site-shell">
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
