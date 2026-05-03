import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { Business } from "@/api/business";

export async function toggleBusiness(id: string): Promise<Business> {
  const { data } = await api.patch<ApiEnvelope<{ business: Business }>>(`/api/v1/superadmin/businesses/${id}/toggle`);
  return unwrapApiData(data).business;
}
