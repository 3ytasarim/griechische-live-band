import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import AboutUsSection from "@/components/ui/about-us-section";
import { Members } from "@/components/home/Members";
import { Instruments } from "@/components/home/Instruments";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Faq } from "@/components/home/Faq";
import { CallToAction } from "@/components/home/CallToAction";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Griechische Live Band für Events & Hochzeiten | Empnefsi Live" },
      {
        name: "description",
        content:
          "Empnefsí Live – griechische Live-Musik für Hochzeiten, Firmenfeiern und besondere Veranstaltungen. Authentisch, energiegeladen und mit Leidenschaft für echte griechische Stimmung.",
      },
      {
        property: "og:title",
        content: "Griechische Live Band für Events & Hochzeiten | Empnefsi Live",
      },
      {
        property: "og:description",
        content:
          "Empnefsí Live – griechische Live-Musik für Hochzeiten, Firmenfeiern und besondere Veranstaltungen. Authentisch, energiegeladen und mit Leidenschaft für echte griechische Stimmung.",
      },
      { property: "og:url", content: "https://griechischeband.de/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://griechischeband.de/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <h1 className="sr-only">Professionelle griechische Live Band für Hochzeiten und Galas</h1>
      <Hero />
      <AboutUsSection />
      <Members />
      <Instruments />
      <GalleryPreview />
      <CallToAction />
      <Faq />
    </>
  );
}
