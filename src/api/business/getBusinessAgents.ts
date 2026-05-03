import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { User } from "@/features/auth/types/auth.types";

export interface BusinessAgentsResponse {
  agents: User[];
  total?: number;
}

export async function getBusinessAgents(): Promise<BusinessAgentsResponse> {
  const { data } = await api.get<ApiEnvelope<BusinessAgentsResponse | User[]>>("/api/v1/business/agents");
  const payload = unwrapApiData(data);
  return Array.isArray(payload) ? { agents: payload, total: payload.length } : payload;
}
