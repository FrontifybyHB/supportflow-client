import React, { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, ShieldAlert } from "lucide-react";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { useAgents } from "../hooks/useAgents";

const AgentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useAgents();

  const agents = useMemo(() => data?.users ?? [], [data?.users]);
  // Search is derived server state; memoization avoids recomputing filtered cards during unrelated renders.
  const filteredAgents = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return agents.filter((agent) => !query || agent.name.toLowerCase().includes(query) || agent.email.toLowerCase().includes(query));
  }, [agents, searchQuery]);

  const { activeAgents, inactiveAgents } = useMemo(() => {
    const active = agents.filter((agent) => agent.isActive !== false).length;
    return { activeAgents: active, inactiveAgents: agents.length - active };
  }, [agents]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto w-full space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--text-primary)]">Agents</h1>
          <span className="px-2.5 py-0.5 rounded-full bg-[var(--success)]/10 text-[var(--success)] text-[10px] font-bold tracking-widest uppercase">{activeAgents} Active</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input type="text" value={searchQuery} onChange={handleSearchChange} className="w-full pl-10 pr-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] outline-none transition-all placeholder-[var(--text-muted)] shadow-sm" placeholder="Search agents..." />
          </div>
          <div className="flex items-center gap-2 bg-[var(--bg-elevated)] text-[var(--text-secondary)] px-4 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-subtle)]">
            <UserPlus size={18} />
            Invite routes pending
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 flex divide-x divide-[var(--border-subtle)] shadow-sm">
        <Stat label="Total agents" value={agents.length} />
        <Stat label="Active" value={activeAgents} />
        <Stat label="Inactive" value={inactiveAgents} />
      </div>

      {isError && (
        <div className="bg-[var(--warning)]/10 border border-[var(--warning)]/20 text-[var(--warning)] rounded-xl p-4 text-sm flex items-center gap-3">
          <ShieldAlert size={18} />
          Agent listing currently uses the superadmin users endpoint because admin-scoped agent routes are not exposed yet.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-44 rounded-xl" />)
        ) : filteredAgents.length === 0 ? (
          <div className="col-span-full text-center py-12 text-[var(--text-muted)] bg-[var(--bg-surface)] border border-dashed border-[var(--border-subtle)] rounded-xl">
            <p className="text-lg font-medium">No agents found.</p>
          </div>
        ) : (
          filteredAgents.map((agent) => {
            const active = agent.isActive !== false;
            const initials = agent.name.split(" ").map((part) => part[0]).join("").toUpperCase().slice(0, 2) || "AG";
            return (
              <div key={agent._id} className={`bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-5 flex flex-col space-y-4 shadow-sm transition-all duration-300 ${active ? "hover:border-[var(--accent-primary)]/50 hover:shadow-md" : "opacity-60 grayscale-[0.3]"}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-glow)] flex items-center justify-center text-[var(--accent-primary)] font-bold text-lg border border-[var(--accent-primary)]/10">{initials}</div>
                    <div>
                      <h4 className="font-display text-base font-bold text-[var(--text-primary)] leading-tight mb-0.5">{agent.name}</h4>
                      <p className="text-[var(--text-secondary)] text-sm">{agent.email}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest border border-[var(--border-subtle)]">{agent.role}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${active ? "bg-[var(--success)] shadow-[0_0_8px_var(--success)]" : "bg-[var(--border-default)]"}`}></span>
                    <span className="text-sm text-[var(--text-primary)] font-medium">{active ? "Active" : "Inactive"}</span>
                  </div>
                  <span className="text-[var(--text-muted)] text-sm font-medium">{agent.businessId ? "Tenant assigned" : "No tenant"}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

const Stat = React.memo(function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex-1 px-4 sm:px-6 lg:px-8 first:pl-0">
      <p className="text-[var(--text-muted)] text-sm font-medium mb-1">{label}</p>
      <h3 className="font-display text-3xl font-bold text-[var(--text-primary)]">{value}</h3>
    </div>
  );
});

export default React.memo(AgentsPage);
