import { useMutation } from "@tanstack/react-query";
import { verifyOtp, resendOtp } from "@/api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "@/api/config";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setSession } from "../store/authSlice";

export const useVerifyOtp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const verifyMutation = useMutation({
    mutationFn: ({ userId, otp }: { userId: string; otp: string }) => verifyOtp(userId, otp),
    onSuccess: (session) => {
      setAccessToken(session.accessToken);
      dispatch(setSession(session));
      toast.success("Email verified successfully");
      navigate(session.user.businessId ? "/dashboard" : "/onboarding");
    },
    onError: () => {
      toast.error("Invalid verification code");
    }
  });

  const resendMutation = useMutation({
    mutationFn: (userId: string) => resendOtp(userId),
    onSuccess: () => {
      toast.success("Verification code resent");
    },
    onError: () => {
      toast.error("Failed to resend code");
    }
  });

  return {
    verifyOtp: verifyMutation.mutateAsync,
    isVerifying: verifyMutation.isPending,
    resendOtp: resendMutation.mutateAsync,
    isResending: resendMutation.isPending,
  };
};
