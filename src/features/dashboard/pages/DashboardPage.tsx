import React from "react";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, Layers, MessageSquare, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/lib/redux/hooks";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import type { Business } from "@/api/business";
import type { Ticket } from "@/features/tickets/types/ticket.types";
import { useDashboardData } from "../hooks/useDashboardData";

function formatNumber(value?: number) {
  return (value ?? 0).toLocaleString();
}

function isTicket(row: Business | Ticket): row is Ticket {
  return "title" in row;
}

const DashboardPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const isSuperadmin = user?.role === "superadmin";
  const { platformStats, businesses, businessStats, tickets, isLoading } = useDashboardData(isSuperadmin);
  const rows = isSuperadmin ? businesses.data?.businesses.slice(0, 5) ?? [] : tickets.data?.data.tickets ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto w-full space-y-8 pb-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              {isSuperadmin ? "Platform Overview" : "Business Overview"}
            </h1>
            <span className="bg-[var(--accent-glow)] text-[var(--accent-primary)] px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-[var(--accent-primary)]/20">
              {user?.role ?? "admin"}
            </span>
          </div>
          <p className="text-[var(--text-secondary)] text-sm">Live metrics from the backend for your current SupportFlow workspace.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-32 rounded-xl" />)}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Metric title={isSuperadmin ? "Total Businesses" : "Total Tickets"} value={formatNumber(isSuperadmin ? platformStats.data?.totalBusinesses : businessStats.data?.totalTickets)} icon={isSuperadmin ? Building2 : Layers} tone="info" />
            <Metric title={isSuperadmin ? "Active Businesses" : "Open Tickets"} value={formatNumber(isSuperadmin ? platformStats.data?.activeBusinesses : businessStats.data?.openTickets)} icon={CheckCircle2} tone="success" />
            <Metric title={isSuperadmin ? "Total Users" : "Resolved Tickets"} value={formatNumber(isSuperadmin ? platformStats.data?.totalUsers : businessStats.data?.resolvedTickets)} icon={Users} tone="warning" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Metric title="Total Agents" value={formatNumber(isSuperadmin ? platformStats.data?.totalAgents : businessStats.data?.totalAgents)} icon={MessageSquare} tone="neutral" compact />
            <Metric title="Total Customers" value={formatNumber(isSuperadmin ? platformStats.data?.totalCustomers : businessStats.data?.totalCustomers)} icon={Users} tone="neutral" compact />
            <Metric title="AI Handled Rate" value={businessStats.data?.aiHandledRate ?? "0%"} icon={Zap} tone="accent" compact />
          </div>
        </>
      )}

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">{isSuperadmin ? "Recent Businesses" : "Recent Tickets"}</h3>
          <Link to={isSuperadmin ? "/businesses" : "/tickets"} className="text-[var(--accent-primary)] text-sm font-semibold hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="px-6 py-3.5 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Name</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Type</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Status</th>
                <th className="px-6 py-3.5 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {rows.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-sm text-[var(--text-muted)]">No backend records found yet.</td></tr>
              ) : rows.map((row) => {
                const ticketRow = isTicket(row);
                return (
                  <tr key={row._id} className="hover:bg-[var(--bg-elevated)] transition-colors">
                    <td className="px-6 py-4 font-semibold text-sm text-[var(--text-primary)]">{ticketRow ? row.title : row.name}</td>
                    <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{ticketRow ? row.category ?? "Ticket" : row.industry ?? "Business"}</td>
                    <td className="px-6 py-4 text-xs font-bold uppercase text-[var(--accent-primary)]">{ticketRow ? row.status : row.isActive ? "active" : "suspended"}</td>
                    <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : "Unknown"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

function Metric({ title, value, icon: Icon, tone, compact }: { title: string; value: string; icon: React.ElementType; tone: "info" | "success" | "warning" | "neutral" | "accent"; compact?: boolean }) {
  const toneClass = {
    info: "text-[var(--info)] bg-[var(--info)]/10",
    success: "text-[var(--success)] bg-[var(--success)]/10",
    warning: "text-[var(--warning)] bg-[var(--warning)]/10",
    neutral: "text-[var(--text-secondary)] bg-[var(--bg-elevated)]",
    accent: "text-[var(--accent-primary)] bg-[var(--accent-glow)]",
  }[tone];

  return (
    <div className={`bg-[var(--bg-surface)] ${compact ? "p-5" : "p-6"} rounded-xl border border-[var(--border-subtle)] shadow-sm flex items-center justify-between`}>
      <div>
        <p className="text-[var(--text-muted)] text-sm font-medium mb-1">{title}</p>
        <h2 className="font-display text-3xl font-bold text-[var(--text-primary)]">{value}</h2>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${toneClass}`}><Icon size={24} /></div>
    </div>
  );
}

export default DashboardPage;
