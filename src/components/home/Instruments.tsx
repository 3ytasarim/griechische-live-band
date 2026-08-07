import { motion } from "motion/react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { InstrumentIcon, type InstrumentIconName } from "@/components/common/InstrumentIcon";
import { instrumentKeys, type InstrumentKey } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";

const tones: Record<InstrumentKey, string> = {
  bouzouki: "text-instrument-1",
  clarinet: "text-instrument-2",
  lyra: "text-instrument-3",
  ntaouli: "text-instrument-4",
  keyboard: "text-instrument-5",
  microphone: "text-instrument-6",
  violin: "text-instrument-7",
};

export function Instruments() {
  const { t } = useI18n();

  return (
    <section id="instruments" className="border-t border-border py-16 lg:py-24">
      <div className="container-lux">
        <SectionHeading
          eyebrow={t.instruments.eyebrow}
          title={t.instruments.title}
          subtitle={t.instruments.subtitle}
        />

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {instrumentKeys.map((key, i) => {
            const item = t.instruments[key];
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-md border border-border bg-card p-8 transition-colors duration-500 hover:border-primary/50"
              >
                <span className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
                <InstrumentIcon
                  name={key as InstrumentIconName}
                  className={`h-12 w-12 ${tones[key]} transition-transform duration-500 group-hover:-translate-y-1`}
                />
                <h3 className="mt-8 font-display text-xl font-semibold text-red">{item.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
