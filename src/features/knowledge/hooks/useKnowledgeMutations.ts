import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createKnowledgeEntry, updateKnowledgeEntry, deleteKnowledgeEntry } from "@/api/knowledge";
import { toast } from "sonner";
import type { CreateKnowledgeInput, UpdateKnowledgeInput } from "../types/knowledge.types";

export const useCreateEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateKnowledgeInput) => createKnowledgeEntry(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["knowledge"] });
      toast.success("Knowledge base entry created");
    },
    onError: () => toast.error("Failed to create entry"),
  });
};

export const useUpdateEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateKnowledgeInput) => updateKnowledgeEntry(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["knowledge"] });
      toast.success("Knowledge base entry updated");
    },
    onError: () => toast.error("Failed to update entry"),
  });
};

export const useDeleteEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteKnowledgeEntry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["knowledge"] });
      toast.success("Knowledge base entry deleted");
    },
    onError: () => toast.error("Failed to delete entry"),
  });
};
