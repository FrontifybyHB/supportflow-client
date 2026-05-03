import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { AuthSession, GoogleLoginInput } from "@/features/auth/types/auth.types";

export async function googleLogin(input: GoogleLoginInput): Promise<AuthSession> {
  const { data } = await api.post<ApiEnvelope<AuthSession>>("/api/v1/auth/google", input);
  return unwrapApiData(data);
}
