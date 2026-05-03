import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";

export interface ChatMessageInput {
  businessId: string;
  message: string;
  subject?: string;
  conversationId?: string;
  customerName?: string;
  customerEmail?: string;
  priority?: string;
  category?: string;
}

export interface ChatMessageResult {
  reply: string;
  handoff: boolean;
  priority: string;
  category: string;
  confidence?: number;
  reason?: string;
  ticket?: {
    _id?: string;
  };
}

export async function sendChatMessage(input: ChatMessageInput): Promise<ChatMessageResult> {
  const { data } = await api.post<ApiEnvelope<ChatMessageResult>>("/api/chat/message", input);
  return unwrapApiData(data);
}
