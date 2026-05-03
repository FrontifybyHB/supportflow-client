import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { User } from "@/features/auth/types/auth.types";
import type { Business, CreateBusinessInput } from "./types";

export async function createBusiness(input: CreateBusinessInput): Promise<{ business: Business; user: User }> {
  const { data } = await api.post<ApiEnvelope<{ business: Business; user: User }>>("/api/v1/business", input);
  return unwrapApiData(data);
}
