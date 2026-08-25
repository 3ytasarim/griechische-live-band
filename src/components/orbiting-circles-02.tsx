import type { CSSProperties } from "react";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";
import { instrumentStripKeys, type InstrumentStripKey } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";

import bouzouki from "@/assets/instr-strip-bouzouki-new.png";
import clarinet from "@/assets/instr-strip-clarinet.jpg";
import lyra from "@/assets/instr-strip-lyra-new.png";
import daouli from "@/assets/instr-strip-daouli.jpg";
import keyboard from "@/assets/instr-strip-keyboard.jpg.webp";
import vocals from "@/assets/instr-strip-vocals-new.png";

const images: Record<InstrumentStripKey, string> = {
  bouzouki,
  clarinet,
  lyra,
  ntaouli: daouli,
  keyboard,
  microphone: vocals,
};

export default function OrbitingCirclesGlobe() {
  const { t } = useI18n();
  const name = (key: InstrumentStripKey) => t.instruments[key].name;

  const orbits = [
    {
      size: "w-130 h-130 md:w-200 md:h-200",
      duration: 22,
      icons: [
        { src: images.bouzouki, alt: name("bouzouki"), angle: -60 },
        { src: images.clarinet, alt: name("clarinet"), angle: 0 },
        { src: images.lyra, alt: name("lyra"), angle: 60 },
      ],
    },
    {
      size: "w-195 h-195 md:w-285 md:h-285",
      duration: 30,
      icons: [
        { src: images.ntaouli, alt: name("ntaouli"), angle: -60 },
        { src: images.keyboard, alt: name("keyboard"), angle: 0 },
        {
          src: images.microphone,
          alt: name("microphone"),
          angle: 60,
          objectPosition: "center 20%",
        },
      ],
    },
  ];

  return (
    <div className="relative flex h-115 w-full justify-center overflow-hidden md:h-175">
      {/* Große rote Partikelkugel im Hintergrund */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 aspect-square w-90 -translate-x-1/2 translate-y-1/2 md:w-170">
        <ParticleSphereAnimation />
      </div>

      {/* Zwei Umlaufbahnen mit je 3 Instrumenten */}
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
            className={`absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 rounded-full border border-border ${orbit.size}`}
          >
            {allIcons.map((iconData, iconIndex) => (
              <div
                key={iconIndex}
                className="absolute top-0 left-1/2 -ml-12 flex h-1/2 origin-bottom flex-col items-center justify-start md:-ml-14"
                style={
                  {
                    "--start-angle": `${iconData.angle}deg`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as CSSProperties
                }
              >
                <div
                  className="relative -mt-12 h-24 w-24 shrink-0 md:h-28 md:w-28"
                  style={
                    {
                      "--counter-offset": `${-iconData.angle}deg`,
                      animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                    } as CSSProperties
                  }
                >
                  <div className="h-full w-full overflow-hidden rounded-full border border-border bg-background shadow-elegant">
                    <img
                      src={iconData.src}
                      alt={iconData.alt}
                      className="h-full w-full object-cover"
                      style={
                        "objectPosition" in iconData
                          ? { objectPosition: iconData.objectPosition }
                          : undefined
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
