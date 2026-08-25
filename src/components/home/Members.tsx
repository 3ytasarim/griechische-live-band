import { SectionHeading } from "@/components/common/SectionHeading";
import { FloatingBackground } from "@/components/common/FloatingBackground";
import { memberPhotos } from "@/data/media";
import { memberKeys } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";

export function Members() {
  const { t } = useI18n();

  return (
    <section id="band" className="relative overflow-hidden border-t border-border bg-surface py-16 lg:py-24">
      <FloatingBackground variant="dark" />
      <div className="container-lux relative z-10">
        <SectionHeading
          eyebrow={t.members.eyebrow}
          title={t.members.title}
          subtitle={t.members.subtitle}
          align="center"
        />
      </div>

      <div className="relative z-10 mx-auto mt-20 max-w-[96rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {memberKeys.map((key) => {
            const member = t.members[key];
            return (
              <article key={key} className="relative overflow-hidden rounded-md border border-border">
                <img
                  src={memberPhotos[key]}
                  alt={`${member.name} — ${member.role}`}
                  width={900}
                  height={1100}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="rounded-md border border-white/15 bg-black/55 p-4 backdrop-blur-md">
                    <h3 className="font-display text-xl font-semibold text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]">
                      {member.name}
                    </h3>
                    <p className="mt-1.5 text-[0.68rem] font-semibold tracking-[0.28em] text-red uppercase">
                      {member.role}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
