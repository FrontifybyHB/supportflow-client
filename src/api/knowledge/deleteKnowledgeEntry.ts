import { getKnowledgeEntries } from "./getKnowledgeEntries";
import { getBusinessProfile, updateBusinessProfile } from "@/api/business";
import { toBackendKnowledgeEntry } from "./knowledgeMappers";

export async function deleteKnowledgeEntry(id: string): Promise<{ success: boolean }> {
  const current = await getKnowledgeEntries();
  const business = await getBusinessProfile();
  await updateBusinessProfile({
    ...business,
    knowledgeBase: current.data.filter((entry) => entry._id !== id).map(toBackendKnowledgeEntry),
  });
  return { success: true };
}
