import type { ComponentType, InputHTMLAttributes, SVGProps, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  helperText?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  label: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, error, helperText, icon: Icon, leftIcon, rightIcon, id, label, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="space-y-2 w-full">
        <label className="block text-sm font-medium text-[var(--text-secondary)] font-sans" htmlFor={inputId}>
          {label}
        </label>
        <div className="relative">
          {(Icon || leftIcon) && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-muted)]">
              {leftIcon ? leftIcon : Icon && <Icon className="h-[20px] w-[20px]" />}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "block w-full py-2.5 bg-[var(--bg-surface)] border rounded-lg text-base text-[var(--text-primary)] transition-colors focus:outline-none focus:ring-2",
              (Icon || leftIcon) ? "pl-10" : "pl-3",
              rightIcon ? "pr-10" : "pr-3",
              error
                ? "border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]/20"
                : "border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]/20 placeholder:text-[var(--text-muted)]",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-muted)]">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-sm text-[var(--error)]">{error}</p>
        ) : helperText ? (
          <p className="text-sm text-[var(--text-muted)]">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

TextField.displayName = "TextField";
