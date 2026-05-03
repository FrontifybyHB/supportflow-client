import { cn } from "@/shared/utils/cn";

interface AvatarProps {
  src?: string;
  initials: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ src, initials, className, size = "md" }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full overflow-hidden shrink-0",
        "bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium",
        size === "sm" && "h-8 w-8 text-xs",
        size === "md" && "h-10 w-10 text-sm",
        size === "lg" && "h-12 w-12 text-base",
        className
      )}
    >
      {src ? (
        <img src={src} alt={initials} className="h-full w-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
