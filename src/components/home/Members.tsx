import { motion } from "motion/react";
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

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {memberKeys.map((key, i) => {
            const member = t.members[key];
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-md border border-border"
              >
                <img
                  src={memberPhotos[key]}
                  alt={`${member.name} — ${member.role}`}
                  width={900}
                  height={1100}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-lux)] group-hover:scale-105"
                />
                {/* Alt bilgi paneli: kayarak açılan koyu cam panel */}
                <div className="absolute inset-x-0 bottom-0 translate-y-0 p-4">
                  <div className="rounded-md border border-white/15 bg-black/55 p-4 backdrop-blur-md transition-all duration-500 ease-[var(--ease-lux)] group-hover:bg-black/70">
                    <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-red uppercase">
                      {member.role}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-500 group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100">
                      {member.bio}
                    </p>
                  </div>
                </div>

              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
