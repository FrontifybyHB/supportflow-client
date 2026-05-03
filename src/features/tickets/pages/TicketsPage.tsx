import React, { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useTickets } from "../hooks/useTickets";
import { TicketFilters } from "../components/TicketFilters";
import { TicketRow } from "../components/TicketRow";
import { TicketTable } from "../components/TicketTable";
import { Button } from "@/shared/components/ui/Button";
import type { TicketFilters as Filters } from "../types/ticket.types";

const TicketsPage = () => {
  const [filters, setFilters] = useState<Filters>({ page: 1, limit: 10, status: "all", priority: "all", myTicketsOnly: false });
  const { data, isLoading } = useTickets(filters);

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  const totalPages = data ? Math.ceil(data.data.total / (filters.limit || 10)) : 1;
  const currentPage = filters.page || 1;

  const setPage = useCallback((p: number) => {
    setFilters(prev => ({ ...prev, page: p }));
  }, []);

  // Memoized because pagination labels are derived from query state and are reused across several buttons.
  const visiblePages = useMemo(() => {
    return Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
      if (totalPages <= 5) return i + 1;
      if (currentPage <= 3) return i + 1;
      if (currentPage >= totalPages - 2) return totalPages - 4 + i;
      return currentPage - 2 + i;
    });
  }, [currentPage, totalPages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-[1400px] mx-auto w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-[32px] font-bold font-display leading-[1.2] text-[var(--text-primary)] tracking-tight">Tickets</h1>
          {!isLoading && data && (
            <span className="bg-[var(--accent-primary)] text-[var(--bg-base)] text-[12px] font-bold px-2.5 py-0.5 rounded-full">
              {data.data.total.toLocaleString()}
            </span>
          )}
        </div>
        <Button variant="outline" className="gap-2 border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5 h-10">
          <Plus size={18} />
          New Ticket
        </Button>
      </div>

      <TicketFilters filters={filters} onChange={handleFilterChange} />

      <TicketTable isLoading={isLoading}>
        {data?.data.tickets.length === 0 ? (
          <tr>
            <td colSpan={9} className="px-6 py-12 text-center text-[var(--text-muted)]">
              No tickets found matching your filters.
            </td>
          </tr>
        ) : (
          data?.data.tickets.map(ticket => (
            <TicketRow key={ticket._id} ticket={ticket} />
          ))
        )}
      </TicketTable>

      {/* Pagination */}
      {!isLoading && data && data.data.total > 0 && (
        <div className="mt-6 px-6 py-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            Showing <span className="font-semibold text-[var(--text-primary)]">{(currentPage - 1) * (filters.limit || 10) + 1} - {Math.min(currentPage * (filters.limit || 10), data.data.total)}</span> of <span className="font-semibold text-[var(--text-primary)]">{data.data.total}</span>
          </p>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-[var(--bg-elevated)]"
            >
              <ChevronLeft size={18} />
            </button>
            
            {visiblePages.map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-sm font-medium ${
                    currentPage === pageNum 
                      ? "bg-[var(--accent-primary)] text-[var(--bg-base)] shadow-sm border border-[var(--accent-primary)]" 
                      : "border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] bg-[var(--bg-elevated)]"
                  }`}
                >
                  {pageNum}
                </button>
            ))}
            
            {totalPages > 5 && currentPage < totalPages - 2 && <span className="px-2 text-[var(--text-muted)]">...</span>}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => setPage(totalPages)}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-colors text-sm font-medium bg-[var(--bg-elevated)]"
              >
                {totalPages}
              </button>
            )}
            
            <button
              onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-[var(--bg-elevated)]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default React.memo(TicketsPage);
