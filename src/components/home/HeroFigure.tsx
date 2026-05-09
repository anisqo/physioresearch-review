export function HeroFigure() {
  return (
    <figure className="relative h-full min-h-[70svh] w-full lg:min-h-[calc(100svh-136px)]">
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero-loop1.mp4" type="video/mp4" />
        Twoja przeglądarka nie obsługuje odtwarzania wideo.
      </video>

      <div className="pointer-events-none absolute inset-0 bg-black/20" />
    </figure>
  );
}
