import { useMutation } from "@tanstack/react-query";
import { suggestReply } from "@/api/tickets";
import { toast } from "sonner";

export const useSuggestReply = () => {
  return useMutation({
    mutationFn: (id: string) => suggestReply(id),
    onSuccess: () => {
      toast.success("AI suggested reply generated");
    },
    onError: () => {
      toast.error("Failed to generate AI reply");
    }
  });
};
