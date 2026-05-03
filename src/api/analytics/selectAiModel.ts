import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";

export async function selectAiModel(modelId: string): Promise<unknown> {
  const { data } = await api.patch<ApiEnvelope<unknown>>("/api/business-ai/selection", { modelId });
  return unwrapApiData(data);
}
