export type MessageSender = "customer" | "agent" | "system";

export interface Message {
  _id: string;
  sender: MessageSender;
  senderId?: string; // agentId or customerId
  text: string;
  createdAt: string;
}

export interface Conversation {
  _id: string;
  businessId: string;
  customerId: string;
  customerName?: string;
  messages: Message[];
  status: "active" | "closed";
  ticketId?: string;
  customerEmail?: string;
  priority?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationsResponse {
  success: boolean;
  data: Conversation[];
}
