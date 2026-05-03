import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { Ticket } from "@/features/tickets/types/ticket.types";
import { mapTicket, type BackendTicket } from "./ticketMappers";

export type CreateTicketInput = {
  businessId: string;
  message: string;
  subject?: string;
};

export async function createTicket(input: CreateTicketInput): Promise<{ success: boolean; data: Ticket }> {
  const { data } = await api.post<ApiEnvelope<{ ticket: BackendTicket }>>("/api/chat/message", input);
  return { success: data.success, data: mapTicket(unwrapApiData(data).ticket) };
}
