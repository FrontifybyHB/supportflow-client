import api from "@/api/config";

export async function logout(): Promise<void> {
  await api.post("/api/v1/auth/logout");
}

export async function logoutAll(): Promise<void> {
  await api.post("/api/v1/auth/logout-all");
}
