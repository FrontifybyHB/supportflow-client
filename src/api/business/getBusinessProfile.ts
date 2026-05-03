import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { Business } from "./types";

export async function getBusinessProfile(): Promise<Business> {
  const { data } = await api.get<ApiEnvelope<{ business: Business }>>("/api/v1/business/me");
  return unwrapApiData(data).business;
}
