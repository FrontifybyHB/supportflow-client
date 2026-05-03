import { useQuery } from "@tanstack/react-query";
import { getKnowledgeEntries } from "@/api/knowledge";

export const useKnowledgeEntries = () => {
  return useQuery({
    queryKey: ["knowledge"],
    queryFn: getKnowledgeEntries,
    staleTime: 60_000,
  });
};
