import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { EditionStats } from "@/components/physioscience/EditionStats";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

const logoFilePath = path.join(
  process.cwd(),
  "public",
  "physioscience",
  "pslogo.jpg"
);

const hasLogo = fs.existsSync(logoFilePath);

const videoCandidates = [
  "videos/physioscience-edycja-1.mp4",
  "videos/physioscience-raw.mp4",
  "physioscience/1edycja.mp4",
  "physioscience/pscience.mp4",
];

const videoSource =
  videoCandidates.find((candidate) =>
    fs.existsSync(path.join(process.cwd(), "public", candidate))
  ) ?? null;

export default function PhysioSciencePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-white/10 bg-black py-20 md:py-28">
        <div className="site-shell relative z-10">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">
            PhysioScience
          </p>

          <div className="mt-7 grid gap-10 lg:grid-cols-[0.58fr_0.42fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl font-editorial text-[clamp(2.3rem,6vw,5.6rem)] leading-[0.9] tracking-[-0.05em] text-white">
                Physio<span className="text-[#ACFF5F]">Science</span> - nauka
                przyszłością fizjoterapii.
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
                PhysioScience to konferencja tworzona przez zespół
                PhysioResearchReview oraz Zakład Fizjoterapii ZWKF w Gorzowie
                Wielkopolskim. Wydarzenie skierowane jest do studentów, młodych
                badaczy, fizjoterapeutów oraz ortopedów - dla ludzi, którzy
                chcą rozmawiać o fizjoterapii językiem nauki, faktów i
                odpowiedzialnych wniosków klinicznych.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/#kontakt"
                  className="border border-[#ACFF5F] bg-[#ACFF5F] px-5 py-3 text-sm font-medium tracking-[0.01em] text-black transition-colors hover:bg-transparent hover:text-[#ACFF5F]"
                >
                  Zgłoś chęć udziału
                </Link>
                <Link
                  href="/"
                  className="border border-white/20 px-5 py-3 text-sm font-medium tracking-[0.01em] text-white/86 transition-colors hover:border-white/45 hover:text-white"
                >
                  Wróć na stronę główną
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center lg:justify-end">
              {hasLogo ? (
                <img
                  src="/physioscience/pslogo.jpg"
                  alt="Logo konferencji PhysioScience"
                  className="h-auto w-full max-w-[980px] object-contain"
                />
              ) : (
                <div className="flex min-h-[220px] items-center justify-center p-6 text-center">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/48">
                      Miejsce na logo
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-[0.02em] text-white">
                      PHYSIO<span className="text-[#ACFF5F]">SCIENCE</span>
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/62">
                      Dodaj plik: public/physioscience/pslogo.jpg
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="site-shell py-16 md:py-20">
        <div className="border-y border-white/10 py-10 md:py-12">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/48">
            I edycja konferencji
          </p>
          <h2 className="mt-5 max-w-4xl text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.04] tracking-[-0.03em] text-white">
            Podsumowanie{" "}
            <span className="bg-gradient-to-r from-white via-[#ACFF5F] to-[#2AA8C8] bg-[length:220%_100%] bg-clip-text text-transparent animate-pulse">
              I edycji konferencji
            </span>
            .
          </h2>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(280px,420px)_minmax(0,1fr)] lg:items-stretch lg:gap-10">
            <div className="w-full max-w-[420px]">
              <div className="aspect-[9/16] w-full overflow-hidden border border-white/12 bg-black">
                {videoSource ? (
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    controls
                    preload="none"
                    playsInline
                    poster="/physioscience/pslogo.jpg"
                  >
                    <source src={`/${videoSource}`} type="video/mp4" />
                    Twoja przeglądarka nie obsługuje odtwarzania wideo.
                  </video>
                ) : (
                  <div className="flex h-full items-center justify-center p-6 text-center">
                    <p className="text-sm leading-7 text-white/62">
                      Dodaj plik wideo do jednego z miejsc:
                      <br />
                      <span className="text-white/85">
                        public/videos/physioscience-raw.mp4
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:flex lg:h-full lg:flex-col">
              <div className="lg:flex-1">
                <EditionStats />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-shell py-16 md:py-20">
        <div className="border-y border-white/10 py-12 md:py-16">
          <h2 className="mx-auto max-w-5xl text-center font-editorial text-[clamp(2.6rem,7.4vw,6.2rem)] leading-[0.93] tracking-[-0.045em] text-white">
            II edycja zaplanowana jest na
            <span className="mt-2 block font-sans text-[0.9em] font-semibold tracking-[-0.035em] text-[#FFB56B] [text-shadow:0_0_22px_rgba(232,104,30,0.32)]">
              czerwiec 2027 roku
            </span>
          </h2>
          <div
            className="mx-auto mt-8 h-px w-[min(460px,68%)]"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(232,104,30,0.72) 50%, rgba(255,255,255,0) 100%)",
            }}
            aria-hidden="true"
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
