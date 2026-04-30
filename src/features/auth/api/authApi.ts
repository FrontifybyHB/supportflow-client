import { httpClient } from "@/lib/api/httpClient";
import type { AuthSession, LoginInput } from "../types/auth.types";

export async function login(input: LoginInput): Promise<AuthSession> {
  if (import.meta.env.DEV) {
    return {
      accessToken: "dev-token",
      user: {
        id: "1",
        name: "SupportFlow Admin",
        email: input.email,
        role: "admin",
      },
    };
  }

  const { data } = await httpClient.post<AuthSession>("/auth/login", input);
  return data;
}

export async function logout(): Promise<void> {
  if (import.meta.env.DEV) {
    return;
  }

  await httpClient.post("/auth/logout");
}
