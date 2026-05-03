import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { BusinessStats } from "./types";

export async function getBusinessStats(): Promise<BusinessStats> {
  const { data } = await api.get<ApiEnvelope<{ stats: BusinessStats }>>("/api/v1/business/stats");
  return unwrapApiData(data).stats;
}
