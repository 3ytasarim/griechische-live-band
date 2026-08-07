import { Check } from "lucide-react";
import { aboutPhoto } from "@/data/media";
import { Reveal } from "@/components/common/Reveal";
import { useI18n } from "@/i18n/I18nProvider";

export function About() {
  const { t } = useI18n();
  const bullets = [t.about.bullet1, t.about.bullet2, t.about.bullet3, t.about.bullet4];
  const stats = [
    { value: "20+", label: t.stats.years },
    { value: "800+", label: t.stats.events },
    { value: "8", label: t.stats.musicians },
    { value: "500+", label: t.stats.repertoire },
  ];

  return (
    <section id="about" className="border-t border-border py-16 lg:py-24">
      <div className="container-lux grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal direction="left">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-md border border-primary/20" />
            <img
              src={aboutPhoto.src}
              alt={t.about.title}
              width={1200}
              height={1408}
              loading="lazy"
              decoding="async"
              className="w-full rounded-md object-cover shadow-[var(--shadow-elegant)]"
            />
          </div>
        </Reveal>

        <div>
          <Reveal direction="right">
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 className="mt-5 text-4xl leading-[1.1] font-semibold text-balance text-red sm:text-5xl">
              {t.about.title}
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/50 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="up" delay={0.25}>
            <dl className="mt-14 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl font-semibold text-primary">{s.value}</dt>
                  <dd className="mt-2 text-xs leading-snug tracking-wide text-muted-foreground uppercase">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
