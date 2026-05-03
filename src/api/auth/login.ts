import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { LoginInput, LoginResult } from "@/features/auth/types/auth.types";

export async function login(input: LoginInput): Promise<LoginResult> {
  const { data } = await api.post<ApiEnvelope<LoginResult>>("/api/v1/auth/login", input);
  return unwrapApiData(data);
}
