import type { Metadata } from "next";
import Link from "next/link";
import { ConferenceCalendar } from "@/components/conferences/ConferenceCalendar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { conferences } from "@/lib/conferences";

export const dynamic = "force-dynamic";

const title =
  "Kalendarz konferencji fizjoterapeutycznych i ortopedycznych | PhysioResearchReview";
const description =
  "Aktualny kalendarz konferencji, kongresów i sympozjów z fizjoterapii, ortopedii, rehabilitacji i medycyny sportowej odbywających się w Polsce.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://www.physioresearch.pl/kalendarz",
  },
  openGraph: {
    title,
    description,
    url: "https://www.physioresearch.pl/kalendarz",
    siteName: "PhysioResearchReview",
    locale: "pl_PL",
    type: "website",
  },
};

function todayInWarsaw() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function polishDate(value: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Warsaw",
  }).format(new Date(`${value}T12:00:00Z`));
}

export default function ConferenceCalendarPage() {
  const today = todayInWarsaw();
  const lastVerified = conferences.reduce(
    (latest, conference) =>
      conference.lastVerified > latest ? conference.lastVerified : latest,
    conferences[0]?.lastVerified ?? today
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": conferences.map((conference) => ({
      "@type": "Event",
      name: conference.name,
      startDate: conference.dateStart,
      endDate: conference.dateEnd ?? conference.dateStart,
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: conference.venue || conference.city,
        address: {
          "@type": "PostalAddress",
          addressLocality: conference.city,
          addressCountry: "PL",
        },
      },
      description: conference.description,
      url: conference.url,
      organizer: {
        "@type": "Organization",
        name: conference.organizer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#f4f2ed]">
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <header className="relative overflow-hidden bg-[#102523] pb-24 pt-14 text-white md:pb-28 md:pt-20 lg:pb-32 lg:pt-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(214,235,226,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(214,235,226,0.11) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "linear-gradient(90deg, black 0%, rgba(0,0,0,0.7) 65%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, black 0%, rgba(0,0,0,0.7) 65%, transparent 100%)",
          }}
        />

        <div
          className="pointer-events-none absolute -right-36 -top-44 h-[560px] w-[560px] rounded-full border border-[#b7dacd]/15 md:-right-16 md:-top-40 lg:right-4 lg:top-[-13rem] lg:h-[660px] lg:w-[660px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-16 top-16 h-[330px] w-[470px] rotate-[-14deg] rounded-[50%] border border-[#b7dacd]/10 md:right-8 lg:right-20 lg:top-12 lg:h-[390px] lg:w-[570px]"
          aria-hidden="true"
        />

        <svg
          aria-hidden="true"
          viewBox="0 0 680 360"
          className="conference-hero-art pointer-events-none absolute bottom-0 right-[-11rem] hidden h-[90%] w-[62%] opacity-80 md:block lg:right-[-4rem] lg:w-[54%]"
          fill="none"
        >
          <path
            d="M18 289C104 260 112 176 201 201C286 225 290 83 384 113C462 138 490 59 654 34"
            stroke="rgba(173, 219, 202, 0.42)"
            strokeWidth="2"
          />
          <path
            d="M14 318C126 279 174 308 242 236C311 163 376 226 437 154C498 82 561 94 666 73"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="1"
            strokeDasharray="7 10"
          />
          <path
            d="M196 202L196 340M383 113L383 340M546 73L546 340"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
          <circle cx="201" cy="201" r="5" fill="#9ccfbd" />
          <circle cx="384" cy="113" r="5" fill="#9ccfbd" />
          <circle cx="546" cy="73" r="5" fill="#9ccfbd" />
        </svg>

        <div className="site-shell relative z-10 grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="conference-hero-copy">
            <p className="text-[10px] uppercase tracking-[0.26em] text-[#9ccfbd]">
              Kalendarz konferencji
            </p>
            <h1 className="mt-5 max-w-4xl font-editorial text-[clamp(3rem,6.4vw,5.8rem)] leading-[0.9] tracking-[-0.05em] text-white">
              <span className="block">Nadchodzące</span>
              <span className="block text-[#a8d6c5]">konferencje.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
              Lista konferencji, kongresów i sympozjów związanych z
              fizjoterapią, ortopedią, rehabilitacją i medycyną sportową,
              odbywających się w Polsce.
            </p>
            <p className="mt-6 text-xs leading-5 text-white/45 tabular-nums">
              Ostatnia weryfikacja danych: {polishDate(lastVerified)}
            </p>
          </div>

          <div className="conference-hero-copy hidden border-l border-white/15 pl-7 lg:block">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#9ccfbd]">
              Indeks wydarzeń
            </p>
            <p className="mt-4 max-w-[17rem] text-sm leading-7 text-white/55">
              Terminy, lokalizacje i informacje organizacyjne w jednym,
              uporządkowanym miejscu.
            </p>
          </div>
        </div>
      </header>

      <ConferenceCalendar conferences={conferences} today={today} />

      <section className="border-t border-[color:var(--line)] bg-[#efebe4] py-10 md:py-12">
        <div className="site-shell grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p className="max-w-4xl text-sm leading-7 text-[color:var(--muted)]">
            Kalendarz jest tworzony przez PhysioResearchReview. Zbieramy
            wydarzenia naukowe i edukacyjne związane z fizjoterapią,
            ortopedią, rehabilitacją oraz medycyną sportową. Informacje o
            terminach i opłatach zawsze warto potwierdzić na stronie
            organizatora.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex min-h-11 items-center border-b border-[#006B54] text-sm font-semibold text-[#006B54] transition-colors hover:border-[color:var(--ink)] hover:text-[color:var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006B54]"
          >
            Znasz wydarzenie, którego tu brakuje?
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
