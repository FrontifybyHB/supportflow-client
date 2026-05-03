import type { Business } from "@/api/business";
import type { CreateKnowledgeInput, KnowledgeEntry } from "@/features/knowledge/types/knowledge.types";

export type BackendKnowledgeEntry = NonNullable<Business["knowledgeBase"]>[number];

export function mapKnowledgeEntry(entry: BackendKnowledgeEntry, businessId: string, index: number): KnowledgeEntry {
  return {
    _id: entry._id ?? `${businessId}-kb-${index}`,
    businessId,
    title: entry.title,
    content: entry.content,
    tags: entry.tags ?? [],
    isActive: entry.isActive ?? true,
    isPublished: entry.isActive ?? true,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
  };
}

export function toBackendKnowledgeEntry(entry: KnowledgeEntry | CreateKnowledgeInput): BackendKnowledgeEntry {
  return {
    _id: "_id" in entry ? entry._id : undefined,
    title: entry.title,
    content: entry.content,
    tags: entry.tags,
    isActive: "isActive" in entry ? entry.isActive ?? entry.isPublished ?? true : entry.isPublished ?? true,
  };
}
