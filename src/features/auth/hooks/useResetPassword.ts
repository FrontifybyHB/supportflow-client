import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const navigate = useNavigate();

  const resetMutation = useMutation({
    mutationFn: ({ userId, otp, newPassword }: { userId: string; otp: string; newPassword: string }) =>
      resetPassword(userId, otp, newPassword),
    onSuccess: () => {
      toast.success("Password updated successfully");
      navigate("/login");
    },
    onError: () => {
      toast.error("Failed to update password");
    }
  });

  return {
    resetPassword: resetMutation.mutateAsync,
    isResetting: resetMutation.isPending,
  };
};
