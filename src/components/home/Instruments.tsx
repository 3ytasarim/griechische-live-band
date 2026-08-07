import { motion } from "motion/react";
import OrbitingCirclesGlobe from "@/components/orbiting-circles-02";
import { useI18n } from "@/i18n/I18nProvider";

export function Instruments() {
  const { t } = useI18n();

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

        <div className="mt-8">
          <OrbitingCirclesGlobe />
        </div>
      </div>
    </section>
  );
}
