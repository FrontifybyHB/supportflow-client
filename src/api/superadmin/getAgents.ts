import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { User } from "@/features/auth/types/auth.types";

export interface AgentsResponse {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getAgents(page = 1, limit = 50): Promise<AgentsResponse> {
  const { data } = await api.get<ApiEnvelope<AgentsResponse>>("/api/v1/superadmin/users", {
    params: { role: "agent", page, limit },
  });
  return unwrapApiData(data);
}
