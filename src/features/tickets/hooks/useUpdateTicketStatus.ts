import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTicketStatus } from "@/api/tickets";
import type { TicketStatus } from "../types/ticket.types";
import { toast } from "sonner";

export const useUpdateTicketStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TicketStatus }) => updateTicketStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.invalidateQueries({ queryKey: ["tickets", variables.id] });
      toast.success(`Ticket status updated to ${variables.status}`);
    },
    onError: () => {
      toast.error("Failed to update ticket status");
    }
  });
};
