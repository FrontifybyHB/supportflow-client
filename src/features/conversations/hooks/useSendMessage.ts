import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "@/api/conversations";

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ conversationId, text }: { conversationId: string; text: string }) => sendMessage(conversationId, text),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["conversations", variables.conversationId, "messages"] });
    }
  });
};
