import { getKnowledgeEntries } from "./getKnowledgeEntries";
import { getBusinessProfile, updateBusinessProfile } from "@/api/business";
import type { KnowledgeEntry, UpdateKnowledgeInput } from "@/features/knowledge/types/knowledge.types";
import { mapKnowledgeEntry, toBackendKnowledgeEntry } from "./knowledgeMappers";

export async function updateKnowledgeEntry(input: UpdateKnowledgeInput): Promise<{ success: boolean; data: KnowledgeEntry }> {
  const current = await getKnowledgeEntries();
  const business = await getBusinessProfile();
  const knowledgeBase = current.data.map((entry) =>
    entry._id === input._id ? toBackendKnowledgeEntry({ ...entry, ...input }) : toBackendKnowledgeEntry(entry),
  );
  const updatedBusiness = await updateBusinessProfile({ ...business, knowledgeBase });
  const entries = (updatedBusiness.knowledgeBase ?? []).map((entry, index) => mapKnowledgeEntry(entry, updatedBusiness._id, index));
  return { success: true, data: entries.find((entry) => entry._id === input._id) ?? entries[0] };
}
