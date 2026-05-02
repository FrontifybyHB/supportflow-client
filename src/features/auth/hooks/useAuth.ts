import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { login, logout } from "../api/authApi";
import { clearSession, setSession } from "../store/authSlice";
import type { LoginInput } from "../types/auth.types";

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const loginMutation = useMutation({
    mutationFn: (input: LoginInput) => login(input),
    onSuccess: (session) => {
      dispatch(setSession(session));
      toast.success("Signed in successfully");
    },
    onError: () => {
      toast.error("Unable to sign in");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      dispatch(clearSession());
      toast.info("Signed out");
    },
  });

  return {
    user,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}