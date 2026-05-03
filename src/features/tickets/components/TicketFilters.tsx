import { Search, ChevronDown } from "lucide-react";
import type { TicketFilters as Filters } from "../types/ticket.types";

interface TicketFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function TicketFilters({ filters, onChange }: TicketFiltersProps) {
  const tabs = ["all", "open", "pending", "resolved", "closed"] as const;

  return (
    <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] shadow-sm p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        
        {/* Status Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[var(--bg-elevated)] rounded-lg w-full lg:w-auto overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onChange({ ...filters, status: tab })}
              className={`px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                (filters.status || "all") === tab
                  ? "bg-[var(--bg-surface)] shadow-sm text-[var(--accent-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tab === "all" ? "All" : tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          
          {/* Priority Dropdown */}
          <div className="relative min-w-[160px]">
            <select
              value={filters.priority || "all"}
              onChange={(e) => onChange({ ...filters, priority: e.target.value as Filters["priority"] })}
              className="w-full h-10 pl-3 pr-10 text-sm bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] appearance-none cursor-pointer text-[var(--text-primary)]"
            >
              <option value="all">All Priorities</option>
              <option value="low">LOW</option>
              <option value="medium">MEDIUM</option>
              <option value="high">HIGH</option>
              <option value="critical">CRITICAL</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
          </div>

          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={filters.search || ""}
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
              className="w-full h-10 pl-10 pr-4 text-sm bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all"
              placeholder="Search tickets..."
            />
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-3 px-4">
            <span className="text-sm font-medium text-[var(--text-secondary)]">My tickets</span>
            <button
              onClick={() => onChange({ ...filters, myTicketsOnly: !filters.myTicketsOnly })}
              className={`w-9 h-5 rounded-full relative transition-colors duration-200 ${
                filters.myTicketsOnly ? "bg-[var(--accent-primary)]" : "bg-[var(--border-default)]"
              }`}
            >
              <span 
                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                  filters.myTicketsOnly ? "right-1" : "left-1"
                }`} 
              />
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
