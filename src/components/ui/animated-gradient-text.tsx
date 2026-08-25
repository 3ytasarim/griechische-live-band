import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Pill badge with a slowly shimmering gradient border. */
export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-full bg-black/30 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%]",
        className,
      )}
    >
      <div
        className="animate-[gradient_8s_linear_infinite] absolute inset-0 block h-full w-full bg-gradient-to-r from-[var(--red)]/60 via-white/50 to-[var(--red)]/60 bg-[length:var(--bg-size)_100%] p-px [border-radius:inherit] [mask-composite:subtract] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]"
      />

      {children}
    </div>
  );
}
