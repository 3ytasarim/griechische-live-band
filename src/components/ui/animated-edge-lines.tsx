import { cn } from "@/lib/utils";

interface AnimatedEdgeLinesProps {
  className?: string;
}

const lines = [
  { side: "left" as const, offset: "0%", duration: 4, delay: 0 },
  { side: "left" as const, offset: "2.5%", duration: 5, delay: 1.5 },
  { side: "right" as const, offset: "0%", duration: 4, delay: 2 },
  { side: "right" as const, offset: "2.5%", duration: 5, delay: 0.5 },
];

/** Thin glowing vertical light-sweeps along the left/right edges of a section. */
export function AnimatedEdgeLines({ className }: AnimatedEdgeLinesProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          className="absolute top-0 h-full w-px overflow-hidden"
          style={{ [line.side]: line.offset }}
        >
          <div
            className="absolute inset-x-0 h-full"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, var(--red) 20%, white 50%, var(--red) 80%, transparent 100%)",
              animation: `edge-line-sweep ${line.duration}s linear infinite`,
              animationDelay: `${line.delay}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
