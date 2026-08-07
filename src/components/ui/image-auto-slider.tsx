import { photos } from "@/data/media";
import { useI18n } from "@/i18n/I18nProvider";

export function ImageAutoSlider() {
  const { t } = useI18n();
  const duplicated = [...photos, ...photos];

  return (
    <div className="scroll-container relative w-full overflow-hidden">
      <div className="infinite-scroll flex w-max">
        {duplicated.map((photo, index) => (
          <div
            key={`${photo.src}-${index}`}
            className="image-item mx-3 h-64 w-44 shrink-0 overflow-hidden rounded-xl border border-border shadow-elegant sm:h-80 sm:w-56 lg:h-96 lg:w-72"
          >
            <img
              src={photo.src}
              alt={t.gallery.photos[photo.captionKey]}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
