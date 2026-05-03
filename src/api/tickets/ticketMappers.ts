import type { AgentRef, Ticket, TicketFilters, TicketPriority, TicketStatus } from "@/features/tickets/types/ticket.types";

export type BackendTicket = {
  _id: string;
  businessId: string;
  conversationId?: string;
  title?: string;
  summary?: string;
  customer?: {
    name?: string;
    email?: string;
  };
  subject?: string;
  status: string;
  priority: string;
  sentiment?: string;
  category?: string;
  isHandoff?: boolean;
  assignedAgent?: null | string | { _id: string; name?: string; email?: string; avatarUrl?: string };
  aiSuggestedReply?: string;
  source?: string;
  feedback?: unknown;
  createdAt: string;
  updatedAt: string;
};

export type BackendTicketsPayload = {
  data: BackendTicket[];
  total: number;
  page: number;
  totalPages: number;
};

export function normalizePriority(priority: string): TicketPriority {
  const normalized = priority.toLowerCase();
  if (normalized === "urgent") return "critical";
  if (["low", "medium", "high", "critical"].includes(normalized)) return normalized as TicketPriority;
  return "medium";
}

export function normalizeStatus(status: string): TicketStatus {
  const normalized = status.toLowerCase();
  if (normalized === "in_progress") return "pending";
  if (["open", "pending", "resolved", "closed"].includes(normalized)) return normalized as TicketStatus;
  return "open";
}

export function mapTicket(ticket: BackendTicket): Ticket {
  const assignedAgent: AgentRef | undefined =
    ticket.assignedAgent && typeof ticket.assignedAgent === "object"
      ? {
          _id: ticket.assignedAgent._id,
          name: ticket.assignedAgent.name ?? ticket.assignedAgent.email ?? "Agent",
          email: ticket.assignedAgent.email,
          avatar: ticket.assignedAgent.avatarUrl,
        }
      : undefined;

  return {
    _id: ticket._id,
    businessId: ticket.businessId,
    customerName: ticket.customer?.name ?? "Guest",
    customerEmail: ticket.customer?.email,
    customerId: ticket.customer?.email,
    conversationId: ticket.conversationId,
    title: ticket.subject ?? ticket.title ?? "Support request",
    summary: ticket.summary,
    priority: normalizePriority(ticket.priority),
    sentiment: ticket.sentiment === "positive" || ticket.sentiment === "negative" || ticket.sentiment === "neutral" ? ticket.sentiment : ticket.isHandoff ? "negative" : "neutral",
    status: normalizeStatus(ticket.status),
    assignedAgent,
    aiSuggestedReply: ticket.aiSuggestedReply,
    updatedAt: ticket.updatedAt,
    createdAt: ticket.createdAt,
    category: ticket.category,
    isHandoff: ticket.isHandoff,
    source: ticket.source,
  };
}

export function toBackendPriority(priority?: TicketFilters["priority"]) {
  if (!priority || priority === "all") return undefined;
  if (priority === "critical") return "Critical";
  return priority[0].toUpperCase() + priority.slice(1);
}
