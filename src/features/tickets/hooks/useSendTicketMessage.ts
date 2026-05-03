import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addTicketMessage } from "@/api/tickets";
import type { CreateTicketMessageInput } from "../types/ticket.types";

export const useSendTicketMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTicketMessageInput) => addTicketMessage(input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.invalidateQueries({ queryKey: ["tickets", variables.ticketId] });
      toast.success("Reply sent");
    },
    onError: () => {
      toast.error("Failed to send reply");
    },
  });
};
