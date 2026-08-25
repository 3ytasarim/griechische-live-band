import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/cnippet-accordion";
import { Reveal } from "@/components/common/Reveal";
import { useI18n } from "@/i18n/I18nProvider";

export function Faq() {
  const { t } = useI18n();
  const f = t.faq;
  const items = [
    { value: "q1", trigger: f.q1, content: f.a1 },
    { value: "q2", trigger: f.q2, content: f.a2 },
    { value: "q3", trigger: f.q3, content: f.a3 },
    { value: "q4", trigger: f.q4, content: f.a4 },
    { value: "q5", trigger: f.q5, content: f.a5 },
    { value: "q6", trigger: f.q6, content: f.a6 },
    { value: "q7", trigger: f.q7, content: f.a7 },
    { value: "q8", trigger: f.q8, content: f.a8 },
    { value: "q9", trigger: f.q9, content: f.a9 },
    { value: "q10", trigger: f.q10, content: f.a10 },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.trigger,
      acceptedAnswer: { "@type": "Answer", text: i.content },
    })),
  };

  return (
    <section id="faq" className="border-t border-border py-16 lg:py-24">
      <div className="container-lux">
        <Reveal direction="up">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{f.eyebrow}</p>
            <h2 className="mt-5 text-4xl leading-[1.1] font-semibold text-balance text-foreground sm:text-5xl">
              {f.title}
            </h2>
            <p className="mt-5 text-base text-muted-foreground">{f.subtitle}</p>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-card/60 px-6 shadow-[var(--shadow-elegant)] backdrop-blur-sm sm:px-10">
            <Accordion className="w-full">
              {items.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger>{item.trigger}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
