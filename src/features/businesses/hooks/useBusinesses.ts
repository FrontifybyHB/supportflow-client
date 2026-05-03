import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getBusinesses, toggleBusiness } from "@/api/superadmin";

export const useBusinesses = () => {
  return useQuery({
    queryKey: ["superadmin", "businesses"],
    queryFn: getBusinesses,
  });
};

export const useToggleBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["superadmin", "businesses"] });
      queryClient.invalidateQueries({ queryKey: ["superadmin", "stats"] });
      toast.success("Business status updated");
    },
    onError: () => {
      toast.error("Failed to update business");
      queryClient.invalidateQueries({ queryKey: ["superadmin", "businesses"] });
    },
  });
};
