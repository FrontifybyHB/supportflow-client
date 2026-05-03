import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { AuthSession } from "@/features/auth/types/auth.types";

export async function verifyOtp(userId: string, otp: string): Promise<AuthSession> {
  const { data } = await api.post<ApiEnvelope<AuthSession>>("/api/v1/auth/verify-otp", { userId, otp });
  return unwrapApiData(data);
}

export async function resendOtp(userId: string): Promise<{ message: string }> {
  const { data } = await api.post<ApiEnvelope<{ message: string }>>("/api/v1/auth/resend-otp", { userId });
  return unwrapApiData(data);
}
