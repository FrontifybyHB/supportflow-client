import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { TicketDetailResponse, TicketMessage } from "@/features/tickets/types/ticket.types";
import { mapTicket, type BackendTicket } from "./ticketMappers";

type BackendTicketDetailPayload = {
  ticket: BackendTicket;
  messages: TicketMessage[];
};

export async function getTicketById(id: string): Promise<TicketDetailResponse> {
  const { data } = await api.get<ApiEnvelope<BackendTicketDetailPayload>>(`/api/v1/agents/tickets/${id}`);
  const payload = unwrapApiData(data);
  return {
    success: data.success,
    data: {
      ticket: mapTicket(payload.ticket),
      messages: payload.messages,
    },
  };
}
