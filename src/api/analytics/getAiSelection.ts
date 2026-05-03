import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";
import type { AiModel } from "./getAiModels";

export interface AiSelection {
  businessId: string;
  source: "business" | "platform_default";
  model: AiModel | null;
}

export async function getAiSelection(): Promise<AiSelection> {
  const { data } = await api.get<ApiEnvelope<AiSelection>>("/api/business-ai/selection");
  return unwrapApiData(data);
}
