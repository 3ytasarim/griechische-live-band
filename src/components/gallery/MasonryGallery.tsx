import { motion } from "motion/react";
import { Expand } from "lucide-react";
import { useState } from "react";
import { photos } from "@/data/media";
import { useI18n } from "@/i18n/I18nProvider";
import { Lightbox } from "./Lightbox";

export function MasonryGallery({ limit }: { limit?: number }) {
  const { t } = useI18n();
  const [active, setActive] = useState<number | null>(null);
  const items = typeof limit === "number" ? photos.slice(0, limit) : photos;

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {items.map((photo, i) => (
          <motion.button
            key={photo.src}
            type="button"
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative block w-full overflow-hidden rounded-md border border-border text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <img
              src={photo.src}
              alt={t.gallery.photos[photo.captionKey]}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
              className="w-full transition-transform duration-[900ms] ease-[var(--ease-lux)] group-hover:scale-[1.06]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              <span className="translate-y-2 text-sm font-medium opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {t.gallery.photos[photo.captionKey]}
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/60 text-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Expand className="h-4 w-4" />
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <Lightbox index={active} onClose={() => setActive(null)} onNavigate={setActive} />
    </>
  );
}
