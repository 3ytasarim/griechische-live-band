"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type OrbitItem = {
  id: string;
  name: string;
  desc: string;
  image: string;
};

function useScreenSize() {
  const [size, setSize] = React.useState<"xs" | "sm" | "md" | "lg">("lg");

  React.useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 480) setSize("xs");
      else if (w < 640) setSize("sm");
      else if (w < 768) setSize("md");
      else setSize("lg");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return size;
}

const sizeMap = {
  xs: { radius: 138, thumb: 52, card: "w-44" },
  sm: { radius: 168, thumb: 60, card: "w-52" },
  md: { radius: 208, thumb: 68, card: "w-60" },
  lg: { radius: 275, thumb: 84, card: "w-72" },
} as const;

export function OrbitCarousel({ items }: { items: OrbitItem[] }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const screen = useScreenSize();
  const { radius, thumb, card } = sizeMap[screen];
  const containerSize = radius * 2 + thumb + 24;

  const next = React.useCallback(
    () => setActiveIndex((i) => (i + 1) % items.length),
    [items.length],
  );
  const prev = React.useCallback(
    () => setActiveIndex((i) => (i - 1 + items.length) % items.length),
    [items.length],
  );

  React.useEffect(() => {
    if (isHovering) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [isHovering, next]);

  const active = items[activeIndex]!;

  return (
    <div
      className="flex w-full flex-col items-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="relative"
        style={{ width: containerSize, height: containerSize, maxWidth: "100%" }}
      >
        {/* orbit ring */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div
            className="rounded-full border border-dashed border-border"
            style={{ width: radius * 2, height: radius * 2 }}
          />
        </div>

        {/* center card */}
        <div className="absolute inset-0 z-20 grid place-items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`${card} rounded-2xl border border-border bg-card/95 p-5 text-center shadow-xl backdrop-blur`}
            >
              <img
                src={active.image}
                alt={active.name}
                width={768}
                height={768}
                loading="lazy"
                decoding="async"
                className="mx-auto h-20 w-20 rounded-full object-cover ring-2 ring-primary/60"
              />
              <h3 className="mt-4 font-display text-lg font-semibold text-primary">
                {active.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{active.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* orbiting thumbs */}
        {items.map((item, i) => {
          const rotation = (i - activeIndex) * (360 / items.length);
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={item.id}
              className="absolute top-1/2 left-1/2 z-10"
              style={{ width: thumb, height: thumb, marginLeft: -thumb / 2, marginTop: -thumb / 2 }}
              animate={{ rotate: rotation }}
              transition={{ type: "spring", stiffness: 60, damping: 16 }}
            >
              <div style={{ transform: `translateY(-${radius}px)` }} className="h-full w-full">
                <motion.div animate={{ rotate: -rotation }} className="h-full w-full">
                  <motion.button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={item.name}
                    className={`h-full w-full overflow-hidden rounded-full border-2 bg-card transition-colors duration-300 ${
                      isActive
                        ? "border-primary shadow-lg"
                        : "border-border hover:border-primary/60"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      width={768}
                      height={768}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* controls */}
      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={item.name}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === activeIndex ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Next"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default OrbitCarousel;
