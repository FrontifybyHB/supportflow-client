export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';
export type TicketStatus = 'open' | 'pending' | 'resolved' | 'closed';
export type Sentiment = 'positive' | 'neutral' | 'negative';

export interface AgentRef {
  _id: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface Ticket {
  _id: string;
  businessId: string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  conversationId?: string;
  title: string;
  summary?: string;
  priority: TicketPriority;
  sentiment: Sentiment;
  status: TicketStatus;
  assignedAgent?: AgentRef;
  aiSuggestedReply?: string;
  updatedBy?: string;
  updatedAt: string;
  createdAt: string;
  category?: string;
  isHandoff?: boolean;
  source?: string;
}

export interface TicketFilters {
  status?: TicketStatus | 'all';
  priority?: TicketPriority | 'all';
  assignedAgent?: string;
  myTicketsOnly?: boolean;
  page?: number;
  limit?: number;
  search?: string;
}

export interface TicketsResponse {
  success: boolean;
  data: {
    tickets: Ticket[];
    total: number;
    page: number;
    totalPages: number;
  };
}

export interface TicketMessage {
  _id: string;
  ticketId: string;
  businessId: string;
  senderType: "customer" | "agent" | "ai" | "system";
  senderId: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketDetailResponse {
  success: boolean;
  data: {
    ticket: Ticket;
    messages: TicketMessage[];
  };
}

export interface CreateTicketMessageInput {
  ticketId: string;
  content: string;
}
