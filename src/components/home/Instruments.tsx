import { SectionHeading } from "@/components/common/SectionHeading";
import { OrbitCarousel, type OrbitItem } from "@/components/ui/orbiting-carousel";
import { instrumentKeys, type InstrumentKey } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";

import bouzouki from "@/assets/instr-bouzouki.jpg";
import clarinet from "@/assets/instr-clarinet.jpg";
import lyra from "@/assets/instr-lyra.jpg";
import ntaouli from "@/assets/instr-ntaouli.jpg";
import keyboard from "@/assets/instr-keyboard.jpg";
import microphone from "@/assets/instr-microphone.jpg";
import violin from "@/assets/instr-violin.jpg";

const images: Record<InstrumentKey, string> = {
  bouzouki,
  clarinet,
  lyra,
  ntaouli,
  keyboard,
  microphone,
  violin,
};

export function Instruments() {
  const { t } = useI18n();

  const items: OrbitItem[] = instrumentKeys.map((key) => ({
    id: key,
    name: t.instruments[key].name,
    desc: t.instruments[key].desc,
    image: images[key],
  }));

  return (
    <section id="instruments" className="border-t border-border py-16 lg:py-24">
      <div className="container-lux">
        <SectionHeading
          eyebrow={t.instruments.eyebrow}
          title={t.instruments.title}
          subtitle={t.instruments.subtitle}
        />

        <div className="mt-16 flex justify-center">
          <OrbitCarousel items={items} />
        </div>
      </div>
    </section>
  );
}
