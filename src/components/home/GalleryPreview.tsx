import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { useI18n } from "@/i18n/I18nProvider";
import { LiquidMetalShell } from "@/components/ui/liquid-metal-button";

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
        <div className="mt-16">
          <ImageAutoSlider />
        </div>
        <Reveal className="mt-14 flex justify-center">
          <Link to="/gallery" className="inline-flex">
            <LiquidMetalShell variant="outline">
              {t.gallery.viewAll}
              <ArrowRight className="h-4 w-4" />
            </LiquidMetalShell>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
