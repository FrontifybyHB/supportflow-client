import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAppSelector } from "@/lib/redux/hooks";
import { createBusinessAgent, getBusinessAgents, type CreateBusinessAgentInput } from "@/api/business";
import { getAgents } from "@/api/superadmin";

export const useAgents = () => {
  const role = useAppSelector((state) => state.auth.user?.role);

  return useQuery({
    queryKey: ["agents", role],
    queryFn: async () => {
      if (role === "superadmin") return getAgents(1, 100);
      const response = await getBusinessAgents();
      return {
        users: response.agents,
        total: response.total ?? response.agents.length,
        page: 1,
        totalPages: 1,
      };
    },
    enabled: Boolean(role),
  });
};

export const useCreateAgent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBusinessAgentInput) => createBusinessAgent(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      queryClient.invalidateQueries({ queryKey: ["business", "stats"] });
      toast.success("Agent created");
    },
    onError: () => {
      toast.error("Unable to create agent. Confirm the backend exposes POST /api/v1/business/agents.");
    },
  });
};
