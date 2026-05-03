import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";

export async function requestPasswordReset(email: string): Promise<{ message: string }> {
  const { data } = await api.post<ApiEnvelope<{ message: string }>>("/api/v1/auth/forgot-password", { email });
  return unwrapApiData(data);
}

export async function verifyResetCode(userId: string, code: string): Promise<{ message: string }> {
  const { data } = await api.post<ApiEnvelope<{ message: string }>>("/api/v1/auth/verify-otp", { userId, otp: code });
  return unwrapApiData(data);
}

export async function resetPassword(userId: string, otp: string, newPassword: string): Promise<{ message: string }> {
  const { data } = await api.post<ApiEnvelope<{ message: string }>>("/api/v1/auth/reset-password", {
    userId,
    otp,
    newPassword,
  });
  return unwrapApiData(data);
}
