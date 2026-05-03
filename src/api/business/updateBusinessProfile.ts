import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { Business } from "./types";

export type UpdateBusinessInput = Partial<Pick<Business, "name" | "industry" | "description" | "settings" | "knowledgeBase">>;

export async function updateBusinessProfile(input: UpdateBusinessInput): Promise<Business> {
  const { data } = await api.patch<ApiEnvelope<{ business: Business }>>("/api/v1/business/me", input);
  return unwrapApiData(data).business;
}
