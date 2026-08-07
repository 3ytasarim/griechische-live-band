import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface OrbitIcon {
  id: string;
  src: string;
  alt: string;
  /** Starting angle in degrees. */
  angle: number;
}

export interface Orbit {
  /** Tailwind width/height classes, e.g. "w-110 h-110 md:w-180 md:h-180". */
  size: string;
  /** Full rotation duration in seconds. */
  duration: number;
  direction?: "cw" | "ccw";
  icons: OrbitIcon[];
}

interface OrbitingCirclesProps {
  orbits: Orbit[];
  activeId?: string;
  onSelect?: (id: string) => void;
  /** Rendered centered on the rings' shared origin point. */
  center?: ReactNode;
  className?: string;
}

/** Concentric rings of icons, each ring spinning independently while icons stay upright. */
export function OrbitingCircles({ orbits, activeId, onSelect, center, className }: OrbitingCirclesProps) {
  return (
    <div className={cn("relative flex w-full justify-center overflow-hidden", className)}>
      {center ? (
        <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">{center}</div>
      ) : null}

      {orbits.map((orbit, index) => {
        const isCW = (orbit.direction ?? (index % 2 === 0 ? "cw" : "ccw")) === "cw";
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        return (
          <div
            key={index}
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border",
              orbit.size,
            )}
          >
            {orbit.icons.map((icon) => {
              const isActive = icon.id === activeId;
              return (
                <div
                  key={icon.id}
                  className="absolute top-0 left-1/2 -ml-8 h-1/2 origin-bottom"
                  style={
                    {
                      "--start-angle": `${icon.angle}deg`,
                      animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                >
                  <div
                    style={
                      {
                        "--counter-offset": `${-icon.angle}deg`,
                        animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                      } as React.CSSProperties
                    }
                  >
                    <button
                      type="button"
                      onClick={() => onSelect?.(icon.id)}
                      aria-label={icon.alt}
                      className={cn(
                        "relative z-10 -mt-8 h-14 w-14 overflow-hidden rounded-full border-2 bg-card transition-colors duration-300 md:h-16 md:w-16",
                        isActive ? "border-primary shadow-lg" : "border-border hover:border-primary/60",
                      )}
                    >
                      <img
                        src={icon.src}
                        alt={icon.alt}
                        width={128}
                        height={128}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default OrbitingCircles;
