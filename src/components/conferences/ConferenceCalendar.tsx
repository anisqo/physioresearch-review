"use client";

import { useMemo, useState } from "react";
import type { Conference, ConferenceTopic } from "@/lib/conferences";
import { conferenceTopics } from "@/lib/conferences";

type ConferenceCalendarProps = {
  conferences: Conference[];
  today: string;
};

const monthFormatter = new Intl.DateTimeFormat("pl-PL", {
  month: "long",
  year: "numeric",
  timeZone: "Europe/Warsaw",
});

const shortMonthFormatter = new Intl.DateTimeFormat("pl-PL", {
  month: "short",
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

function dateParts(conference: Conference) {
  const start = dateFromIso(conference.dateStart);
  const end = dateFromIso(conference.dateEnd ?? conference.dateStart);
  const sameDay = conference.dateStart === (conference.dateEnd ?? conference.dateStart);
  const sameMonth =
    start.getUTCFullYear() === end.getUTCFullYear() &&
    start.getUTCMonth() === end.getUTCMonth();

  let day: string;
  if (sameDay) {
    day = String(start.getUTCDate()).padStart(2, "0");
  } else if (sameMonth) {
    day = `${String(start.getUTCDate()).padStart(2, "0")}–${String(
      end.getUTCDate()
    ).padStart(2, "0")}`;
  } else {
    day = `${start.getUTCDate()} ${shortMonthFormatter.format(start)} – ${end.getUTCDate()} ${shortMonthFormatter.format(end)}`;
  }

  return {
    day,
    month: monthFormatter.format(start),
  };
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
  const date = dateParts(conference);
  const status =
    conference.status && conference.status !== "Potwierdzone"
      ? conference.status
      : null;

  return (
    <article className="grid gap-6 border-t border-[color:var(--line)] py-8 transition-colors hover:bg-white/45 sm:py-9 lg:grid-cols-[9.5rem_minmax(0,1fr)_13rem] lg:gap-10 lg:px-4">
      <div>
        <time
          dateTime={conference.dateStart}
          className="block font-editorial text-[2.55rem] leading-none tracking-[-0.045em] text-[color:var(--ink)] sm:text-[3rem]"
        >
          {date.day}
        </time>
        <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--quiet)]">
          {date.month}
        </p>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {conference.recommended ? (
            <span className="border-l-2 border-[#006B54] pl-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#006B54]">
              Szczególnie polecamy
            </span>
          ) : null}
          {status ? (
            <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#8b4b32]">
              {status}
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 max-w-3xl text-[1.35rem] leading-[1.2] tracking-[-0.025em] text-[color:var(--ink)] sm:text-[1.6rem]">
          {conference.name}
        </h3>

        <p className="mt-3 text-sm font-medium text-[color:var(--ink)]">
          {conference.city}
          {conference.venue ? `, ${conference.venue}` : ""}
        </p>

        <p className="mt-4 max-w-3xl text-[0.98rem] leading-7 text-[color:var(--muted)]">
          {conference.description}
        </p>

        <p className="mt-4 text-[10px] uppercase tracking-[0.17em] text-[color:var(--quiet)]">
          {conference.sourceCategory ?? conference.tags.slice(0, 3).join(" / ")}
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
          <div className="mb-4 flex items-baseline justify-between gap-5">
            <h2
              id={`month-${group.key}`}
              className="font-editorial text-[1.8rem] capitalize tracking-[-0.025em] text-[color:var(--ink)] sm:text-[2.2rem]"
            >
              {group.label}
            </h2>
            <p className="shrink-0 text-[10px] uppercase tracking-[0.19em] text-[color:var(--quiet)]">
              {group.entries.length} {group.entries.length === 1 ? "wydarzenie" : "wydarzenia"}
            </p>
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
  const [topic, setTopic] = useState<ConferenceTopic>("all");
  const [recommendedOnly, setRecommendedOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
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

      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (topic === "all" || conference.tags.includes(topic)) &&
        (!recommendedOnly || conference.recommended) &&
        (!freeOnly || conference.free)
      );
    });
  }, [conferences, freeOnly, query, recommendedOnly, topic]);

  const upcoming = filtered.filter(
    (conference) => (conference.dateEnd ?? conference.dateStart) >= today
  );
  const archived = filtered.filter(
    (conference) => (conference.dateEnd ?? conference.dateStart) < today
  );
  const hasFilters =
    query.trim() !== "" || topic !== "all" || recommendedOnly || freeOnly;

  function resetFilters() {
    setQuery("");
    setTopic("all");
    setRecommendedOnly(false);
    setFreeOnly(false);
  }

  return (
    <>
      <section
        aria-label="Wyszukiwanie i filtrowanie konferencji"
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

            <p className="text-sm text-[color:var(--muted)]" aria-live="polite">
              {upcoming.length} {upcoming.length === 1 ? "nadchodzące wydarzenie" : "nadchodzących wydarzeń"}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2" aria-label="Tematy konferencji">
            {conferenceTopics.map((filter) => (
              <button
                key={filter.value}
                type="button"
                aria-pressed={topic === filter.value}
                onClick={() => setTopic(filter.value)}
                className={`min-h-11 border px-4 py-2 text-[12px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006B54] ${
                  topic === filter.value
                    ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-white"
                    : "border-black/15 bg-white text-[color:var(--ink)] hover:border-[#006B54] hover:text-[#006B54]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={recommendedOnly}
              onClick={() => setRecommendedOnly((value) => !value)}
              className={`min-h-11 border px-4 py-2 text-[12px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006B54] ${
                recommendedOnly
                  ? "border-[#006B54] bg-[#006B54] text-white"
                  : "border-black/15 bg-white text-[color:var(--ink)] hover:border-[#006B54] hover:text-[#006B54]"
              }`}
            >
              Szczególnie polecane
            </button>
            <button
              type="button"
              aria-pressed={freeOnly}
              onClick={() => setFreeOnly((value) => !value)}
              className={`min-h-11 border px-4 py-2 text-[12px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006B54] ${
                freeOnly
                  ? "border-[#006B54] bg-[#006B54] text-white"
                  : "border-black/15 bg-white text-[color:var(--ink)] hover:border-[#006B54] hover:text-[#006B54]"
              }`}
            >
              Bezpłatne
            </button>
            {hasFilters ? (
              <button
                type="button"
                onClick={resetFilters}
                className="min-h-11 px-3 py-2 text-[12px] font-medium text-[color:var(--muted)] underline decoration-black/25 underline-offset-4 hover:text-[color:var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006B54]"
              >
                Wyczyść filtry
              </button>
            ) : null}
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
                Zmień wyszukiwaną frazę albo wyłącz część filtrów.
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
