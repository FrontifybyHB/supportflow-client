export interface Business {
  _id: string;
  name: string;
  industry?: string;
  description?: string;
  ownerId?: string;
  owner?: {
    name?: string;
    email?: string;
  };
  agentCount?: number;
  counts?: {
    totalAgents?: number;
    totalCustomers?: number;
    totalTickets?: number;
    openTickets?: number;
    resolvedTickets?: number;
    kbEntries?: number;
    aiHandledRate?: string;
  };
  settings?: Record<string, unknown>;
  knowledgeBase?: Array<{
    _id?: string;
    title: string;
    content: string;
    tags?: string[];
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }>;
  plan?: "free" | "pro" | string;
  isActive?: boolean;
  suspensionReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BusinessStats {
  totalAgents: number;
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  totalCustomers: number;
  aiHandledRate: string;
}

export type CreateBusinessInput = {
  name: string;
  industry: string;
  description?: string;
};
