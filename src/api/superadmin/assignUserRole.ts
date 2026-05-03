import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { User } from "@/features/auth/types/auth.types";

export async function assignUserRole(input: { userId: string; role: User["role"]; businessId?: string | null }): Promise<User> {
  const { data } = await api.patch<ApiEnvelope<{ user: User }>>(`/api/v1/superadmin/users/${input.userId}/role`, {
    role: input.role,
    businessId: input.businessId,
  });
  return unwrapApiData(data).user;
}
