import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ShuffleGrid } from "@/components/ui/shuffle-grid";
import { HeroSection } from "@/components/ui/hero-section-9";
import { GalleryVideo } from "@/components/gallery/GalleryVideo";
import { MeshGradientBackground } from "@/components/ui/mesh-gradient-background";
import { AnimatedEdgeLines } from "@/components/ui/animated-edge-lines";
import SphereImageGrid, { type ImageData } from "@/components/ui/img-sphere";
import { photos } from "@/data/media";
import { CallToAction } from "@/components/home/CallToAction";
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

  const [sphereSize, setSphereSize] = useState(420);
  useEffect(() => {
    const update = () => setSphereSize(Math.max(280, Math.min(480, window.innerWidth * 0.32)));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const sphereImages: ImageData[] = useMemo(
    () =>
      photos.map((photo, i) => ({
        id: `gallery-hero-photo-${i}`,
        src: photo.src,
        alt: t.gallery.photos[photo.captionKey],
        title: t.gallery.photos[photo.captionKey],
        description: t.gallery.tags[photo.captionKey],
      })),
    [t],
  );

  return (
    <>
      <HeroSection
        className="border-b border-border pt-44 pb-20 lg:pt-52"
        eyebrow={t.gallery.eyebrow}
        title={t.gallery.title}
        subtitle={t.gallery.subtitle}
        showNotes={false}
        rightSlot={
          <SphereImageGrid
            images={sphereImages}
            containerSize={sphereSize}
            sphereRadius={sphereSize * 0.44}
            baseImageScale={0.16}
            autoRotate
            autoRotateSpeed={0.2}
          />
        }
      />
      <GalleryVideo />
      <section className="relative overflow-hidden py-16 lg:py-24">
        <MeshGradientBackground className="absolute inset-0 opacity-40" />
        <AnimatedEdgeLines />
        <div className="container-lux relative">
          <ShuffleGrid
            images={photos.map((p) => p.src)}
            columns={5}
            rows={3}
            className="h-[480px] sm:h-[560px] lg:h-[640px]"
          />
        </div>
      </section>
      <CallToAction />
    </>
  );
}

