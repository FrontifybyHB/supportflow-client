import { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function Card({ children, className, noPadding = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl shadow-sm overflow-hidden",
        !noPadding && "p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
