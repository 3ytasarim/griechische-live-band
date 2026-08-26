import { createFileRoute } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { CallToAction } from "@/components/home/CallToAction";
import { Reveal } from "@/components/common/Reveal";
import { FloatingBackground } from "@/components/common/FloatingBackground";
import { HeroSection } from "@/components/ui/hero-section-9";
import { site } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontakt | Griechische Live Band buchen" },
      {
        name: "description",
        content:
          "Kontaktieren Sie unsere griechische Live Band per WhatsApp, Telefon oder E-Mail und sichern Sie sich Ihren Wunschtermin.",
      },
      { property: "og:title", content: "Kontakt | Griechische Live Band buchen" },
      {
        property: "og:description",
        content: "WhatsApp, Telefon oder E-Mail — wir melden uns kurzfristig mit einem Angebot.",
      },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: site.name,
          telephone: site.phone,
          email: site.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address,
            addressLocality: site.city,
            addressCountry: "DE",
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();

  const cards = [
    {
      icon: WhatsAppIcon,
      label: t.contact.whatsapp,
      value: "WhatsApp Chat",
      href: site.whatsapp,
      external: true,
    },
    { icon: Phone, label: t.contact.phone, value: site.phone, href: site.phoneHref },
    { icon: Mail, label: t.contact.email, value: site.email, href: `mailto:${site.email}` },
    {
      icon: Instagram,
      label: t.contact.instagram,
      value: "Empnefsi_Live_Official",
      href: site.instagram,
      external: true,
    },
    {
      icon: Facebook,
      label: t.contact.facebook,
      value: "Empnefsi Live",
      href: site.facebook,
      external: true,
    },
    { icon: MapPin, label: t.contact.location, value: site.address, href: site.mapsLink, external: true },
  ];

  return (
    <>
      <HeroSection
        className="border-b border-border pt-44 pb-20 lg:pt-52"
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
      />

      <section className="relative overflow-hidden py-24 lg:py-32">
        <FloatingBackground variant="dark" />
        <div className="container-lux relative z-10">
          <div className="mx-auto max-w-xl space-y-4">
            {cards.map((card, i) => (
              <Reveal key={card.label} delay={i * 0.08}>
                <a
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-5 rounded-md border border-border bg-card p-6 transition-colors duration-500 hover:border-primary/50"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="eyebrow block">{card.label}</span>
                    <span className="mt-2 block text-base font-medium">{card.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.32}>
              <div className="flex items-start gap-5 rounded-md border border-border bg-card p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary">
                  <Clock className="h-5 w-5" />
                </span>
                <span>
                  <span className="eyebrow block">{t.contact.hours}</span>
                  <span className="mt-2 block text-base font-medium">{t.contact.hoursValue}</span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
