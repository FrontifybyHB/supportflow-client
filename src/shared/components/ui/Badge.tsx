import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

type BadgeVariant =
  | "default"
  | "status-open"
  | "status-pending"
  | "status-resolved"
  | "status-closed"
  | "priority-low"
  | "priority-medium"
  | "priority-high"
  | "priority-critical";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-[var(--bg-elevated)] text-[var(--text-secondary)]",
  "status-open": "bg-[var(--info)]/10 text-[var(--info)]",
  "status-pending": "bg-[var(--warning)]/10 text-[var(--warning)]",
  "status-resolved": "bg-[var(--success)]/10 text-[var(--success)]",
  "status-closed": "bg-slate-500/10 text-[var(--text-secondary)]",
  "priority-low": "bg-[var(--priority-low)]/10 text-[var(--priority-low)]",
  "priority-medium": "bg-[var(--priority-medium)]/10 text-[var(--priority-medium)]",
  "priority-high": "bg-[var(--priority-high)]/10 text-[var(--priority-high)]",
  "priority-critical": "bg-[var(--priority-critical)]/10 text-[var(--priority-critical)]",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
