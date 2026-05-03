import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { Ticket, TicketStatus } from "@/features/tickets/types/ticket.types";
import { mapTicket, type BackendTicket } from "./ticketMappers";

export async function updateTicketStatus(id: string, status: TicketStatus): Promise<{ success: boolean; data: Ticket }> {
  const { data } = await api.patch<ApiEnvelope<BackendTicket>>(`/api/v1/agents/tickets/${id}/status`, { status });
  return { success: data.success, data: mapTicket(unwrapApiData(data)) };
}
