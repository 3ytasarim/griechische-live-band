import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

export function NavBar({ items, className }: { items: NavItem[]; className?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className={cn("flex items-center gap-1 rounded-full border border-border/60 bg-surface/80 px-1 py-1 backdrop-blur", className)}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);

        return (
          <Link
            key={item.name}
            to={item.url}
            className={cn(
              "relative cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors",
              "text-foreground/70 hover:text-red",
              isActive && "text-red",
            )}
          >
            <span className="relative z-10 hidden md:inline">{item.name}</span>
            <span className="relative z-10 md:hidden">
              <Icon size={18} strokeWidth={2.2} />
            </span>
            {isActive ? (
              <motion.div
                layoutId="tubelight"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 -z-0 rounded-full bg-red/10"
              >
                <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-red">
                  <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-red/20 blur-md" />
                  <div className="absolute -top-1 h-6 w-8 rounded-full bg-red/20 blur-md" />
                  <div className="absolute top-0 left-2 h-4 w-4 rounded-full bg-red/20 blur-sm" />
                </div>
              </motion.div>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}
