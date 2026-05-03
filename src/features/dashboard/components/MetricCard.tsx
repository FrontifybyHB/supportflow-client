import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type MetricCardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  trend: string;
  trendDirection?: "up" | "down" | "neutral";
};

export function MetricCard({ icon: Icon, label, trend, value, trendDirection = "up" }: MetricCardProps) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
      }}
      className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 shadow-sm relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-24 h-24 text-[var(--accent-primary)] transform translate-x-4 -translate-y-4" />
      </div>

      <div className="flex items-start justify-between gap-4 relative z-10">
        <div>
          <p className="text-sm font-medium text-[var(--text-secondary)] font-sans">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text-primary)] font-display">{value}</p>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/10 shadow-sm">
          <Icon className="h-6 w-6" />
        </span>
      </div>
      <div className="mt-4 flex items-center text-sm relative z-10">
        {trendDirection === "up" && <ArrowUpRight className="h-4 w-4 mr-1 text-[var(--success)]" />}
        {trendDirection === "down" && <ArrowDownRight className="h-4 w-4 mr-1 text-[var(--error)]" />}
        <p className={
          trendDirection === "up" ? "text-[var(--success)]" : 
          trendDirection === "down" ? "text-[var(--error)]" : 
          "text-[var(--text-muted)]"
        }>
          {trend}
        </p>
      </div>
    </motion.article>
  );
}
