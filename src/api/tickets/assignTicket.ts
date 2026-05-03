import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";

export async function assignTicket(id: string, agentId: string): Promise<{ success: boolean; data: unknown }> {
  const { data } = await api.patch<ApiEnvelope<unknown>>(`/api/v1/agents/tickets/${id}/assign`, { agentId });
  return { success: data.success, data: unwrapApiData(data) };
}
