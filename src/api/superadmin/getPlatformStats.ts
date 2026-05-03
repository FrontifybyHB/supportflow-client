import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";

export interface PlatformStats {
  totalBusinesses: number;
  activeBusinesses: number;
  totalAgents: number;
  totalCustomers: number;
  totalUsers: number;
}

export async function getPlatformStats(): Promise<PlatformStats> {
  const { data } = await api.get<ApiEnvelope<PlatformStats>>("/api/v1/superadmin/stats");
  return unwrapApiData(data);
}
