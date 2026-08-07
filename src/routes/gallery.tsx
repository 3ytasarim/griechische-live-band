import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import SphereImageGrid, { type ImageData } from "@/components/ui/img-sphere";
import { HeroSection } from "@/components/ui/hero-section-9";
import { GalleryVideo } from "@/components/gallery/GalleryVideo";
import { MeshGradientBackground } from "@/components/ui/mesh-gradient-background";
import { AnimatedEdgeLines } from "@/components/ui/animated-edge-lines";
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
  const [size, setSize] = useState(600);


  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setSize(Math.max(320, Math.min(960, w - 48)));
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
      <HeroSection
        className="border-b border-border pt-44 pb-20 lg:pt-52"
        eyebrow={t.gallery.eyebrow}
        title={t.gallery.title}
        subtitle={t.gallery.subtitle}
        images={[photos[0]!.src, photos[3]!.src, photos[8]!.src]}
      />
      <GalleryVideo />
      <section className="relative overflow-hidden py-16 lg:py-24">
        <MeshGradientBackground className="absolute inset-0 opacity-40" />
        <AnimatedEdgeLines />
        <div className="container-lux relative flex justify-center">
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

