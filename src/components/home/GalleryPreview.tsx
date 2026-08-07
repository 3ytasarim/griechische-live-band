import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { useI18n } from "@/i18n/I18nProvider";
import { btnOutline } from "@/lib/ui";

export function GalleryPreview() {
  const { t } = useI18n();

  return (
    <section className="border-t border-border bg-surface py-16 lg:py-24">
      <div className="container-lux">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
          align="center"
        />
        <div className="mt-20">
          <MasonryGallery limit={6} />
        </div>
        <Reveal className="mt-14 flex justify-center">
          <Link to="/gallery" className={btnOutline}>
            {t.gallery.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
