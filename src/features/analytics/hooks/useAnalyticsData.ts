import { useQuery } from "@tanstack/react-query";
import { getBusinessStats } from "@/api/business";
import { getAiSelection, getFeedbackAnalytics } from "@/api/analytics";

export const useAnalyticsData = () => {
  const stats = useQuery({ queryKey: ["business", "stats"], queryFn: getBusinessStats });
  const feedback = useQuery({ queryKey: ["feedback", "analytics"], queryFn: getFeedbackAnalytics });
  const aiSelection = useQuery({ queryKey: ["business-ai", "selection"], queryFn: getAiSelection });

  return {
    stats,
    feedback,
    aiSelection,
    isLoading: stats.isLoading || feedback.isLoading || aiSelection.isLoading,
  };
};
