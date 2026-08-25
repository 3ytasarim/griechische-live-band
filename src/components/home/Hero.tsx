import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef } from "react";
import { photos } from "@/data/media";
import { HeroBackground } from "@/components/home/HeroBackground";
import { useI18n } from "@/i18n/I18nProvider";
import { LiquidMetalShell } from "@/components/ui/liquid-metal-button";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ShuffleGrid } from "@/components/ui/shuffle-grid";
import { GradientShimmer, type GradientStop } from "@/components/ui/gradient-shimmer";

/** Brand-only shimmer band: white text with a traveling red glint (no gold/blue/purple). */
const titleShimmer: GradientStop[] = [
  { color: "#ffffff", position: 0 },
  { color: "#ffffff", position: 0.32 },
  { color: "var(--red)", position: 0.5 },
  { color: "#ffffff", position: 0.68 },
  { color: "#ffffff", position: 1 },
];

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-24 lg:pt-28">
      <HeroBackground />

      <div className="container-lux relative z-10 grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Sol: metin */}
        <div className="min-w-0 text-center text-white lg:-ml-24 lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto inline-flex lg:mx-0"
          >
            <AnimatedGradientText className="gap-3 text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--red)] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--red)]" />
              </span>
              <span className="eyebrow">{t.hero.eyebrow}</span>
            </AnimatedGradientText>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-5xl leading-[1.05] font-semibold text-balance text-white sm:text-6xl lg:text-[5.4rem]"
          >
            <GradientShimmer
              gradient={titleShimmer}
              duration={2.4}
              spread={4}
              pauseBetween={1200}
              style={{ whiteSpace: "pre-line" }}
            >
              {t.hero.title}
            </GradientShimmer>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 h-[3px] w-28 origin-left rounded-full bg-[var(--red)] lg:mx-0"
          />

          <motion.p
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg lg:mx-0 lg:max-w-2xl lg:text-xl"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-5 lg:justify-start"
          >
            <Link to="/contact" className="inline-flex">
              <LiquidMetalShell size="lg">
                {t.hero.cta}
                <ArrowRight className="h-5 w-5" />
              </LiquidMetalShell>
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black"
            >
              {t.hero.secondary}
            </Link>
          </motion.div>
        </div>

        {/* Sağ: karışan fotoğraf ızgarası */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[45rem]"
        >
          <ShuffleGrid
            images={photos.slice(0, 12).map((p) => p.src)}
            columns={4}
            rows={3}
            className="h-[400px] sm:h-[480px] lg:h-[560px]"
          />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-8 z-10 hidden flex-col items-center gap-2 text-[0.65rem] tracking-[0.3em] text-white/70 uppercase lg:flex"
      >
        {t.hero.scroll}
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-[var(--red)]" />
        </motion.span>
      </motion.div>
    </section>
  );
}
