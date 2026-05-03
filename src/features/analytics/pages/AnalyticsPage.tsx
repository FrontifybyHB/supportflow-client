import React from "react";
import { motion } from "framer-motion";
import { Layers, AlertCircle, CheckCircle, Zap, Star } from "lucide-react";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { useAnalyticsData } from "../hooks/useAnalyticsData";

const AnalyticsPage = () => {
  const { stats, feedback, aiSelection, isLoading } = useAnalyticsData();

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto w-full space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--text-primary)]">Analytics</h1>
        <div className="text-sm text-[var(--text-secondary)] bg-[var(--bg-surface)] px-4 py-2 rounded-xl border border-[var(--border-subtle)]">
          AI model: <span className="text-[var(--text-primary)] font-semibold">{aiSelection.data?.model?.name ?? "Platform default"}</span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-32 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Tickets" value={stats.data?.totalTickets ?? 0} icon={Layers} tone="info" />
          <StatCard title="Open Tickets" value={stats.data?.openTickets ?? 0} icon={AlertCircle} tone="warning" />
          <StatCard title="Resolved Tickets" value={stats.data?.resolvedTickets ?? 0} icon={CheckCircle} tone="success" />
          <StatCard title="AI Handled Rate" value={stats.data?.aiHandledRate ?? "0%"} icon={Zap} tone="accent" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--bg-surface)] p-6 rounded-xl border border-[var(--border-subtle)] shadow-sm">
          <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">Feedback Overview</h3>
          <p className="text-[var(--text-muted)] text-xs mt-1 mb-6">Live CSAT metrics from `/api/feedback/analytics`.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MiniStat label="Total feedback" value={feedback.data?.overview.totalFeedback ?? 0} />
            <MiniStat label="Avg rating" value={feedback.data?.overview.averageRating ?? 0} />
            <MiniStat label="CSAT" value={`${feedback.data?.overview.csatScore ?? 0}%`} />
            <MiniStat label="Resolution" value={`${feedback.data?.overview.resolutionRate ?? 0}%`} />
          </div>
        </div>

        <div className="bg-[var(--bg-surface)] p-6 rounded-xl border border-[var(--border-subtle)] shadow-sm">
          <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">Customer Satisfaction</h3>
          <div className="flex items-center justify-center min-h-[220px]">
            <div className="relative w-40 h-40 rounded-full border-[12px] border-[var(--accent-primary)]/30 flex flex-col items-center justify-center">
              <Star className="text-[var(--accent-primary)] mb-2" size={26} />
              <span className="text-3xl font-display font-bold text-[var(--text-primary)]">{feedback.data?.overview.averageRating ?? 0}</span>
              <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mt-1">Rating</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function StatCard({ title, value, icon: Icon, tone }: { title: string; value: string | number; icon: React.ElementType; tone: "info" | "warning" | "success" | "accent" }) {
  const toneClass = {
    info: "bg-[var(--info)]/10 text-[var(--info)]",
    warning: "bg-[var(--warning)]/10 text-[var(--warning)]",
    success: "bg-[var(--success)]/10 text-[var(--success)]",
    accent: "bg-[var(--accent-glow)] text-[var(--accent-primary)]",
  }[tone];
  return (
    <div className="bg-[var(--bg-surface)] p-5 rounded-xl border border-[var(--border-subtle)] flex flex-col gap-3 shadow-sm">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${toneClass}`}><Icon size={20} /></div>
      <div>
        <p className="text-[var(--text-muted)] text-sm font-medium">{title}</p>
        <h2 className="font-display text-2xl font-bold mt-1 text-[var(--text-primary)]">{typeof value === "number" ? value.toLocaleString() : value}</h2>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-4">
      <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-widest">{label}</p>
      <p className="font-display text-2xl font-bold text-[var(--text-primary)] mt-1">{value}</p>
    </div>
  );
}

export default React.memo(AnalyticsPage);
