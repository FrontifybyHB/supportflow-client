import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { Business } from "@/api/business";

export async function updateBusinessPlan(id: string, plan: "free" | "pro"): Promise<Business> {
  const { data } = await api.patch<ApiEnvelope<{ business: Business }>>(`/api/v1/superadmin/businesses/${id}/plan`, { plan });
  return unwrapApiData(data).business;
}
