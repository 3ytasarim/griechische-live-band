import type { CSSProperties } from "react";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";
import { instrumentKeys, type InstrumentKey } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";

import bouzouki from "@/assets/instr-bouzouki.jpg";
import clarinet from "@/assets/instr-clarinet.jpg";
import lyra from "@/assets/instr-lyra.jpg";
import ntaouli from "@/assets/instr-ntaouli.jpg";
import keyboard from "@/assets/instr-keyboard.jpg";
import microphone from "@/assets/instr-microphone.jpg";
import violin from "@/assets/instr-violin.jpg";

const images: Record<InstrumentKey, string> = {
  bouzouki,
  clarinet,
  lyra,
  ntaouli,
  keyboard,
  microphone,
  violin,
};

export default function OrbitingCirclesGlobe() {
  const { t } = useI18n();
  const name = (key: InstrumentKey) => t.instruments[key].name;

  const orbits = [
    {
      size: "w-110 h-110 md:w-180 md:h-180",
      duration: 18,
      icons: [
        { src: images.bouzouki, alt: name("bouzouki"), angle: -60 },
        { src: images.clarinet, alt: name("clarinet"), angle: 0 },
        { src: images.lyra, alt: name("lyra"), angle: 60 },
      ],
    },
    {
      size: "w-150 h-150 md:w-220 md:h-220",
      duration: 24,
      icons: [
        { src: images.ntaouli, alt: name("ntaouli"), angle: 0 },
        { src: images.keyboard, alt: name("keyboard"), angle: -90 },
      ],
    },
    {
      size: "w-180 h-180 md:w-265 md:h-265",
      duration: 30,
      icons: [
        { src: images.microphone, alt: name("microphone"), angle: -60 },
        { src: images.violin, alt: name("violin"), angle: 0 },
        { src: images.bouzouki, alt: name("bouzouki"), angle: 60 },
      ],
    },
  ];

  return (
    <div className="relative flex h-110 w-full justify-center overflow-hidden md:h-160">
      {/* Center particle globe */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 aspect-square w-75 -translate-x-1/2 translate-y-1/2 md:w-145">
        <ParticleSphereAnimation />
      </div>

      {/* Orbiting rings */}
      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        const allIcons = [
          ...orbit.icons,
          ...orbit.icons.map((ic) => ({
            ...ic,
            angle: ic.angle + 180,
            alt: `${ic.alt}-mirror`,
          })),
        ];

        return (
          <div
            key={index}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-border ${orbit.size}`}
          >
            {allIcons.map((iconData, iconIndex) => (
              <div
                key={iconIndex}
                className="absolute top-0 left-1/2 -ml-8 flex h-1/2 origin-bottom flex-col items-center justify-start"
                style={
                  {
                    "--start-angle": `${iconData.angle}deg`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as CSSProperties
                }
              >
                <div
                  className="relative z-10 -mt-8 rounded-full border border-border bg-background p-3 sm:p-4"
                  style={
                    {
                      "--counter-offset": `${-iconData.angle}deg`,
                      animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                    } as CSSProperties
                  }
                >
                  <img
                    src={iconData.src}
                    alt={iconData.alt}
                    width={32}
                    height={32}
                    className="h-6 w-6 rounded-full object-cover md:h-8 md:w-8"
                  />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
