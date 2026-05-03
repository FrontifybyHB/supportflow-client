import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "@/api/auth";
import { toast } from "sonner";

export const useForgotPassword = () => {
  const forgotMutation = useMutation({
    mutationFn: (email: string) => requestPasswordReset(email),
    onSuccess: () => {
      toast.success("Reset code sent");
      // Intentionally not auto-navigating so the success view in the component shows
    },
    onError: () => {
      toast.error("Failed to send reset code");
    }
  });

  return {
    sendResetCode: forgotMutation.mutateAsync,
    isSending: forgotMutation.isPending,
  };
};
