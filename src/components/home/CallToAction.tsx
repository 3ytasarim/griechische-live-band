import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { photos } from "@/data/media";
import { Reveal } from "@/components/common/Reveal";
import { site } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { btnGold, btnOutline } from "@/lib/ui";

export function CallToAction() {
  const { t } = useI18n();

  return (
    <section className="relative isolate overflow-hidden border-t border-border">
      <img
        src={photos[3]!.src}
        alt=""
        aria-hidden
        width={1400}
        height={800}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-background/85" />

      <div className="container-lux py-20 text-center lg:py-28">
        <Reveal>
          <p className="eyebrow">{t.cta.eyebrow}</p>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl leading-[1.08] font-semibold text-balance text-red sm:text-6xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t.cta.text}
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={btnGold}
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t.cta.whatsapp}
            </a>
            <a href={site.phoneHref} className={btnOutline}>
              <Phone className="h-4 w-4" />
              {t.cta.call}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
