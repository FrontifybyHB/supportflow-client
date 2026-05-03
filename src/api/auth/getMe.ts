import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { User } from "@/features/auth/types/auth.types";

export async function getMe(): Promise<User> {
  const { data } = await api.get<ApiEnvelope<{ user: User }>>("/api/v1/auth/me");
  return unwrapApiData(data).user;
}
