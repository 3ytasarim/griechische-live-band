import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChevronDown, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { heroVideoSrc, heroPosterSrc } from "@/data/media";
import { HeroBackground } from "@/components/home/HeroBackground";
import { useI18n } from "@/i18n/I18nProvider";
import { LiquidMetalShell } from "@/components/ui/liquid-metal-button";
import logoNegative from "@/assets/logo-negative.png";
import { site } from "@/config/site";

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [canUnmute, setCanUnmute] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const toggleMute = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (muted) {
        video.muted = false;
        await video.play();
        setMuted(false);
      } else {
        video.muted = true;
        setMuted(true);
      }
    } catch {
      setCanUnmute(false);
      setTimeout(() => setCanUnmute(true), 2000);
    }
  };

  return (
    <section ref={ref} className="relative overflow-hidden">
      <HeroBackground />

      <div className="container-lux relative z-10 grid items-start gap-14 pb-28 pt-28 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-36 lg:pt-36">
        {/* Sol: metin */}
        <div className="min-w-0 text-center text-white lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/30 px-4 py-2 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--red)] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--red)]" />
            </span>
            <span className="eyebrow">{t.hero.eyebrow}</span>
          </motion.div>

          <h1 className="mt-7 flex flex-wrap justify-center gap-x-3 text-4xl leading-[1.05] font-semibold text-balance text-white sm:text-5xl lg:justify-start lg:text-[3.6rem]">
            {t.hero.title.split(" ").map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.075, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

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
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg lg:mx-0"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Link to="/contact" className="inline-flex">
              <LiquidMetalShell>
                {t.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </LiquidMetalShell>
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black"
            >
              {t.hero.secondary}
            </Link>
          </motion.div>
        </div>

        {/* Sağ: sahne + video */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[38rem] [perspective:1400px]"
        >
          {/* Sahne gövdesi */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0f18] p-3 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.65)]">
            {/* Spot ışıkları */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-6 h-[26rem] w-40 origin-top blur-2xl [--beam-angle:14deg]"
              style={{
                background:
                  "linear-gradient(to bottom, color-mix(in oklab, white 55%, transparent), transparent 75%)",
                clipPath: "polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)",
                animation: "stage-beam 7s ease-in-out infinite",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 right-6 h-[26rem] w-40 origin-top blur-2xl [--beam-angle:-14deg]"
              style={{
                background:
                  "linear-gradient(to bottom, color-mix(in oklab, var(--red) 55%, transparent), transparent 75%)",
                clipPath: "polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)",
                animation: "stage-beam 9s ease-in-out infinite 1s",
              }}
            />

            {/* Perde kenarları */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-10 rounded-l-[2rem] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0px,rgba(0,0,0,0.5)_6px,rgba(255,255,255,0.05)_12px)] opacity-70"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-10 rounded-r-[2rem] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0px,rgba(0,0,0,0.5)_6px,rgba(255,255,255,0.06)_12px)] opacity-70"
            />

            {/* Video ekranı */}
            <div className="relative z-10 aspect-[16/10] overflow-hidden rounded-[1.4rem] border border-white/10">
              <video
                ref={videoRef}
                src={heroVideoSrc}
                poster={heroPosterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_45%,rgba(0,0,0,0.45)_100%)]" />

              {/* Logo rozeti */}
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/40 p-2 backdrop-blur-sm"
              >
                <img
                  src={logoNegative}
                  alt={`${site.name} Logo`}
                  className="h-full w-auto object-contain"
                />
              </motion.span>

              {/* Ses aç/kapat */}
              <button
                onClick={toggleMute}
                disabled={!canUnmute}
                aria-label={muted ? t.hero.soundOn : t.hero.soundOff}
                className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full border border-white/40 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-md transition-colors hover:bg-black/70 disabled:opacity-50"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                <span className="hidden sm:inline">{muted ? t.hero.soundOn : t.hero.soundOff}</span>
              </button>
            </div>

            {/* Sahne zemini */}
            <div
              aria-hidden
              className="relative z-10 mt-3 h-6 rounded-b-[1.2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]"
            />
          </div>

          {/* Zemin yansıması */}
          <div
            aria-hidden
            className="mx-auto mt-2 h-16 w-[85%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--red)_22%,transparent),transparent_70%)] blur-xl"
          />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 hidden flex-col items-center gap-2 pb-8 text-[0.65rem] tracking-[0.3em] text-white/70 uppercase lg:flex"
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
