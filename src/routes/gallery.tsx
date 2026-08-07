import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import SphereImageGrid, { type ImageData } from "@/components/ui/img-sphere";
import { photos } from "@/data/media";
import { CallToAction } from "@/components/home/CallToAction";
import { SectionHeading } from "@/components/common/SectionHeading";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Galerie | Griechische Live Band" },
      {
        name: "description",
        content:
          "Fotos unserer Auftritte: Hochzeiten, Galas, Festivals und Firmenfeiern mit griechischer Live-Musik.",
      },
      { property: "og:title", content: "Galerie | Griechische Live Band" },
      {
        property: "og:description",
        content: "Eindrücke von Hochzeiten, Galas und Festabenden mit unserer griechischen Band.",
      },
      { property: "og:url", content: "/gallery" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { t } = useI18n();
  const [size, setSize] = useState(600);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setSize(Math.max(320, Math.min(720, w - 48)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const images: ImageData[] = useMemo(
    () =>
      photos.map((photo, i) => ({
        id: `photo-${i}`,
        src: photo.src,
        alt: t.gallery.photos[photo.captionKey],
        title: t.gallery.photos[photo.captionKey],
      })),
    [t],
  );

  return (
    <>
      <section className="border-b border-border pt-44 pb-20 lg:pt-52">
        <div className="container-lux">
          <SectionHeading
            eyebrow={t.gallery.eyebrow}
            title={t.gallery.title}
            subtitle={t.gallery.subtitle}
          />
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="container-lux flex justify-center">
          <SphereImageGrid
            images={images}
            containerSize={size}
            sphereRadius={size * 0.36}
            baseImageScale={0.17}
            autoRotate
            autoRotateSpeed={0.2}
          />
        </div>
      </section>
      <CallToAction />
    </>
  );
}
