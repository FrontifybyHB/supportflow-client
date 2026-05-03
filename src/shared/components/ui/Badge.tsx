import { cn } from "@/shared/utils/cn";

type BadgeVariant = 
  | "priority-low" | "priority-medium" | "priority-high" | "priority-critical"
  | "sentiment-positive" | "sentiment-neutral" | "sentiment-negative"
  | "status-open" | "status-pending" | "status-in_progress" | "status-resolved" | "status-closed";

export function Badge({ variant, className, children }: { variant: BadgeVariant; className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
        variant === "priority-low" && "bg-[var(--priority-low)]/10 text-[var(--priority-low)]",
        variant === "priority-medium" && "bg-[var(--priority-medium)]/10 text-[var(--priority-medium)]",
        variant === "priority-high" && "bg-[var(--priority-high)]/10 text-[var(--priority-high)]",
        variant === "priority-critical" && "bg-[var(--priority-critical)]/10 text-[var(--priority-critical)]",
        variant === "sentiment-positive" && "bg-[var(--sentiment-positive)]/10 text-[var(--sentiment-positive)]",
        variant === "sentiment-neutral" && "bg-[var(--sentiment-neutral)]/10 text-[var(--sentiment-neutral)]",
        variant === "sentiment-negative" && "bg-[var(--sentiment-negative)]/10 text-[var(--sentiment-negative)]",
        variant === "status-open" && "bg-[var(--info)]/10 text-[var(--info)]",
        (variant === "status-pending" || variant === "status-in_progress") && "bg-[var(--warning)]/10 text-[var(--warning)]",
        variant === "status-resolved" && "bg-[var(--success)]/10 text-[var(--success)]",
        variant === "status-closed" && "bg-[var(--text-muted)]/10 text-[var(--text-muted)]",
        className
      )}
    >
      {children}
    </span>
  );
}
