import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignTicket } from "@/api/tickets";
import { toast } from "sonner";

export const useAssignTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, agentId }: { id: string; agentId: string }) => assignTicket(id, agentId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.invalidateQueries({ queryKey: ["tickets", variables.id] });
      toast.success("Agent assigned successfully");
    },
    onError: () => {
      toast.error("Failed to assign agent");
    }
  });
};
