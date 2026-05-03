export interface KnowledgeEntry {
  _id: string;
  businessId: string;
  title: string;
  content: string;
  category?: string;
  tags: string[];
  isActive: boolean;
  isPublished: boolean;
  authorId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateKnowledgeInput {
  title: string;
  content: string;
  category?: string;
  tags: string[];
  isActive?: boolean;
  isPublished?: boolean;
}

export interface UpdateKnowledgeInput extends Partial<CreateKnowledgeInput> {
  _id: string;
}

export interface KnowledgeResponse {
  success: boolean;
  data: KnowledgeEntry[];
}
