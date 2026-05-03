import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResult = {
  userId: string;
  message: string;
};

export async function register(input: RegisterInput): Promise<RegisterResult> {
  const { data } = await api.post<ApiEnvelope<RegisterResult>>("/api/v1/auth/register", input);
  return unwrapApiData(data);
}
