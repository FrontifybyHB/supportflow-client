import { useQuery } from "@tanstack/react-query";
import { getTicketById } from "@/api/tickets";

export const useTicketById = (id: string) => {
  return useQuery({
    queryKey: ["tickets", id],
    queryFn: () => getTicketById(id),
    staleTime: 30_000,
  });
};
