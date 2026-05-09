import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f3]">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-[color:var(--line)] bg-[#f0ede6] py-14 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(17,17,17,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.045) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
          }}
        />

        <div className="site-shell relative z-10">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--quiet)]">
            Kontakt
          </p>

          <h1 className="mt-5 max-w-4xl font-editorial text-[clamp(2.2rem,5.4vw,5rem)] leading-[0.94] tracking-[-0.045em] text-[color:var(--ink)]">
            Porozmawiajmy o nauce, współpracy i projektach.
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="site-shell">
          <article className="grid gap-8 lg:grid-cols-[0.58fr_0.42fr] lg:items-stretch lg:gap-12">
            <div className="border-y border-[color:var(--line)] py-8 md:py-10">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--quiet)]">
                Dane kontaktowe
              </p>

              <a
                href="mailto:kontakt@physioresearch.pl"
                className="mt-5 inline-block text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.08] tracking-[-0.02em] text-[color:var(--ink)] transition-colors hover:text-[#006B54]"
              >
                kontakt@physioresearch.pl
              </a>

              <div className="mt-8 max-w-2xl border-t border-[color:var(--line)] pt-7 text-[1.02rem] leading-8 text-[color:var(--muted)] md:text-[1.08rem]">
                <p>Zakład Fizjoterapii</p>
                <p>Akademia Wychowania Fizycznego w Poznaniu,</p>
                <p>Zamiejscowy Wydział Kultury Fizycznej</p>
                <p>ul. Estkowskiego 13</p>
                <p>Gorzów Wielkopolski, 66-400</p>
              </div>
            </div>

            <figure className="overflow-hidden border border-[color:var(--line)] bg-[#ebe8e1]">
              <img
                src="/kontakt/siedziba.webp"
                alt="Siedziba Zakładu Fizjoterapii w Gorzowie Wielkopolskim"
                className="h-full min-h-[340px] w-full object-cover"
                loading="lazy"
              />
            </figure>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
