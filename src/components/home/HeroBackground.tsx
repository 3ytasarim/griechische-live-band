import { heroBgVideoSrc, heroBgPosterSrc } from "@/data/media";

/**
 * Hero arka planı: tam kapsayan video + okunabilirlik için karartma katmanı.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <video
        src={heroBgVideoSrc}
        poster={heroBgPosterSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/55" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"
      />
    </div>
  );
}
