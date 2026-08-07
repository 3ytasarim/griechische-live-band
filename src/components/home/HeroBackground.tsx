import { ShaderBackground } from "@/components/ui/shader-background";

/**
 * WebGL shader arka plan: kırmızı-siyah plazma grid animasyonu.
 * Hero'nun üzerine yarı saydam uygulanır, alt kısımda yumuşak bir geçiş bırakır.
 */
export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <ShaderBackground />

      {/* Alt yumuşak geçiş — sayfanın açık zeminine karıştır */}
      <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
