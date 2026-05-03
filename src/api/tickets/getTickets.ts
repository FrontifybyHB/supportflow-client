import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { TicketFilters, TicketsResponse } from "@/features/tickets/types/ticket.types";
import { mapTicket, toBackendPriority, type BackendTicketsPayload } from "./ticketMappers";

export async function getTickets(filters: TicketFilters): Promise<TicketsResponse> {
  const params = {
    page: filters.page,
    limit: filters.limit,
    status: filters.status === "all" ? undefined : filters.status,
    priority: toBackendPriority(filters.priority),
  };

  const { data } = await api.get<ApiEnvelope<BackendTicketsPayload>>("/api/v1/agents/tickets", { params });
  const payload = unwrapApiData(data);
  let tickets = payload.data.map(mapTicket);

  if (filters.search) {
    const query = filters.search.toLowerCase();
    tickets = tickets.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(query) ||
        ticket.customerName?.toLowerCase().includes(query) ||
        ticket.customerEmail?.toLowerCase().includes(query),
    );
  }

  return {
    success: data.success,
    data: {
      tickets,
      total: filters.search ? tickets.length : payload.total,
      page: payload.page,
      totalPages: filters.search ? 1 : payload.totalPages,
    },
  };
}
