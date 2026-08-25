import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { IPhoneMockup } from "@/components/ui/iphone-mockup";
import { FloatingBackground } from "@/components/common/FloatingBackground";
import galleryVideoSrc from "@/assets/gallery-video.mp4";
import galleryVideoPoster from "@/assets/gallery-video-poster.jpg";

/** Portrait showcase clip in a real iPhone frame — autoplays muted, viewer can turn sound on. */
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
    <section className="relative overflow-hidden border-b border-border py-16 lg:py-24">
      <FloatingBackground variant="dark" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-fit"
      >
        <IPhoneMockup model="15-pro" color="black" shadow="0 40px 90px -40px rgba(0,0,0,0.55)">
          <div className="relative h-full w-full">
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
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_45%,rgba(0,0,0,0.4)_100%)]" />

            {/* Ses aç/kapat */}
            <button
              type="button"
              onClick={toggleMute}
              disabled={!canUnmute}
              aria-label={muted ? t.hero.soundOn : t.hero.soundOff}
              className="absolute right-3 bottom-10 flex items-center gap-2 rounded-full border border-white/40 bg-black/50 px-3 py-2 text-xs text-white backdrop-blur-md transition-colors hover:bg-black/70 disabled:opacity-50"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              <span className="hidden sm:inline">{muted ? t.hero.soundOn : t.hero.soundOff}</span>
            </button>
          </div>
        </IPhoneMockup>
      </motion.div>
    </section>
  );
}
