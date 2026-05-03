import { useQuery } from "@tanstack/react-query";
import { getAgents } from "@/api/superadmin";

export const useAgents = () => {
  return useQuery({
    queryKey: ["agents"],
    queryFn: () => getAgents(1, 100),
  });
};
