import { useQuery } from "@tanstack/react-query";
import { getConversationMessages, getConversations } from "@/api/conversations";

export const useConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
    staleTime: 30_000,
  });
};

export const useConversationMessages = (conversationId?: string) => {
  return useQuery({
    queryKey: ["conversations", conversationId, "messages"],
    queryFn: () => getConversationMessages(conversationId ?? ""),
    enabled: Boolean(conversationId),
    staleTime: 15_000,
  });
};
