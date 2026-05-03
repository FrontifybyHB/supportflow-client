import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { clearAccessToken, setAccessToken } from "@/api/config";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { googleLogin, login, logout } from "@/api/auth";
import { clearSession, setSession } from "../store/authSlice";
import type { GoogleLoginInput, LoginInput } from "../types/auth.types";

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const loginMutation = useMutation({
    mutationFn: (input: LoginInput) => login(input),
    onSuccess: (result) => {
      if ("needsVerification" in result) {
        toast.info(result.message);
        return;
      }

      setAccessToken(result.accessToken);
      dispatch(setSession(result));
      toast.success("Signed in successfully");
    },
    onError: () => {
      toast.error("Unable to sign in");
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: (input: GoogleLoginInput) => googleLogin(input),
    onSuccess: (session) => {
      setAccessToken(session.accessToken);
      dispatch(setSession(session));
      toast.success("Signed in with Google");
    },
    onError: () => {
      toast.error("Unable to sign in with Google");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearAccessToken();
      dispatch(clearSession());
      toast.info("Signed out");
    },
  });

  return {
    user,
    login: loginMutation.mutateAsync,
    googleLogin: googleLoginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isGoogleLoggingIn: googleLoginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}
