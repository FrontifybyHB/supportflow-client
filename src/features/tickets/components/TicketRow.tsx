import { Link } from "react-router-dom";
import { formatDistanceToNow } from "@/shared/utils/date";
import type { Ticket } from "../types/ticket.types";

interface TicketRowProps {
  ticket: Ticket;
}

export function TicketRow({ ticket }: TicketRowProps) {
  const priorityStyles: Record<string, string> = {
    high: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    critical: "bg-red-500/10 text-red-600 dark:text-red-400",
    low: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
    medium: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  };

  const sentimentStyles: Record<string, string> = {
    neutral: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
    negative: "bg-red-500/10 text-red-600 dark:text-red-400",
    positive: "bg-[var(--success)]/10 text-[var(--success)]",
  };

  const statusStyles: Record<string, string> = {
    open: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500",
    resolved: "bg-slate-500/10 text-[var(--text-secondary)]",
    closed: "bg-slate-500/10 text-[var(--text-secondary)]",
  };

  return (
    <tr className="hover:bg-[var(--bg-elevated)] transition-colors group">
      <td className="px-6 py-4 font-mono text-xs text-[var(--text-muted)]">
        {ticket._id.substring(ticket._id.length - 6).toUpperCase()}
      </td>
      <td className="px-6 py-4">
        <p className="font-semibold text-[var(--text-primary)] line-clamp-1 group-hover:text-[var(--accent-primary)] transition-colors">
          {ticket.title}
        </p>
      </td>
      <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
        {ticket.customerName || ticket.customerEmail || "Guest"}
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${priorityStyles[ticket.priority] || "bg-slate-500/10 text-[var(--text-secondary)]"}`}>
          {ticket.priority.toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${sentimentStyles[ticket.sentiment] || "bg-slate-500/10 text-[var(--text-secondary)]"}`}>
          {ticket.sentiment.toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyles[ticket.status] || "bg-slate-500/10 text-[var(--text-secondary)]"}`}>
          {ticket.status.toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {ticket.assignedAgent ? (
            <>
              {ticket.assignedAgent.avatar ? (
                <img src={ticket.assignedAgent.avatar} alt={ticket.assignedAgent.name} className="w-8 h-8 rounded-full border border-[var(--border-subtle)]" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] text-[10px] font-bold">
                  {ticket.assignedAgent.name[0]?.toUpperCase()}
                </div>
              )}
              <span className="text-sm font-medium text-[var(--text-secondary)] truncate w-20">{ticket.assignedAgent.name}</span>
            </>
          ) : (
            <span className="text-sm italic text-[var(--text-muted)]">Unassigned</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
        {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
      </td>
      <td className="px-6 py-4 text-right">
        <Link 
          to={`/tickets/${ticket._id}`}
          className="text-[var(--accent-primary)] font-semibold hover:underline text-sm"
        >
          View
        </Link>
      </td>
    </tr>
  );
}
