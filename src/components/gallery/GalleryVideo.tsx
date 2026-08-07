import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import galleryVideoSrc from "@/assets/gallery-video.mp4";
import galleryVideoPoster from "@/assets/gallery-video-poster.jpg";

/** Portrait showcase clip — autoplays muted, viewer can turn sound on. */
export function GalleryVideo() {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [canUnmute, setCanUnmute] = useState(true);

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
    <section className="border-b border-border py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-sm px-6 [perspective:1400px] sm:max-w-md"
      >
        {/* Sahne gövdesi */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0f18] p-3 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.65)]">
          {/* Spot ışıkları */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-6 h-[26rem] w-40 origin-top blur-2xl"
            style={{
              background:
                "linear-gradient(to bottom, color-mix(in oklab, white 55%, transparent), transparent 75%)",
              clipPath: "polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)",
              animation: "stage-beam 7s ease-in-out infinite",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-6 h-[26rem] w-40 origin-top blur-2xl"
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
          <div className="relative z-10 aspect-[9/16] overflow-hidden rounded-[1.4rem] border border-white/10">
            <video
              ref={videoRef}
              src={galleryVideoSrc}
              poster={galleryVideoPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_45%,rgba(0,0,0,0.45)_100%)]" />

            {/* Ses aç/kapat */}
            <button
              type="button"
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
      </motion.div>
    </section>
  );
}
