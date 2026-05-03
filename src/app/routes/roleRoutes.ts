import type { User } from "@/features/auth/types/auth.types";

export function getDefaultRouteForRole(role?: User["role"] | null) {
  switch (role) {
    case "superadmin":
      return "/businesses";
    case "admin":
      return "/dashboard";
    case "agent":
      return "/tickets";
    case "customer":
      return "/demo";
    default:
      return "/dashboard";
  }
}
