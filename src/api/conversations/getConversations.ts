import { addTicketMessage, getTicketById, getTickets } from "@/api/tickets";
import type { ConversationsResponse, Message } from "@/features/conversations/types/conversation.types";
import type { TicketMessage } from "@/features/tickets/types/ticket.types";

export async function getConversations(): Promise<ConversationsResponse> {
  const tickets = await getTickets({ page: 1, limit: 50, status: "all" });
  return {
    success: true,
    data: tickets.data.tickets.map((ticket) => ({
      _id: ticket._id,
      businessId: ticket.businessId,
      customerId: ticket.customerId ?? ticket.customerEmail ?? ticket._id,
      customerName: ticket.customerName,
      customerEmail: ticket.customerEmail,
      messages: [],
      status: ticket.status === "closed" || ticket.status === "resolved" ? "closed" : "active",
      ticketId: ticket._id,
      priority: ticket.priority,
      category: ticket.category,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    })),
  };
}

export async function sendMessage(conversationId: string, text: string): Promise<{ success: boolean; data: Message }> {
  const response = await addTicketMessage({ ticketId: conversationId, content: text });
  return {
    success: response.success,
    data: mapMessage(response.data),
  };
}

export async function getConversationMessages(conversationId: string): Promise<Message[]> {
  const response = await getTicketById(conversationId);
  return response.data.messages.map(mapMessage);
}

function mapMessage(message: TicketMessage): Message {
  return {
    _id: message._id,
    sender: message.senderType === "customer" ? "customer" : message.senderType === "system" ? "system" : "agent",
    senderId: message.senderId ?? undefined,
    text: message.content,
    createdAt: message.createdAt,
  };
}
