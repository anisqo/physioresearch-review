import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { HeroFigure } from "@/components/home/HeroFigure";
import { IntroOverlay } from "@/components/site/IntroOverlay";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { home } from "@/data/home";

const practicePillarTones = [
  {
    accent: "#2F6A59",
    line: "rgba(47, 106, 89, 0.34)",
    surface: "rgba(47, 106, 89, 0.05)",
  },
  {
    accent: "#2D5F71",
    line: "rgba(45, 95, 113, 0.34)",
    surface: "rgba(45, 95, 113, 0.05)",
  },
  {
    accent: "#8A733E",
    line: "rgba(138, 115, 62, 0.34)",
    surface: "rgba(138, 115, 62, 0.05)",
  },
  {
    accent: "#91533C",
    line: "rgba(145, 83, 60, 0.34)",
    surface: "rgba(145, 83, 60, 0.05)",
  },
  {
    accent: "#2F6A59",
    line: "rgba(47, 106, 89, 0.34)",
    surface: "rgba(47, 106, 89, 0.05)",
  },
  {
    accent: "#2D5F71",
    line: "rgba(45, 95, 113, 0.34)",
    surface: "rgba(45, 95, 113, 0.05)",
  },
];

const physioScienceLogoFilePath = path.join(
  process.cwd(),
  "public",
  "physioscience",
  "pslogo.jpg"
);
const hasPhysioScienceLogo = fs.existsSync(physioScienceLogoFilePath);

function hasPublicAsset(assetPath?: string) {
  if (!assetPath) return false;
  const normalized = assetPath.startsWith("/") ? assetPath.slice(1) : assetPath;
  return fs.existsSync(path.join(process.cwd(), "public", normalized));
}

function portraitStyle(photo?: string, shiftY = 0, scale = 1) {
  if (photo) {
    const normalizedScale = scale > 0 ? scale : 1;

    return {
      backgroundColor: "#D7DDE2",
      backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.16), rgba(15,23,20,0.2)), url(${photo})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transform: `translateY(${shiftY}px) scale(${normalizedScale})`,
      transformOrigin: "center",
    } as const;
  }

  return {
    backgroundImage:
      "radial-gradient(circle at 34% 28%, #ffffff 0%, #e7ecea 36%, #d2dbd7 100%)",
  } as const;
}

