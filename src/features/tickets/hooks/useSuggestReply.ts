import { useMutation } from "@tanstack/react-query";
import { suggestReply } from "@/api/tickets";
import { toast } from "sonner";

export const useSuggestReply = () => {
  return useMutation({
    mutationFn: (id: string) => {
      void id;
      return suggestReply();
    },
    onSuccess: () => {
      toast.success("AI suggested reply generated");
    },
    onError: () => {
      toast.error("Suggested reply API is not available in the current backend");
    }
  });
};
