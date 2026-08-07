import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import { photos } from "@/data/media";
import { useI18n } from "@/i18n/I18nProvider";

export function Lightbox({
  index,
  onClose,
  onNavigate,
}: {
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onNavigate]);

  const photo = index === null ? null : photos[index];

  return (
    <AnimatePresence>
      {photo ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-background/95 p-4 backdrop-blur-xl"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label={t.gallery.lightboxClose}
            onClick={onClose}
            className="absolute top-6 right-6 rounded-full border border-border p-3 transition-colors hover:border-primary/60 hover:text-primary"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label={t.gallery.prev}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index! - 1 + photos.length) % photos.length);
            }}
            className="absolute left-4 rounded-full border border-border p-3 transition-colors hover:border-primary/60 hover:text-primary md:left-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <motion.figure
            key={photo.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[86vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photo.src}
              alt={t.gallery.photos[photo.captionKey]}
              width={photo.width}
              height={photo.height}
              className="max-h-[78vh] w-auto rounded-md object-contain shadow-[var(--shadow-elegant)]"
            />
            <figcaption className="mt-4 text-center text-sm text-muted-foreground">
              {t.gallery.photos[photo.captionKey]}
            </figcaption>
          </motion.figure>

          <button
            type="button"
            aria-label={t.gallery.next}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index! + 1) % photos.length);
            }}
            className="absolute right-4 rounded-full border border-border p-3 transition-colors hover:border-primary/60 hover:text-primary md:right-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
