import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline";

/** Brand-red palette fed to the liquid-metal shader. */
const palette: Record<Variant, { back: number[]; tint: number[] }> = {
  solid: { back: [0.35, 0.02, 0.02, 1], tint: [0.88, 0.16, 0.12, 1] },
  outline: { back: [1, 0.97, 0.96, 1], tint: [0.92, 0.35, 0.3, 1] },
};

const styleId = "liquid-metal-canvas-style";
const canvasStyle = `
.liquid-metal-shader canvas {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  border-radius: 100px !important;
}
@property --liquid-border-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
@keyframes liquid-metal-border {
  to { --liquid-border-angle: 360deg; }
}
.liquid-metal-border {
  background: conic-gradient(
    from var(--liquid-border-angle),
    transparent 0deg,
    transparent 205deg,
    var(--red) 248deg,
    white 286deg,
    var(--red) 318deg,
    transparent 360deg
  );
  animation: liquid-metal-border 2.4s linear infinite;
}
.liquid-metal-button:hover .liquid-metal-border {
  animation-duration: 1.15s;
}
@keyframes liquid-metal-ripple {
  0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
}
`;

interface LiquidMetalShellProps {
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
}

/** Pill-shaped liquid-metal surface: animated WebGL shader + glass sheen + click ripples. */
export function LiquidMetalShell({
  children,
  variant = "solid",
  size = "md",
  className,
}: LiquidMetalShellProps) {
  const shaderRef = useRef<HTMLSpanElement>(null);
  const hostRef = useRef<HTMLSpanElement>(null);
  const mountRef = useRef<{ destroy?: () => void; setSpeed?: (s: number) => void } | null>(null);
  const rippleId = useRef(0);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    if (!document.getElementById(styleId)) {
      const el = document.createElement("style");
      el.id = styleId;
      el.textContent = canvasStyle;
      document.head.appendChild(el);
    }

    const host = shaderRef.current;
    if (!host) return;

    try {
      mountRef.current = new ShaderMount(
        host as unknown as HTMLElement,
        liquidMetalFragmentShader,
        {
          u_colorBack: palette[variant].back,
          u_colorTint: palette[variant].tint,
          u_repetition: 4,
          u_softness: 0.5,
          u_shiftRed: 0.3,
          u_shiftBlue: 0.3,
          u_distortion: 0,
          u_contour: 0,
          u_angle: 45,
          u_scale: 8,
          u_shape: 1,
          u_offsetX: 0.1,
          u_offsetY: -0.1,
        },
        undefined,
        0.6,
      ) as never;
    } catch {
      // WebGL unavailable — the CSS fallback background stays visible.
    }

    return () => {
      mountRef.current?.destroy?.();
      mountRef.current = null;
    };
  }, [variant]);

  const enter = () => {
    setHovered(true);
    mountRef.current?.setSpeed?.(1);
  };

  const leave = () => {
    setHovered(false);
    setPressed(false);
    mountRef.current?.setSpeed?.(0.6);
  };

  const click = (e: React.MouseEvent) => {
    mountRef.current?.setSpeed?.(2.4);
    setTimeout(() => mountRef.current?.setSpeed?.(hovered ? 1 : 0.6), 300);

    const rect = hostRef.current?.getBoundingClientRect();
    if (rect) {
      const ripple = { x: e.clientX - rect.left, y: e.clientY - rect.top, id: rippleId.current++ };
      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)), 600);
    }
  };

  return (
    <span
      ref={hostRef}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={click}
      className={cn(
        "liquid-metal-button group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full p-[2px] text-sm font-semibold tracking-wide transition-all duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        "bg-foreground text-background",
        hovered && "-translate-y-0.5 shadow-[var(--shadow-red)]",
        pressed && "translate-y-0 scale-[0.97]",
        className,
      )}
    >
      {/* The shader and rotating highlight are clipped to the thin outer frame. */}
      <span
        ref={shaderRef}
        aria-hidden
        className="liquid-metal-shader pointer-events-none absolute inset-0 overflow-hidden rounded-full"
      />
      <span aria-hidden className="liquid-metal-border pointer-events-none absolute inset-0 rounded-full" />

      {/* Opaque center masks the shader so the liquid motion travels around the frame. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-[2px] rounded-full",
          variant === "solid" ? "bg-foreground" : "bg-background",
        )}
      />

      {/* Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          className="pointer-events-none absolute z-20 h-16 w-16 rounded-full bg-background/40"
          style={{
            left: r.x,
            top: r.y,
            animation: "liquid-metal-ripple 0.6s ease-out forwards",
          }}
        />
      ))}

      <span
        className={cn(
          "relative z-30 inline-flex items-center justify-center gap-2 rounded-full",
          size === "sm" ? "px-4 py-2 text-xs" : "px-7 py-3.5",
          variant === "solid" ? "text-background" : "text-foreground",
        )}
      >
        {children}
      </span>
    </span>
  );
}
