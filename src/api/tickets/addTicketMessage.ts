import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { CreateTicketMessageInput, TicketMessage } from "@/features/tickets/types/ticket.types";

export async function addTicketMessage(input: CreateTicketMessageInput): Promise<{ success: boolean; data: TicketMessage }> {
  const { ticketId, content } = input;
  const { data } = await api.post<ApiEnvelope<TicketMessage>>(`/api/v1/agents/tickets/${ticketId}/messages`, { content });
  return { success: data.success, data: unwrapApiData(data) };
}
