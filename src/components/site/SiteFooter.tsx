export function SiteFooter() {
  return (
    <footer id="kontakt" className="border-t border-[color:var(--line)] bg-white">
      <div className="site-shell py-7 md:py-9">
        <div className="flex items-center justify-center gap-8 md:gap-10">
          <a
            href="https://awf.poznan.pl/gorzow/"
            target="_blank"
            rel="noreferrer"
            aria-label="AWF Gorzów"
            className="transition-opacity duration-300 hover:opacity-90"
          >
            <img
              src="/brand/awf1.png"
              alt="Logo AWF Gorzów"
              className="h-10 w-auto object-contain md:h-12"
            />
          </a>

          <a
            href="https://www.instagram.com/physioresearchreview/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram PhysioResearchReview"
            className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-0.5 md:h-14 md:w-14"
          >
            <span className="absolute inset-0 rounded-full bg-[#006B54]/14 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
            <img
              src="/brand/insta.png"
              alt="Instagram"
              className="relative h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110 md:h-11 md:w-11"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
