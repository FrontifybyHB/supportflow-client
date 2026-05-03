import React, { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { useBusinesses, useToggleBusiness } from "../hooks/useBusinesses";
import type { Business } from "@/api/business";

const BusinessesPage = () => {
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "suspended">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useBusinesses();
  const toggleMutation = useToggleBusiness();

  const businesses = useMemo(() => data?.businesses ?? [], [data?.businesses]);
  // Filtering can run on every keystroke, so memoization keeps unrelated UI state from recomputing the full list.
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const status = business.isActive ? "active" : "suspended";
      if (statusFilter !== "all" && status !== statusFilter) return false;
      const query = searchQuery.toLowerCase();
      return !query || business.name.toLowerCase().includes(query) || business._id.toLowerCase().includes(query);
    });
  }, [businesses, searchQuery, statusFilter]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleStatusFilterChange = useCallback((status: "all" | "active" | "suspended") => {
    setStatusFilter(status);
  }, []);

  const handleToggleBusiness = useCallback((id: string) => {
    toggleMutation.mutate(id);
  }, [toggleMutation]);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto w-full space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
          <input className="w-full bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] transition-all text-[var(--text-primary)] placeholder-[var(--text-muted)] shadow-sm" placeholder="Search businesses..." type="text" value={searchQuery} onChange={handleSearchChange} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--text-primary)]">All Businesses</h1>
            <span className="bg-[var(--accent-glow)] text-[var(--accent-primary)] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[var(--accent-primary)]/10">{data?.total ?? 0} TOTAL</span>
          </div>
          <p className="text-[var(--text-secondary)] text-sm">Manage platform partners, subscriptions, and operational status.</p>
        </div>
        <div className="flex bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-subtle)] shadow-sm">
          {(["all", "active", "suspended"] as const).map((status) => (
            <button key={status} onClick={() => handleStatusFilterChange(status)} className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${statusFilter === status ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
              {status[0].toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[980px]">
            <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)]">
              <tr>
                {["Business", "Industry", "Plan", "Owner", "Agents", "Status", "Created", "Actions"].map((heading) => (
                  <th key={heading} className="px-6 py-4 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}><td colSpan={8} className="px-6 py-3"><Skeleton className="h-12 rounded-lg" /></td></tr>
                ))
              ) : filteredBusinesses.length === 0 ? (
                <tr><td colSpan={8} className="px-6 py-12 text-center text-[var(--text-muted)]">No businesses found.</td></tr>
              ) : (
                filteredBusinesses.map((business) => (
                  <BusinessRow
                    key={business._id}
                    business={business}
                    isToggling={toggleMutation.isPending}
                    onToggle={handleToggleBusiness}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] bg-[var(--bg-base)] flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)] font-medium">Showing {filteredBusinesses.length} of {data?.total ?? filteredBusinesses.length} businesses</span>
          <div className="flex items-center gap-1 text-[var(--text-secondary)]"><ChevronLeft size={16} /><ChevronRight size={16} /></div>
        </div>
      </div>
    </motion.div>
  );
};

const Status = React.memo(function Status({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${active ? "bg-[var(--success)]" : "bg-[var(--error)]"}`}></span>
      <span className={`text-xs font-bold uppercase tracking-wider ${active ? "text-[var(--success)]" : "text-[var(--error)]"}`}>{active ? "Active" : "Suspended"}</span>
    </div>
  );
});

const BusinessRow = React.memo(function BusinessRow({
  business,
  isToggling,
  onToggle,
}: {
  business: Business;
  isToggling: boolean;
  onToggle: (id: string) => void;
}) {
  const isActive = business.isActive ?? true;

  const handleToggle = useCallback(() => {
    onToggle(business._id);
  }, [business._id, onToggle]);

  return (
    <tr className="hover:bg-[var(--bg-elevated)] transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-glow)] flex items-center justify-center text-[var(--accent-primary)] font-bold border border-[var(--accent-primary)]/10">{business.name.slice(0, 2).toUpperCase()}</div>
          <div>
            <div className="font-semibold text-[var(--text-primary)] text-sm group-hover:text-[var(--accent-primary)] transition-colors">{business.name}</div>
            <div className="font-mono text-[11px] text-[var(--text-muted)] mt-0.5">ID: {business._id.slice(-8)}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-[var(--text-secondary)] text-sm font-medium">{business.industry ?? "Not set"}</td>
      <td className="px-6 py-4"><span className="bg-[var(--bg-base)] text-[var(--text-secondary)] px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-[var(--border-default)]">{business.plan ?? "free"}</span></td>
      <td className="px-6 py-4 text-[var(--text-secondary)] text-sm">{business.owner?.email ?? business.ownerId ?? "Unknown"}</td>
      <td className="px-6 py-4 font-mono text-sm text-[var(--text-primary)]">{business.agentCount ?? business.counts?.totalAgents ?? 0}</td>
      <td className="px-6 py-4"><Status active={isActive} /></td>
      <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{business.createdAt ? new Date(business.createdAt).toLocaleDateString() : "Unknown"}</td>
      <td className="px-6 py-4">
        <button onClick={handleToggle} disabled={isToggling} className={isActive ? "text-[var(--error)] hover:bg-[var(--error)]/10 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors" : "text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--bg-elevated)] px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"}>
          {isActive ? "Suspend" : "Reactivate"}
        </button>
      </td>
    </tr>
  );
});

export default React.memo(BusinessesPage);
