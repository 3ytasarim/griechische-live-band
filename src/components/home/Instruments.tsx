import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OrbitingCircles, type Orbit } from "@/components/ui/orbiting-circles-02";
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

export function Instruments() {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const items = instrumentKeys.map((key) => ({
    id: key,
    name: t.instruments[key].name,
    desc: t.instruments[key].desc,
    image: images[key],
  }));

  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % items.length),
    [items.length],
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    if (isHovering) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [isHovering, next]);

  const active = items[activeIndex]!;

  const orbits: Orbit[] = [
    {
      size: "w-[220px] h-[220px] md:w-[300px] md:h-[300px]",
      duration: 16,
      direction: "cw",
      icons: [
        { id: items[0]!.id, src: items[0]!.image, alt: items[0]!.name, angle: -90 },
        { id: items[2]!.id, src: items[2]!.image, alt: items[2]!.name, angle: 90 },
      ],
    },
    {
      size: "w-[320px] h-[320px] md:w-[430px] md:h-[430px]",
      duration: 24,
      direction: "ccw",
      icons: [
        { id: items[1]!.id, src: items[1]!.image, alt: items[1]!.name, angle: 0 },
        { id: items[3]!.id, src: items[3]!.image, alt: items[3]!.name, angle: 180 },
      ],
    },
    {
      size: "w-[420px] h-[420px] md:w-[560px] md:h-[560px]",
      duration: 32,
      direction: "cw",
      icons: [
        { id: items[4]!.id, src: items[4]!.image, alt: items[4]!.name, angle: -120 },
        { id: items[5]!.id, src: items[5]!.image, alt: items[5]!.name, angle: 0 },
        { id: items[6]!.id, src: items[6]!.image, alt: items[6]!.name, angle: 120 },
      ],
    },
  ];

  return (
    <section id="instruments" className="border-t border-border py-16 lg:py-24">
      <div className="container-lux">
        {/* Başlık — ortalı, modern, animasyonlu */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-[var(--red)]/25 bg-[var(--red)]/8 px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--red)] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--red)]" />
            </span>
            <span className="eyebrow">{t.instruments.eyebrow}</span>
          </motion.div>

          <h2 className="mt-5 flex flex-wrap justify-center gap-x-3 text-4xl leading-[1.08] font-bold text-balance sm:text-5xl">
            {t.instruments.title.split(" ").map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="text-gradient-gold inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-[3px] w-24 origin-center rounded-full bg-[var(--red)]"
          />

          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            {t.instruments.subtitle}
          </motion.p>
        </div>

        {/* Yörünge halkaları */}
        <div
          className="mt-16 flex justify-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <OrbitingCircles
            orbits={orbits}
            activeId={active.id}
            onSelect={(id) => {
              const idx = items.findIndex((it) => it.id === id);
              if (idx !== -1) setActiveIndex(idx);
            }}
            className="h-[300px] sm:h-[420px] md:h-[620px]"
            center={
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-40 rounded-2xl border border-border bg-card/95 p-4 text-center shadow-xl backdrop-blur sm:w-48 sm:p-5"
                >
                  <img
                    src={active.image}
                    alt={active.name}
                    width={768}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="mx-auto h-16 w-16 rounded-full object-cover ring-2 ring-[var(--gold)]/60 sm:h-20 sm:w-20"
                  />
                  <h3 className="mt-3 font-display text-base font-semibold text-[var(--gold)] sm:text-lg">
                    {active.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{active.desc}</p>
                </motion.div>
              </AnimatePresence>
            }
          />
        </div>

        {/* Kontroller */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-[var(--red)] hover:text-[var(--red)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={item.name}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-[var(--red)]" : "bg-border"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-[var(--red)] hover:text-[var(--red)]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
