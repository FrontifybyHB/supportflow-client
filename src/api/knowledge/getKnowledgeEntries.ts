import { getBusinessProfile } from "@/api/business";
import type { KnowledgeResponse } from "@/features/knowledge/types/knowledge.types";
import { mapKnowledgeEntry } from "./knowledgeMappers";

export async function getKnowledgeEntries(): Promise<KnowledgeResponse> {
  const business = await getBusinessProfile();
  return {
    success: true,
    data: (business.knowledgeBase ?? []).map((entry, index) => mapKnowledgeEntry(entry, business._id, index)),
  };
}
