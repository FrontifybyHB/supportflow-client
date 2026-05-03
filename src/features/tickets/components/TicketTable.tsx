import { ReactNode } from "react";
import { Skeleton } from "@/shared/components/ui/Skeleton";

interface TicketTableProps {
  isLoading: boolean;
  children: ReactNode;
}

export function TicketTable({ isLoading, children }: TicketTableProps) {
  return (
    <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] shadow-sm overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)]">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">#</th>
              <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Sentiment</th>
              <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Created</th>
              <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-8" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-48" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-6 w-16 rounded-full" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-6 w-16 rounded-full" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-8 w-8 rounded-full" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                  <td className="px-6 py-4 text-right"><Skeleton className="h-4 w-10 ml-auto" /></td>
                </tr>
              ))
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
