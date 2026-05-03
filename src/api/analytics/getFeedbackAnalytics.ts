import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";

export interface FeedbackAnalytics {
  overview: {
    totalFeedback: number;
    averageRating: number;
    csatScore: number;
    resolutionRate: number;
  };
  byType: Array<Record<string, unknown>>;
  byCategory: Array<Record<string, unknown>>;
}

export async function getFeedbackAnalytics(): Promise<FeedbackAnalytics> {
  const { data } = await api.get<ApiEnvelope<FeedbackAnalytics>>("/api/feedback/analytics");
  return unwrapApiData(data);
}
