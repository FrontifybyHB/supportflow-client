import type { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
};

export function Button({
  children,
  className,
  disabled,
  isLoading = false,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        size === "sm" && "h-9 px-3",
        size === "md" && "h-11 px-4",
        size === "lg" && "h-12 px-5",
        variant === "primary" &&
          "bg-[var(--accent-primary)] text-[var(--bg-base)] hover:bg-[var(--accent-hover)]",
        variant === "secondary" &&
          "border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-overlay)]",
        variant === "ghost" && "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]",
        variant === "outline" &&
          "border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]",
        variant === "link" &&
          "h-auto px-0 font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] hover:underline",
        className,
      )}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
