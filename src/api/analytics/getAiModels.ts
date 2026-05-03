import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";

export interface AiModel {
  _id: string;
  name: string;
  provider: string;
  description?: string;
  isDefault?: boolean;
  config?: {
    maxTokens?: number;
    temperature?: number;
  };
}

export async function getAiModels(): Promise<AiModel[]> {
  const { data } = await api.get<ApiEnvelope<AiModel[]>>("/api/business-ai/models");
  return unwrapApiData(data);
}
