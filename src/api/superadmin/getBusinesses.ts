import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { Business } from "@/api/business";

export async function getBusinesses(): Promise<{ businesses: Business[]; total: number }> {
  const { data } = await api.get<ApiEnvelope<{ businesses: Business[]; total: number }>>("/api/v1/superadmin/businesses");
  return unwrapApiData(data);
}
