import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Members } from "@/components/home/Members";
import { Instruments } from "@/components/home/Instruments";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { CallToAction } from "@/components/home/CallToAction";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Griechische Live Band | Hochzeiten, Galas & Firmenfeiern" },
      {
        name: "description",
        content:
          "Professionelle griechische Live Band für Hochzeiten, Firmenfeiern und Galas. Authentische Musik, erstklassige Musiker, deutschlandweit buchbar.",
      },
      {
        property: "og:title",
        content: "Griechische Live Band | Hochzeiten, Galas & Firmenfeiern",
      },
      {
        property: "og:description",
        content:
          "Live-Musik, die Ihren Abend zum Konzert macht — griechische Live Band für Hochzeiten, Galas und Firmenfeiern.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <h1 className="sr-only">Professionelle griechische Live Band für Hochzeiten und Galas</h1>
      <Hero />
      <About />
      <Members />
      <Instruments />
      <GalleryPreview />
      <CallToAction />
    </>
  );
}
