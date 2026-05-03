import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTicket } from "@/api/tickets";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type CreateTicketInput = {
  businessId: string;
  message: string;
  subject?: string;
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (input: CreateTicketInput) => createTicket(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket created successfully");
      navigate("/tickets");
    },
    onError: () => {
      toast.error("Failed to create ticket");
    }
  });
};