export default function HomePage() {
  const teamMembers = home.team.cohorts.flatMap((cohort) => cohort.members);
  const teamTitleParts = home.team.title.split("PhysioResearchReview");
  const hasTeamBrandToken = teamTitleParts.length > 1;

  return (
    <>
      <IntroOverlay />

      <main id="top" className="min-h-screen">
        <SiteHeader />

        <section className="grid min-h-[calc(100svh-136px)] grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center border-b border-black/10 bg-[#f8f7f3] lg:border-b-0">
            <div className="w-full px-6 py-20 md:px-10 md:py-24 lg:px-14 lg:py-28 xl:px-20">
              <div className="mx-auto w-full max-w-[720px]">
                <h1 className="max-w-5xl font-editorial text-[clamp(3.8rem,8.4vw,8rem)] leading-[0.94] tracking-[-0.055em] text-balance">
                  <span className="block">Nauka</span>
                  <span className="mt-2 block md:mt-3">przyszłością</span>
                  <span
                    className="mt-2 block md:mt-3"
                    style={{ color: "#006B54" }}
                  >
                    fizjoterapii
                  </span>
                </h1>

                <p className="mt-12 max-w-2xl text-xl leading-9 tracking-[-0.02em] text-[color:var(--muted)]">
                  {home.hero.lead}
                </p>

                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <Link
                    href={home.hero.primaryAction.href}
                    className="border border-[color:var(--ink)] bg-[color:var(--ink)] px-5 py-3 text-sm font-medium tracking-[-0.01em] text-white transition-colors hover:bg-transparent hover:text-[color:var(--ink)]"
                  >
                    {home.hero.primaryAction.label}
                  </Link>

                  <Link
                    href={home.hero.secondaryAction.href}
                    className="group inline-flex items-center gap-2 text-sm font-medium tracking-[-0.01em] text-[color:var(--ink)] transition-colors hover:text-[#006B54]"
                  >
                    {home.hero.secondaryAction.label}
                    <span className="transition-transform group-hover:translate-x-1">
                      ↗
                    </span>
                  </Link>
                </div>

                <p className="mt-7 text-[12px] uppercase tracking-[0.18em] text-[color:var(--quiet)]">
                  Publikacje naukowe / projekty studenckie / konferencja
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[70svh] overflow-hidden bg-[#050505] lg:min-h-[calc(100svh-136px)]">
            <HeroFigure />
          </div>
        </section>

        <section
          id="zespol"
          className="relative overflow-hidden bg-[linear-gradient(160deg,#1f242b_0%,#171b21_52%,#0f1318_100%)] py-20 md:py-28"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            aria-hidden
            style={{
              background:
                "radial-gradient(1200px 520px at 50% -8%, rgba(255,255,255,0.08), transparent 62%), radial-gradient(900px 420px at 92% 18%, rgba(42,168,200,0.09), transparent 58%), radial-gradient(780px 380px at 10% 86%, rgba(172,255,95,0.07), transparent 64%)",
            }}
          />
          <div
            className="site-shell relative z-10"
            style={
              {
                "--ink": "#F4F5F6",
                "--muted": "#C2C7CE",
                "--quiet": "#97A0AA",
                "--line": "rgba(255, 255, 255, 0.18)",
              } as React.CSSProperties
            }
          >
            <div className="border-t border-[color:var(--line)] pt-6 text-center">
              <p className="text-[12px] uppercase tracking-[0.24em] text-[color:var(--quiet)]">
                {home.team.label}
              </p>

              <h2 className="mx-auto mt-8 max-w-[18ch] text-[clamp(2.1rem,3.3vw,4rem)] leading-[1.02] tracking-[-0.04em] text-[color:var(--ink)]">
                {hasTeamBrandToken ? (
                  <>
                    {teamTitleParts[0]}
                    <span className="bg-gradient-to-r from-[#ACFF5F] via-[#2AA8C8] to-[#E8681E] bg-[length:200%_100%] bg-clip-text text-transparent motion-safe:animate-pulse">
                      PhysioResearchReview
                    </span>
                    {teamTitleParts[1]}
                  </>
                ) : (
                  home.team.title
                )}
              </h2>

              <div
                className="mx-auto mt-6 h-px w-[min(360px,72%)]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(172,255,95,0.65) 34%, rgba(42,168,200,0.65) 66%, rgba(255,255,255,0) 100%)",
                }}
                aria-hidden="true"
              />

              <p className="mx-auto mt-7 max-w-[66ch] text-[1.06rem] leading-[1.75] text-[color:var(--muted)]">
                {home.team.intro}
              </p>
            </div>

            <div className="mt-14 border-t border-[color:var(--line)] pt-10 md:pt-12">
              <article className="flex flex-col items-center pb-10 text-center md:pb-12">
                <div className="relative -mt-2 h-32 w-32 overflow-hidden rounded-full border border-white/30 sm:h-36 sm:w-36 md:h-40 md:w-40">
                  <div
                    className="absolute inset-0"
                    style={portraitStyle(
                      home.team.founder.photo,
                      (home.team.founder as { photoShiftY?: number }).photoShiftY ?? 0,
                      (home.team.founder as { photoScale?: number }).photoScale ?? 1
                    )}
                  />
                </div>

                <h3 className="mt-4 text-[1.3rem] leading-[1.16] tracking-[-0.026em] text-[color:var(--ink)]">
                  {home.team.founder.name}
                </h3>

                <p className="mt-2 text-[0.9rem] leading-[1.4] tracking-[0.04em] text-[color:var(--muted)]">
                  {home.team.founder.role}
                </p>
              </article>

              <ul className="grid grid-cols-2 gap-x-4 gap-y-10 border-t border-[color:var(--line)] pt-10 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 md:gap-x-8 lg:grid-cols-5 lg:gap-y-12 xl:grid-cols-10 xl:gap-x-4 xl:gap-y-10">
                {teamMembers.map((member) => {
                  const [firstName, ...lastNameParts] = member.name.split(" ");
                  const lastName = lastNameParts.join(" ");

                  return (
                    <li key={member.name} className="flex flex-col items-center text-center">
                      <div className="relative h-24 w-24 overflow-hidden rounded-full border border-white/24 sm:h-28 sm:w-28">
                        <div
                          className="absolute inset-0"
                          style={portraitStyle(
                            member.photo,
                            (member as { photoShiftY?: number }).photoShiftY ?? 0,
                            (member as { photoScale?: number }).photoScale ?? 1.14
                          )}
                        />
                      </div>

                      <h4 className="mt-4 text-[1.04rem] leading-[1.2] tracking-[-0.02em] text-[color:var(--ink)]">
                        <span className="block">{firstName}</span>
                        <span className="mt-0.5 block">{lastName}</span>
                      </h4>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <section id="o-kole" className="relative w-full overflow-hidden bg-white py-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
            <svg className="h-full w-full" viewBox="0 0 1400 1400" preserveAspectRatio="none">
              <defs>
                <linearGradient id="about-arrow-gradient" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0,107,84,0.06)" />
                  <stop offset="45%" stopColor="rgba(0,107,84,0.11)" />
                  <stop offset="100%" stopColor="rgba(0,107,84,0.07)" />
                </linearGradient>
              </defs>
              <path
                d="M1172 44 C1048 98 930 148 792 236 C642 330 512 402 672 496 C842 592 1010 664 824 764 C648 858 404 916 566 1038 C712 1150 500 1220 262 1328"
                fill="none"
                stroke="url(#about-arrow-gradient)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M244 1306 L262 1328 L290 1314"
                fill="none"
                stroke="rgba(0,107,84,0.17)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="site-shell relative z-10">
            <div className="pt-6">
              <div className="text-center">
                <p className="text-[12px] uppercase tracking-[0.24em] text-[color:var(--quiet)]">
                  {home.about.label}
                </p>

                <h2 className="mx-auto mt-8 max-w-[23ch] text-[clamp(2.05rem,3vw,3.6rem)] leading-[1.06] tracking-[-0.035em] text-[color:var(--ink)] text-pretty">
                  {home.about.title}
                </h2>

                <p className="mx-auto mt-7 max-w-[78ch] text-[clamp(1rem,1.12vw,1.18rem)] leading-[1.76] tracking-[-0.01em] text-[color:var(--muted)]">
                  {home.about.description}
                </p>
              </div>

              <div className="mt-12 md:mt-14 lg:mt-16">
                <ol className="space-y-8 md:space-y-10">
                  {home.about.items.map((item, index) => {
                    const tone = practicePillarTones[index % practicePillarTones.length];
                    const hasImage = hasPublicAsset(item.image);
                    const isTextFirst = index % 2 === 0;
                    const imageShiftX = item.imageShiftX ?? 0;
                    const imageShiftY = item.imageShiftY ?? 0;
                    const imagePositionX = `calc(50% + ${imageShiftX}px)`;
                    const imagePositionY = `calc(100% + ${imageShiftY}px)`;

                    return (
                      <li key={item.title} className="pt-2">
                        <article className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-10">
                          <div className={isTextFirst ? "order-1" : "order-2"}>
                            <div className="flex items-center gap-2.5">
                              <span
                                className="font-mono text-[11px] tracking-[0.2em]"
                                style={{ color: tone.accent }}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </div>

                            <h3 className="mt-2.5 text-[1.24rem] leading-[1.22] tracking-[-0.02em] text-[color:var(--ink)] md:text-[1.35rem]">
                              {item.title}
                            </h3>
                            <p className="mt-2.5 text-[0.98rem] leading-[1.64] text-[color:var(--muted)]">
                              {item.description}
                            </p>
                            <p className="mt-3 text-[11px] uppercase tracking-[0.17em] text-[color:var(--quiet)]">
                              {item.tag}
                            </p>
                          </div>

                          <figure
                            className={`${isTextFirst ? "order-2" : "order-1"} flex h-[230px] items-center justify-center overflow-hidden sm:h-[250px] md:h-[280px] lg:h-[300px]`}
                          >
                            {item.image && hasImage ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-contain"
                                style={{ objectPosition: `${imagePositionX} ${imagePositionY}` }}
                                loading="lazy"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-[color:var(--paper)]/45">
                                <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--quiet)]">
                                  Dodaj grafikę
                                </p>
                              </div>
                            )}
                          </figure>
                        </article>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section
          id="physioscience"
          className="relative overflow-hidden border-y border-white/10 bg-black py-16 md:py-20"
        >
          <div className="site-shell relative z-10">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">
              {home.physioScience.label}
            </p>

            <div className="mt-6 grid gap-8 lg:grid-cols-[0.6fr_0.4fr] lg:items-end">
              <div>
                <h2 className="max-w-4xl font-editorial text-[clamp(2.2rem,5.2vw,4.8rem)] leading-[0.92] tracking-[-0.045em] text-white">
                  Physio<span className="text-[#ACFF5F]">Science</span> - nauka
                  przyszłością fizjoterapii.
                </h2>

                <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
                  PhysioScience to konferencja tworzona przez zespół
                  PhysioResearchReview oraz Zakład Fizjoterapii ZWKF w Gorzowie
                  Wielkopolskim. Wydarzenie skierowane jest do studentów,
                  młodych badaczy, fizjoterapeutów oraz ortopedów - dla ludzi,
                  którzy chcą rozmawiać o fizjoterapii językiem nauki, faktów i
                  odpowiedzialnych wniosków klinicznych.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/physioscience"
                    className="border border-[#ACFF5F] bg-[#ACFF5F] px-5 py-3 text-sm font-medium tracking-[0.01em] text-black transition-colors hover:bg-transparent hover:text-[#ACFF5F]"
                  >
                    Przejdź do strony konferencji
                  </Link>

                  <Link
                    href="/#kontakt"
                    className="border border-white/20 px-5 py-3 text-sm font-medium tracking-[0.01em] text-white/86 transition-colors hover:border-white/45 hover:text-white"
                  >
                    Kontakt organizacyjny
                  </Link>
                </div>
              </div>

              <div className="relative flex items-center justify-center lg:justify-end">
                {hasPhysioScienceLogo ? (
                  <img
                    src="/physioscience/pslogo.jpg"
                    alt="Logo konferencji PhysioScience"
                    className="h-auto w-full max-w-[760px] object-contain"
                  />
                ) : (
                  <div className="p-2 text-right">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/48">
                      Miejsce na logo
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/62">
                      Wstaw logo do:{" "}
                      <span className="font-medium text-white/88">
                        public/physioscience/pslogo.jpg
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
