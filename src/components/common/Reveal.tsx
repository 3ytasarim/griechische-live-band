import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale";

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 36 },
  left: { x: -44 },
  right: { x: 44 },
  scale: { scale: 0.94 },
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, ...offsets[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
