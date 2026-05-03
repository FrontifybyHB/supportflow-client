import { useMutation } from "@tanstack/react-query";
import { verifyResetCode, requestPasswordReset } from "@/api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useVerifyResetCode = () => {
  const navigate = useNavigate();

  const verifyMutation = useMutation({
    mutationFn: ({ userId, code }: { userId: string; code: string }) => verifyResetCode(userId, code),
    onSuccess: (_, variables) => {
      toast.success("Code verified successfully");
      navigate("/reset-password", { state: { userId: variables.userId, otp: variables.code } });
    },
    onError: () => {
      toast.error("Invalid verification code");
    }
  });

  const resendMutation = useMutation({
    mutationFn: (email: string) => requestPasswordReset(email),
    onSuccess: () => {
      toast.success("Reset code resent");
    },
    onError: () => {
      toast.error("Failed to resend reset code");
    }
  });

  return {
    verifyCode: verifyMutation.mutateAsync,
    isVerifying: verifyMutation.isPending,
    resendCode: resendMutation.mutateAsync,
    isResending: resendMutation.isPending,
  };
};
