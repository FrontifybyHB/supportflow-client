import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { User } from "@/features/auth/types/auth.types";

export type CreateBusinessAgentInput = {
  name: string;
  email: string;
  password: string;
};

export async function createBusinessAgent(input: CreateBusinessAgentInput): Promise<User> {
  const { data } = await api.post<ApiEnvelope<{ agent: User } | { user: User } | User>>("/api/v1/business/agents", input);
  const payload = unwrapApiData(data);
  if ("agent" in payload) return payload.agent;
  if ("user" in payload) return payload.user;
  return payload;
}
