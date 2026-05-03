import { useMutation } from "@tanstack/react-query";
import { createWorkspace, type CreateWorkspaceInput } from "@/api/workspace";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useCreateWorkspace = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (input: CreateWorkspaceInput) => createWorkspace(input),
    onSuccess: () => {
      toast.success("Workspace created successfully");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Failed to create workspace");
    }
  });
};
