import { LockKeyhole, Mail, Bolt, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import { env } from "@/config/env";
import { useAppSelector } from "@/lib/redux/hooks";
import { Button } from "@/shared/components/ui/Button";
import { TextField } from "@/shared/components/ui/TextField";
import { useAuth } from "../hooks/useAuth";
import { useCallback, useState } from "react";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { getDefaultRouteForRole } from "@/app/routes/roleRoutes";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, googleLogin, isLoggingIn, isGoogleLoggingIn } = useAuth();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const from = (location.state as { from?: Location } | null)?.from?.pathname;
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const result = await login(values).catch(() => null);
    if (!result) return;

    if ("needsVerification" in result) {
      navigate("/verify-otp", { state: { email: values.email, userId: result.userId }, replace: true });
      return;
    }

    navigate(from ?? getDefaultRouteForRole(result.user.role), { replace: true });
  };

  const handleGoogleCredential = useCallback(async (idToken: string) => {
    const result = await googleLogin({ idToken }).catch(() => null);
    if (!result) return;
    navigate(from ?? getDefaultRouteForRole(result.user.role), { replace: true });
  }, [from, googleLogin, navigate]);

  if (isAuthenticated) {
    return <Navigate to={from ?? getDefaultRouteForRole(user?.role)} replace />;
  }

  return (
    <div className="min-h-screen w-full bg-[var(--bg-base)] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--accent-glow)] rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--info)] rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--border-subtle)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
      </div>

      <div className="w-full max-w-[420px] z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-[var(--accent-primary)] p-2 rounded-lg flex items-center justify-center shadow-lg shadow-[var(--accent-primary)]/20">
              <Bolt className="text-[var(--bg-base)] w-6 h-6" strokeWidth={2.5} />
            </div>
            <span className="font-display text-2xl tracking-tight text-[var(--accent-primary)] font-bold">{env.appName}</span>
          </div>
        </div>

        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2">Welcome back</h1>
            <p className="text-[var(--text-secondary)] text-base">Enter your credentials to access your account</p>
          </div>

          <GoogleSignInButton onCredential={handleGoogleCredential} isLoading={isGoogleLoggingIn} />

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">or sign in with email</span>
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              icon={Mail}
              label="Email"
              type="email"
              placeholder="name@company.com"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />

            <TextField
              icon={LockKeyhole}
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              error={errors.password?.message}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-[var(--text-secondary)] transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]/20"
                />
                <label htmlFor="remember-me" className="ml-2 block text-[var(--text-secondary)] text-sm">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button className="w-full mt-2" isLoading={isLoggingIn} type="submit" size="md">
              {!isLoggingIn && "Sign in"}
            </Button>
          </form>

          <div className="mt-8 text-center border-t border-[var(--border-subtle)] pt-6">
            <p className="text-[var(--text-secondary)] text-sm">
              Don't have an account?{" "}
              <Link to="/register?role=business" className="font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-[var(--text-muted)]">
          Sessions are restored through the backend refresh cookie and protected routes use the latest account role.
        </p>
      </div>
    </div>
  );
}
