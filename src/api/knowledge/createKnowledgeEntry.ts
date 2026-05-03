import { getBusinessProfile, updateBusinessProfile } from "@/api/business";
import type { CreateKnowledgeInput, KnowledgeEntry } from "@/features/knowledge/types/knowledge.types";
import { mapKnowledgeEntry, toBackendKnowledgeEntry } from "./knowledgeMappers";

export async function createKnowledgeEntry(input: CreateKnowledgeInput): Promise<{ success: boolean; data: KnowledgeEntry }> {
  const business = await getBusinessProfile();
  const knowledgeBase = [...(business.knowledgeBase ?? []), toBackendKnowledgeEntry(input)];
  const updatedBusiness = await updateBusinessProfile({ ...business, knowledgeBase });
  const entries = (updatedBusiness.knowledgeBase ?? []).map((entry, index) => mapKnowledgeEntry(entry, updatedBusiness._id, index));
  return { success: true, data: entries[entries.length - 1] };
}
