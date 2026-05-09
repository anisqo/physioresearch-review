import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

type ConferenceEntry = {
  code: string;
  period: string;
  location: string;
  title: string;
  description: string;
  tags: string;
  linkHref?: string;
  linkLabel?: string;
};

const conferenceEntries: ConferenceEntry[] = [
  {
    code: "01",
    period: "2024",
    location: "Warszawa",
    title: "35. Międzynarodowe Targi Rehabilitacji i Fizjoterapii",
    description:
      "Testowaliśmy najnowsze aparaty ultrasonograficzne oraz bieżnię antygrawitacyjną odciążającą kończyny dolne pacjentów podczas chodu. Szczególnie inspirujące były wykłady o wczesnej pionizacji pacjentów na OIOM-ie i rehabilitacji po urazach czaszkowo-mózgowych. Duże wrażenie zrobiły też nowinki z robotyki: mechaniczne rękawice dla pacjentów po udarach, egzoszkielety, a także rozwiązania VR i AI. Dla nas kluczowe pozostaje jedno: wdrażać tylko rozwiązania poparte solidnymi badaniami.",
    tags: "TECHNOLOGIA / ROBOTYKA / OIOM / EVIDENCE",
  },
  {
    code: "02",
    period: "13.12.2024",
    location: "Pabianice",
    title: "IV Międzynarodowy Kongres PTMSiW",
    description:
      "Wzięliśmy udział w IV Międzynarodowym Kongresie Polskiego Towarzystwa Mięśni Ścięgien i Więzadeł. Wykłady dotyczyły m.in. wpływu predyspozycji anatomicznych i biomechanicznych oraz odpowiedniego treningu na ryzyko kontuzji. Omówiono także problem nietrafnych diagnoz urazów i znaczenie psychiki w powrocie do aktywności po urazie. Ważnym wątkiem była również rola treningu wyobrażeniowego w poprawie wyników sportowych.",
    tags: "URAZY / DIAGNOSTYKA / PSYCHOLOGIA / SPORT",
  },
  {
    code: "03",
    period: "2025",
    location: "AWFiS, Gdańsk",
    title: "Siła młodych umysłów",
    description:
      "To był wyjątkowy dzień dla naszego koła: wystąpienia, debiuty naukowe i nagrody. Ten wyjazd pokazał nam, że konsekwentna praca zespołu przekłada się na realną obecność w środowisku naukowym.",
    tags: "WYSTĄPIENIA / DEBIUTY / NAGRODY",
  },
  {
    code: "04",
    period: "2025/2026",
    location: "Gorzów Wielkopolski",
    title: "Nasza własna konferencja PhysioScience",
    description:
      "Rozwijamy autorską konferencję, w której fizjoterapia spotyka się z rzetelną metodologią badań, analizą ruchu i odpowiedzialną praktyką kliniczną.",
    tags: "AUTORSKI PROJEKT / KONFERENCJA / NAUKA",
    linkHref: "/physioscience",
    linkLabel: "Zobacz podstronę PhysioScience",
  },
  {
    code: "05",
    period: "2026",
    location: "Łódź",
    title: "OLIMP 2026",
    description:
      "Kolejny ważny punkt na naszej mapie wyjazdów. Relację merytoryczną i materiały zdjęciowe z wydarzenia rozwijamy w kolejnych aktualizacjach tej podstrony.",
    tags: "OLIMP / WYJAZD / RELACJA",
  },
  {
    code: "06",
    period: "23.05.2026",
    location: "VIII Zachodniopomorskie Sympozjum Młodych Naukowców",
    title: "SEA YOU 2 - sesja naukowa",
    description:
      "Uczestniczyliśmy w VIII Zachodniopomorskim Sympozjum Młodych Naukowców wraz z sesją Polskiego Towarzystwa Studentów Stomatologii - SEA YOU 2.",
    tags: "SYMPOZJUM / SEA YOU 2 / INTERDYSCYPLINARNOŚĆ",
  },
  {
    code: "07",
    period: "27.05.2026",
    location: "IX Ogólnopolska Konferencja dla Młodych Naukowców",
    title: "Wieczór Naukowca 2026 - Wokół Człowieka",
    description:
      "Wzięliśmy udział w IX Ogólnopolskiej Konferencji dla Młodych Naukowców „Wieczór Naukowca 2026 - Wokół Człowieka”, kontynuując naszą linię aktywności naukowej i prezentacji wniosków.",
    tags: "WIECZÓR NAUKOWCA / MŁODZI BADACZE / PREZENTACJE",
  },
];

