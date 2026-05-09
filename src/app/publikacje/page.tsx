import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

const publicationVideoCandidates = [
  "videos/plosone-2026-elderly.mp4",
  "videos/publications/plosone-2026-elderly.mp4",
];

const publicationVideoPath =
  publicationVideoCandidates.find((candidate) =>
    fs.existsSync(path.join(process.cwd(), "public", candidate))
  ) ?? null;

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f3]">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-[color:var(--line)] bg-[#efebe4] py-16 md:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(17,17,17,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.06) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage:
              "radial-gradient(circle at 22% 24%, black 28%, transparent 72%), radial-gradient(circle at 78% 76%, black 22%, transparent 68%)",
            WebkitMaskImage:
              "radial-gradient(circle at 22% 24%, black 28%, transparent 72%), radial-gradient(circle at 78% 76%, black 22%, transparent 68%)",
          }}
        />

        <div className="site-shell relative">
          <div className="grid gap-10 lg:grid-cols-[0.68fr_0.32fr] lg:items-stretch">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--quiet)]">
                Publikacje
              </p>

              <h1 className="mt-6 max-w-4xl font-editorial text-[clamp(2.3rem,5.8vw,5.4rem)] leading-[0.92] tracking-[-0.05em] text-[color:var(--ink)]">
                Badania, które udało nam się opublikować.
                <span className="mt-3 block font-sans text-[0.28em] font-medium leading-[1.28] tracking-[0.01em] text-[color:var(--muted)] md:text-[0.24em]">
                  Od laboratorium układu ruchu po recenzowane czasopisma i
                  międzynarodowy obieg naukowy.
                </span>
              </h1>

              <p className="mt-8 max-w-3xl text-base leading-8 text-[color:var(--muted)] md:text-lg">
                W tej sekcji zbieramy prace zespołu PhysioResearchReview: gdzie
                zostały opublikowane, jaki miały zakres i jak wyglądał proces
                badawczy.
              </p>
            </div>

            <div className="border-l border-[color:var(--line)] pl-6 lg:flex lg:min-h-[300px] lg:flex-col lg:justify-between lg:pl-10">
              <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--quiet)]">
                Research Index
              </p>

              <p className="mt-4 font-mono text-[clamp(3.4rem,8.5vw,6rem)] leading-none tracking-[-0.045em] text-[#006B54]">
                01
              </p>
              </div>

              <p className="mt-6 max-w-[21ch] text-[1.03rem] leading-8 text-[color:var(--muted)] lg:mt-10">
                Pierwsza publikacja dostępna online w modelu open access.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18 lg:py-20">
        <div className="site-shell">
          <article className="border-y border-[color:var(--line)] py-10 md:py-12">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_0.38fr] lg:items-start lg:gap-12">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--quiet)]">
                  Publikacja 01
                </p>

                <p className="mt-4 text-[0.98rem] leading-7 text-[color:var(--muted)]">
                  PLOS One. 2026 Mar 10;21(3):e0344292. DOI: 10.1371/journal.pone.0344292
                </p>

                <h2 className="mt-4 max-w-4xl text-[clamp(1.75rem,3.5vw,3.2rem)] leading-[1.08] tracking-[-0.03em] text-[color:var(--ink)]">
                  Physical function, daily activities, and spinal pain in the elderly: A
                  cross-sectional study
                </h2>

                <p className="mt-6 max-w-4xl text-[1.02rem] leading-8 text-[color:var(--muted)]">
                  Paulina Kowalewska, Małgorzata Wójcik, Aleksandra Banaszak,
                  Kacper Bernatowicz, Mateusz Motyl, Patrycja Wołodźko, Matylda
                  Sauermann, Maciej Wołczek, Eryk Pietruszak, Bartosz Aniśko.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12974841/"
                    target="_blank"
                    rel="noreferrer"
                    className="border border-[color:var(--ink)] bg-[color:var(--ink)] px-5 py-3 text-sm font-medium tracking-[0.01em] text-white transition-colors hover:bg-transparent hover:text-[color:var(--ink)]"
                  >
                    Zobacz publikację (PMC)
                  </a>

                  <a
                    href="https://doi.org/10.1371/journal.pone.0344292"
                    target="_blank"
                    rel="noreferrer"
                    className="border border-black/20 px-5 py-3 text-sm font-medium tracking-[0.01em] text-[color:var(--ink)] transition-colors hover:border-[#006B54] hover:text-[#006B54]"
                  >
                    Przejdź do DOI
                  </a>
                </div>
              </div>

              <div className="w-full max-w-[430px] justify-self-start lg:justify-self-end">
                <div className="aspect-[9/16] w-full overflow-hidden border border-black/12 bg-black">
                  {publicationVideoPath ? (
                    <video
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      preload="metadata"
                    >
                      <source src={`/${publicationVideoPath}`} type="video/mp4" />
                      Twoja przeglądarka nie obsługuje odtwarzania wideo.
                    </video>
                  ) : (
                    <div className="flex h-full items-center justify-center p-6 text-center">
                      <p className="text-sm leading-7 text-white/70">
                        Dodaj pionowy film do jednego z miejsc:
                        <br />
                        <span className="font-medium text-white">
                          public/videos/plosone-2026-elderly.mp4
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="site-shell">
          <div className="border-t border-[color:var(--line)] pt-7">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--quiet)]">
              Kolejne publikacje
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--muted)] md:text-lg">
              Spokojnie... koło ma dopiero 2 lata... to wszystko długo trwa.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex border border-black/20 px-5 py-3 text-sm font-medium tracking-[0.01em] text-[color:var(--ink)] transition-colors hover:border-[#006B54] hover:text-[#006B54]"
              >
                Wróć na stronę główną
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
