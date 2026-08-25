"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Award,
  Calendar,
  CheckCircle,
  Music2,
  Users,
  Sparkles,
  Star,
  ArrowRight,
} from "lucide-react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { aboutPhoto } from "@/data/media";
import { useI18n } from "@/i18n/I18nProvider";
import { LiquidMetalShell } from "@/components/ui/liquid-metal-button";
import { useQuoteModal } from "@/components/layout/QuoteModalProvider";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function AboutUsSection() {
  const { t } = useI18n();
  const { openQuoteModal } = useQuoteModal();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -12]);

  const f = t.about.features;
  const services = [
    { ...f.f2, position: "left" as const },
    { ...f.f3, position: "left" as const },
    { ...f.f4, position: "right" as const },
    { ...f.f5, position: "right" as const },
  ];

  const stats = [
    {
      icon: <Calendar className="h-6 w-6" />,
      value: 15,
      label: t.stats.years,
      description: t.stats.yearsDesc,
      suffix: "+",
    },
    {
      icon: <Star className="h-6 w-6" />,
      value: 900,
      label: t.stats.events,
      description: t.stats.eventsDesc,
      suffix: "+",
    },
    {
      icon: <Users className="h-6 w-6" />,
      value: 5,
      label: t.stats.musicians,
      description: t.stats.musiciansDesc,
      suffix: "",
    },
    {
      icon: <Music2 className="h-6 w-6" />,
      value: 1500,
      label: t.stats.repertoire,
      description: t.stats.repertoireDesc,
      suffix: "+",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden border-t border-border py-20 lg:py-28"
    >
      {/* Decorative background elements */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="pointer-events-none absolute -top-10 -left-16 h-64 w-64 rounded-full bg-red/5 blur-3xl"
      />
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container-lux relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-red/30 bg-red/5 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-red uppercase"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t.about.eyebrow}
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="mt-6 text-4xl leading-[1.08] font-semibold text-balance whitespace-pre-line text-foreground sm:text-5xl"
          >
            {t.about.title}
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-red to-transparent"
          />

          <motion.p
            variants={itemVariants}
            className="mt-6 text-base leading-relaxed text-muted-foreground"
          >
            {t.about.p1}
          </motion.p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="order-2 space-y-10 lg:order-1">
            {services
              .filter((s) => s.position === "left")
              .map((s, i) => (
                <ServiceItem key={s.title} {...s} delay={i * 0.1} direction="left" />
              ))}
          </div>

          {/* Center image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] border border-red/20" />
              <div className="overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-elegant)]">
                <img
                  src={aboutPhoto.src}
                  alt={t.about.title}
                  width={1200}
                  height={1408}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red/30 bg-background/90 text-red shadow-[var(--shadow-red)] backdrop-blur"
              >
                <Music2 className="h-7 w-7" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-background/90 text-primary shadow-[var(--shadow-elegant)] backdrop-blur"
              >
                <Award className="h-7 w-7" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="order-3 space-y-10">
            {services
              .filter((s) => s.position === "right")
              .map((s, i) => (
                <ServiceItem key={s.title} {...s} delay={i * 0.1} direction="right" />
              ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-6 border-t border-border pt-14 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatCounter key={s.label} {...s} delay={i * 0.1} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-border bg-card/60 p-8 backdrop-blur md:flex-row md:p-10"
        >
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold text-foreground">{t.about.cta.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.about.cta.subtitle}</p>
          </div>
          <button type="button" onClick={openQuoteModal}>
            <LiquidMetalShell size="sm">
              {t.about.cta.button}
              <ArrowRight className="h-4 w-4" />
            </LiquidMetalShell>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceItem({
  title,
  description,
  delay,
  direction,
}: {
  title: string;
  description: string;
  delay: number;
  direction: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`group ${direction === "right" ? "lg:text-left" : "lg:text-right"}`}
    >
      <div
        className={`flex items-center gap-3 ${direction === "right" ? "" : "lg:flex-row-reverse"}`}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red/25 bg-red/5 text-red transition-colors duration-300 group-hover:bg-red group-hover:text-primary-foreground">
          <CheckCircle className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </motion.div>
  );
}

function StatCounter({
  icon,
  value,
  label,
  description,
  suffix,
  delay,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  description: string;
  suffix: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const spring = useSpring(0, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  useEffect(() => spring.on("change", (v) => setDisplay(Math.floor(v))), [spring]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center rounded-2xl border border-border bg-card/50 p-6 text-center transition-shadow duration-300 hover:shadow-[var(--shadow-elegant)]"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red/10 text-red">
        {icon}
      </span>
      <p className="font-display mt-4 text-3xl font-semibold text-foreground">
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-xs leading-snug tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground/80">{description}</p>
    </motion.div>
  );
}
