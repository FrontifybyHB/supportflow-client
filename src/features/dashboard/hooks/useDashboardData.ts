import { useQuery } from "@tanstack/react-query";
import { getBusinessStats } from "@/api/business";
import { getBusinesses, getPlatformStats } from "@/api/superadmin";
import { getTickets } from "@/api/tickets";

export const useDashboardData = (isSuperadmin: boolean) => {
  const platformStats = useQuery({ queryKey: ["superadmin", "stats"], queryFn: getPlatformStats, enabled: isSuperadmin });
  const businesses = useQuery({ queryKey: ["superadmin", "businesses"], queryFn: getBusinesses, enabled: isSuperadmin });
  const businessStats = useQuery({ queryKey: ["business", "stats"], queryFn: getBusinessStats, enabled: !isSuperadmin });
  const tickets = useQuery({
    queryKey: ["tickets", "dashboard"],
    queryFn: () => getTickets({ page: 1, limit: 5, status: "all" }),
    enabled: !isSuperadmin,
  });

  return {
    platformStats,
    businesses,
    businessStats,
    tickets,
    isLoading: platformStats.isLoading || businesses.isLoading || businessStats.isLoading || tickets.isLoading,
  };
};
