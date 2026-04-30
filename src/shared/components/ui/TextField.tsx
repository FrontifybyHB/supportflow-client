import type { ComponentType, InputHTMLAttributes, SVGProps } from "react";
import { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, error, icon: Icon, id, label, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <label className="block" htmlFor={inputId}>
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span
          className={cn(
            "mt-2 flex h-11 items-center gap-3 rounded-md border border-slate-200 bg-white px-3 transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-100",
            error && "border-rose-300 focus-within:border-rose-500",
          )}
        >
          {Icon ? <Icon className="h-4 w-4 text-slate-400" /> : null}
          <input
            className={cn(
              "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400",
              className,
            )}
            id={inputId}
            ref={ref}
            {...props}
          />
        </span>
        {error ? <span className="mt-1 block text-xs text-rose-600">{error}</span> : null}
      </label>
    );
  },
);

TextField.displayName = "TextField";
