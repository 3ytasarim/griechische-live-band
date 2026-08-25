import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Square {
  id: number;
  src: string;
}

const shuffle = (array: Square[]) => {
  const next = [...array];
  let currentIndex = next.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [next[currentIndex], next[randomIndex]] = [next[randomIndex], next[currentIndex]];
  }

  return next;
};

interface ShuffleGridProps {
  images: string[];
  columns?: number;
  rows?: number;
  shuffleInterval?: number;
  className?: string;
}

/** Grid of images that reshuffle position on an interval, animated via layout transitions. */
export function ShuffleGrid({
  images,
  columns = 4,
  rows = 3,
  shuffleInterval = 3000,
  className,
}: ShuffleGridProps) {
  const baseSquares = useRef<Square[]>(images.map((src, id) => ({ id, src }))).current;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [squares, setSquares] = useState(() => shuffle(baseSquares));

  useEffect(() => {
    const tick = () => {
      setSquares(shuffle(baseSquares));
      timeoutRef.current = setTimeout(tick, shuffleInterval);
    };
    timeoutRef.current = setTimeout(tick, shuffleInterval);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [baseSquares, shuffleInterval]);

  return (
    <div
      className={cn("grid gap-1.5", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
    >
      {squares.map((sq) => (
        <motion.div
          key={sq.id}
          layout
          transition={{ duration: 1.5, type: "spring" }}
          className="h-full w-full overflow-hidden rounded-md bg-muted"
          style={{
            backgroundImage: `url(${sq.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
    </div>
  );
}
