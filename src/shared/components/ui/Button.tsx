import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { Spinner } from "./Spinner";

type ButtonProps = Omit<HTMLMotionProps<"button">, "variant" | "children"> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children?: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
          // Sizes
          size === "sm" && "h-8 px-3 text-xs",
          size === "md" && "h-11 px-4 text-sm",
          size === "lg" && "h-14 px-6 text-base",
          // Variants
          variant === "primary" &&
            "bg-[var(--accent-primary)] text-[var(--bg-base)] hover:bg-[var(--accent-hover)]",
          variant === "secondary" &&
            "bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--border-default)]",
          variant === "ghost" && "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]",
          variant === "danger" && "bg-[var(--error)] text-white hover:opacity-90",
          variant === "outline" && "border-2 border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]",
          variant === "link" && "text-[var(--accent-primary)] hover:underline p-0 h-auto",
          className,
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" />}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
