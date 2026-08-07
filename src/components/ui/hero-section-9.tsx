import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type React from "react";

interface HeroSectionProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  images: string[];
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
};

/** Split hero: centered title/subtitle on the left, a proportioned photo collage on the right. */
export function HeroSection({ eyebrow, title, subtitle, images, className }: HeroSectionProps) {
  return (
    <section className={cn("w-full overflow-hidden", className)}>
      <div className="container-lux grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
        {/* Sol: metin (ortalı) */}
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {eyebrow ? (
            <motion.p className="eyebrow" variants={itemVariants}>
              {eyebrow}
            </motion.p>
          ) : null}
          <motion.h1
            className="mt-5 text-4xl leading-[1.08] font-semibold text-balance text-foreground sm:text-5xl"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          {subtitle ? (
            <motion.p
              className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
          ) : null}
        </motion.div>

        {/* Sağ: fotoğraf kolajı */}
        <motion.div
          className="relative h-[400px] w-full sm:h-[500px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Dekoratif şekiller — site renkleri */}
          <motion.div
            className="absolute -top-4 left-1/4 h-16 w-16 rounded-full bg-[var(--gold)]/25"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div
            className="absolute right-1/4 bottom-0 h-12 w-12 rounded-lg bg-[var(--red)]/20"
            variants={floatingVariants}
            animate="animate"
            style={{ transitionDelay: "0.5s" }}
          />
          <motion.div
            className="absolute bottom-1/4 left-4 h-6 w-6 rounded-full bg-[var(--gold)]/30"
            variants={floatingVariants}
            animate="animate"
            style={{ transitionDelay: "1s" }}
          />

          {/* Fotoğraflar */}
          <motion.div
            className="absolute top-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-2xl bg-muted p-2 shadow-lg sm:h-64 sm:w-64"
            style={{ transformOrigin: "bottom center" }}
            variants={imageVariants}
          >
            <img
              src={images[0]}
              alt=""
              className="h-full w-full rounded-xl object-cover"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-0 h-40 w-40 rounded-2xl bg-muted p-2 shadow-lg sm:h-56 sm:w-56"
            style={{ transformOrigin: "left center" }}
            variants={imageVariants}
          >
            <img
              src={images[1]}
              alt=""
              className="h-full w-full rounded-xl object-cover"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 h-32 w-32 rounded-2xl bg-muted p-2 shadow-lg sm:h-48 sm:w-48"
            style={{ transformOrigin: "top right" }}
            variants={imageVariants}
          >
            <img
              src={images[2]}
              alt=""
              className="h-full w-full rounded-xl object-cover"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
