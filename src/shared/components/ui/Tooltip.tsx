import { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface TooltipProps {
  content: string;
  children: ReactNode;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ content, children, className, position = "top" }: TooltipProps) {
  return (
    <div className="group relative inline-flex">
      {children}
      <div
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded bg-[var(--bg-elevated)] px-2 py-1 text-xs font-medium text-[var(--text-primary)] opacity-0 shadow-sm transition-opacity group-hover:opacity-100 border border-[var(--border-subtle)]",
          position === "top" && "bottom-full left-1/2 -translate-x-1/2 -translate-y-1.5",
          position === "bottom" && "top-full left-1/2 -translate-x-1/2 translate-y-1.5",
          position === "left" && "right-full top-1/2 -translate-y-1/2 -translate-x-1.5",
          position === "right" && "left-full top-1/2 -translate-y-1/2 translate-x-1.5",
          className
        )}
      >
        {content}
      </div>
    </div>
  );
}
