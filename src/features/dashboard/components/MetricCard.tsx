import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";

type MetricCardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  trend: string;
};

export function MetricCard({ icon: Icon, label, trend, value }: MetricCardProps) {
  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      initial={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-normal">{value}</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-50 text-cyan-700">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-4 text-sm text-emerald-600">{trend}</p>
    </motion.article>
  );
}
