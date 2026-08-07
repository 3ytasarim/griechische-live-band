import { createFileRoute } from "@tanstack/react-router";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";
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
      <section className="py-20 lg:py-28">
        <div className="container-lux">
          <MasonryGallery />
        </div>
      </section>
      <CallToAction />
    </>
  );
}
