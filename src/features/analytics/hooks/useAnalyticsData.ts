import { useQuery } from "@tanstack/react-query";
import { getBusinessStats } from "@/api/business";
import { getAiSelection, getFeedbackAnalytics } from "@/api/analytics";
import { getTickets } from "@/api/tickets";

export const useAnalyticsData = () => {
  const stats = useQuery({ queryKey: ["business", "stats"], queryFn: getBusinessStats });
  const feedback = useQuery({ queryKey: ["feedback", "analytics"], queryFn: getFeedbackAnalytics });
  const aiSelection = useQuery({ queryKey: ["business-ai", "selection"], queryFn: getAiSelection });
  const tickets = useQuery({ queryKey: ["tickets", "analytics"], queryFn: () => getTickets({ page: 1, limit: 50, status: "all" }) });

  return {
    stats,
    feedback,
    aiSelection,
    tickets,
    isLoading: stats.isLoading || feedback.isLoading || aiSelection.isLoading || tickets.isLoading,
  };
};
