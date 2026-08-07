import { Link, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { heroVideoSrc, heroPosterSrc } from "@/data/media";
import { FloatingBackground } from "@/components/common/FloatingBackground";
import { useI18n } from "@/i18n/I18nProvider";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import logoNegative from "@/assets/logo-negative.png";
import { site } from "@/config/site";

export function Hero() {
  const { t } = useI18n();
  const navigate = useNavigate();
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
      // Tarayıcı otomatik sesli oynatmayı engelledi
      setCanUnmute(false);
      setTimeout(() => setCanUnmute(true), 2000);
    }
  };

  return (
    <section
      ref={ref}
      className="relative flex h-[80vh] min-h-[620px] max-h-[760px] items-center justify-center overflow-hidden"
    >
      {/* Video arka plan */}
      <div className="absolute inset-0 h-full w-full">
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
      </div>

      {/* Hafif koyu vinyet: video net kalsın, beyaz metin okunaklı olsun */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.6)_100%)]" />
      <FloatingBackground />

      {/* İçerik */}
      <div className="container-lux relative z-10 py-24 text-center [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em", filter: "blur(6px)" }}
          animate={{ opacity: 1, letterSpacing: "0.32em", filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.span
          initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-black/25 p-2.5 backdrop-blur-sm"
        >
          <img
            src={logoNegative}
            alt={`${site.name} Logo`}
            className="h-full w-auto object-contain"
          />
        </motion.span>

        <h1 className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-x-3 text-4xl leading-[1.08] font-semibold text-white sm:text-5xl lg:text-6xl">
          {t.hero.title.split(" ").map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.25 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <LiquidMetalButton
            label={t.hero.cta}
            tone="red"
            onClick={() => navigate({ to: "/contact" })}
          />
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-white/10 px-7 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black"
          >
            {t.hero.secondary}
          </Link>
        </motion.div>
      </div>


      {/* Ses aç/kapat */}
      <button
        onClick={toggleMute}
        disabled={!canUnmute}
        aria-label={muted ? t.hero.soundOn : t.hero.soundOff}
        className="absolute right-6 bottom-6 z-10 flex items-center gap-2 rounded-full border border-white/40 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur-md transition-colors hover:bg-black/60 disabled:opacity-50"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        <span className="hidden sm:inline">{muted ? t.hero.soundOn : t.hero.soundOff}</span>
      </button>

      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-8 z-10 hidden flex-col items-center gap-2 text-[0.65rem] tracking-[0.3em] text-white/75 uppercase lg:flex"

      >
        {t.hero.scroll}
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-primary" />
        </motion.span>
      </motion.div>
    </section>
  );
}


