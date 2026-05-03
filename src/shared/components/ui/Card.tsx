import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-sm", className)}
      {...props}
    />
  );
}