const orderedConferenceEntries = [...conferenceEntries].reverse();
const conferencePhotoRoots = ["konferencje", "conferences"];

function getConferencePhotos(code: string) {
  for (const root of conferencePhotoRoots) {
    const entryPath = path.join(process.cwd(), "public", root, code);
    if (!fs.existsSync(entryPath)) continue;

    const photos = fs
      .readdirSync(entryPath, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isFile() && /\.(jpg|jpeg|png|webp|avif)$/i.test(entry.name)
      )
      .sort((a, b) =>
        a.name.localeCompare(b.name, "pl", { numeric: true, sensitivity: "base" })
      )
      .slice(0, 4)
      .map((entry) => `/${root}/${code}/${entry.name}`);

    if (photos.length > 0) return photos;
  }

  return [];
}

export default function ConferencesPage() {
  return (
    <main className="min-h-screen bg-[#0d141d] text-white">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-white/12 py-16 md:py-22">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(860px 460px at 12% 8%, rgba(172,255,95,0.14), transparent 62%), radial-gradient(880px 460px at 92% 84%, rgba(42,168,200,0.18), transparent 66%), repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 84px)",
          }}
        />

        <div className="site-shell relative z-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">
            Konferencje
          </p>

          <h1 className="mx-auto mt-6 max-w-5xl font-editorial text-[clamp(2.4rem,6.4vw,6rem)] leading-[1.02] tracking-[-0.04em] text-white">
            Wyjazdy, wystąpienia i
            <span className="block text-[#ACFF5F]">naukowe podsumowania.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/74 md:text-lg">
            Tutaj relacjonujemy konferencje, w których bierzemy udział jako
            zespół PhysioResearchReview. To dziennik naszych aktywności:
            wystąpień, kontaktów naukowych i wniosków, które wracają z nami do
            codziennej pracy.
          </p>

        </div>
      </section>

      <section className="bg-[#111a24] py-14 md:py-18">
        <div className="site-shell">
          <ol className="space-y-12">
            {orderedConferenceEntries.map((entry) => {
              const photos = getConferencePhotos(entry.code);

              return (
                <li key={entry.code} className="mx-auto max-w-5xl">
                  <article className="border-y border-white/14 bg-white/[0.01] px-4 py-8 sm:px-6 md:px-10 md:py-10">
                    <div className="text-center">
                      <p className="font-mono text-[12px] tracking-[0.2em] text-[#ACFF5F]">
                        {entry.code}
                      </p>
                      <p className="mt-2 text-sm text-white/63">{entry.period}</p>
                      <p className="text-sm text-white/63">{entry.location}</p>

                      <h3 className="mx-auto mt-5 max-w-3xl text-[1.55rem] leading-[1.18] tracking-[-0.022em] text-white md:text-[1.8rem]">
                        {entry.title}
                      </h3>

                      <p className="mx-auto mt-4 max-w-3xl text-[1.02rem] leading-8 text-white/73">
                        {entry.description}
                      </p>

                      {entry.linkHref && entry.linkLabel ? (
                        <div className="mt-6">
                          <Link
                            href={entry.linkHref}
                            className="inline-flex border border-white/22 px-5 py-2.5 text-sm font-medium tracking-[0.01em] text-white/90 transition-colors hover:border-[#ACFF5F] hover:text-[#ACFF5F]"
                          >
                            {entry.linkLabel}
                          </Link>
                        </div>
                      ) : null}

                      <p className="mt-4 text-[11px] uppercase tracking-[0.19em] text-white/46">
                        {entry.tags}
                      </p>
                    </div>

                    {photos.length > 0 ? (
                      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                        {photos.map((photo, index) => (
                          <figure
                            key={photo}
                            className="aspect-[4/3] overflow-hidden border border-white/14 bg-black/35"
                          >
                            <img
                              src={photo}
                              alt={`${entry.title} - zdjęcie ${index + 1}`}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </figure>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-8 flex aspect-[10/2.5] items-center justify-center border border-dashed border-white/20 bg-white/[0.02]">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/48">
                          Relacja wkrótce
                        </p>
                      </div>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
