import { motion } from "motion/react";
import { InstrumentIcon, type InstrumentIconName } from "@/components/common/InstrumentIcon";

interface FloatItem {
  name: InstrumentIconName;
  left: number;
  size: number;
  duration: number;
  delay: number;
  /** horizontal sway in px */
  sway: number;
  rotate: number;
  opacity: number;
}

const names: InstrumentIconName[] = [
  "bouzouki",
  "clarinet",
  "microphone",
  "keyboard",
  "ntaouli",
  "violin",
  "lyra",
];

/**
 * Deterministic layout (no randomness) so SSR and hydration match.
 * Icons rise from below the hero and dissolve near the top.
 */
const items: FloatItem[] = Array.from({ length: 24 }, (_, i) => {
  const s = (i * 37) % 100; // deterministic pseudo-random seed
  return {
    name: names[i % names.length]!,
    left: 2 + ((i * 41) % 96),
    size: 34 + (s % 5) * 14,
    duration: 22 + (s % 9) * 3,
    delay: (i * 1.7) % 20,
    sway: ((i % 2 === 0 ? 1 : -1) * (20 + (s % 6) * 12)),
    rotate: (i % 2 === 0 ? 1 : -1) * (8 + (s % 4) * 5),
    opacity: 0.18 + (s % 5) * 0.05,
  };
});

interface FloatingBackgroundProps {
  variant?: "colorful" | "dark";
}

export function FloatingBackground({ variant = "colorful" }: FloatingBackgroundProps) {
  const isDark = variant === "dark";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((item, i) => {
        const colorClass = isDark
          ? "text-foreground opacity-10"
          : `text-instrument-${(i % 7) + 1} drop-shadow-[0_0_18px_rgba(217,181,90,0.35)]`;
        return (
          <motion.div
            key={i}
            className={`absolute bottom-0 ${colorClass}`}
            style={{ left: `${item.left}%`, fontSize: item.size }}
            initial={{ y: "10vh", x: 0, rotate: 0, opacity: 0 }}
            animate={{
              y: ["10vh", "-115vh"],
              x: [0, item.sway, -item.sway, 0],
              rotate: [0, item.rotate, -item.rotate, 0],
              opacity: [0, item.opacity, item.opacity, 0],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              opacity: {
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.12, 0.7, 1],
              },
              x: {
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <InstrumentIcon name={item.name} className="h-[1em] w-[1em]" />
          </motion.div>
        );
      })}
    </div>
  );
}
