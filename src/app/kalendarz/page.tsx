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
    <main className="min-h-screen bg-[#f8f7f3]">
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <header className="relative overflow-hidden border-b border-[color:var(--line)] bg-[#efebe4] py-12 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-55"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(17,17,17,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.05) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
            maskImage:
              "linear-gradient(90deg, black 0%, rgba(0,0,0,0.45) 62%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, black 0%, rgba(0,0,0,0.45) 62%, transparent 100%)",
          }}
        />

        <div className="site-shell relative z-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--quiet)]">
              Kalendarz konferencji
            </p>
            <h1 className="mt-5 max-w-4xl font-editorial text-[clamp(2.45rem,5.8vw,5rem)] leading-[0.95] tracking-[-0.045em] text-[color:var(--ink)]">
              Nadchodzące konferencje.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[color:var(--muted)] md:text-lg">
              Lista konferencji, kongresów i sympozjów związanych z
              fizjoterapią, ortopedią, rehabilitacją i medycyną sportową,
              odbywających się w Polsce.
            </p>
            <p className="mt-5 text-xs leading-5 text-[color:var(--quiet)] tabular-nums">
              Ostatnia weryfikacja danych: {polishDate(lastVerified)}
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
