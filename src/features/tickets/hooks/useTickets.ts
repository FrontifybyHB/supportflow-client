import { useQuery } from "@tanstack/react-query";
import { getTickets } from "@/api/tickets";
import type { TicketFilters } from "../types/ticket.types";

export const useTickets = (filters: TicketFilters) => {
  return useQuery({
    queryKey: ["tickets", filters],
    queryFn: () => getTickets(filters),
    staleTime: 30_000,
  });
};
