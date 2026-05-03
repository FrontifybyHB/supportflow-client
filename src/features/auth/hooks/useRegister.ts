import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { register, type RegisterInput } from "@/api/auth";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: (input: RegisterInput) => register(input),
    onSuccess: (result, variables) => {
      toast.success("Account created! Please verify your email.");
      navigate("/verify-otp", { state: { email: variables.email, userId: result.userId } });
    },
    onError: () => {
      toast.error("Unable to create account");
    },
  });

  return {
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
  };
}
