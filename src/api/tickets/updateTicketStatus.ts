import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { TicketStatus } from "@/features/tickets/types/ticket.types";

export async function updateTicketStatus(id: string, status: TicketStatus): Promise<{ success: boolean; data: unknown }> {
  const { data } = await api.patch<ApiEnvelope<unknown>>(`/api/v1/agents/tickets/${id}/status`, { status });
  return { success: data.success, data: unwrapApiData(data) };
}
