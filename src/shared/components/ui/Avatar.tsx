import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  initials: string;
  size?: "sm" | "md" | "lg";
  src?: string | null;
  alt?: string;
};

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export function Avatar({ alt, className, initials, size = "md", src, ...props }: AvatarProps) {
  const label = initials.trim().slice(0, 2).toUpperCase() || "U";

  if (src) {
    return (
      <img
        alt={alt ?? label}
        className={cn("shrink-0 rounded-full border border-[var(--border-subtle)] object-cover", sizeClasses[size], className)}
        src={src}
      />
    );
  }

  return (
    <div
      aria-label={alt ?? label}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-[var(--accent-glow)] font-semibold text-[var(--accent-primary)]",
        sizeClasses[size],
        className,
      )}
      role="img"
      {...props}
    >
      {label}
    </div>
  );
}
