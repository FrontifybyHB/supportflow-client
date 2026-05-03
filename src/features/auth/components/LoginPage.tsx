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
                <a href="#" className="text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors">
                  Forgot password?
                </a>
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

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-[12px] uppercase tracking-wider font-semibold">
            <div className="h-[1px] w-8 bg-[var(--border-subtle)]"></div>
            Trusted by 2,000+ Teams
            <div className="h-[1px] w-8 bg-[var(--border-subtle)]"></div>
          </div>
          <div className="flex gap-6 opacity-40 grayscale hover:grayscale-0 transition-all">
            <img alt="Acme Corp" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRwqc94hLebnSrKLRdTR-ds1GZXQlAaYTTmTz384xlsvnLTODr8l4VncG7IZgECDyQcetoTW9GSEPg8c1PiK0vDlX43NOjge9r9DgZJDKcwWb8pQaicaGFZmKll3WwtTA3grDWEF70OVqpGE1mZwmv7aauteRh9DjR37uVJUjieBUXAZrGsQaao8I5TCcejw626n9BQdR27VpklWgR4z4I6OFx_oO5HzD-tHJZfcXYI5KM248pcegY7LDNUOvn9n3V6ADNpCTyVkTi" />
            <img alt="Global Logistics" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi1vvXQP75OmLyRQcxXNiTSwOCvGVZcLtfW_mf-ibB8O5g5yMNz-U17Kt-NvWg7nKdMjB5vwAgQ92uwD_M6bGgJ0tWsT-gBGWqDBkwcVgfSbNFE5_p1s76fYMt7aCzwwHLVVLjHiJORYrVyVXuZR-bSABKN0ns1lcV-LY_P2RIqHFnehwyUGhy2QA-kgoxXsg4kxNihvocmDfngiASSN7mebBnufe96YMYUPBWlOXVcuqz4xxkMqvQS3lzi7pfKUacM3y3gUybvtd2" />
            <img alt="Fintech Hub" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-eN_ph8pIlvxj_AdLVJUSlnFQ6S8xtdIVS0Axi3FIXGAJzsiuQf1r6-xkYmPI70ECkDYvJ8C8LNFNcGC661NHHwHDGkZ2H-hlZa1uz-Il0hn0jCqeqgbxqt67YNbaI-ygpbo1Klyu26NGofTwxt85_6kksJ_rwRkEI3fPiDr5vuzP6vz-756V_svSXRFdOQW3nwpaicpqNSAHqkclIAGUbCpk7UrXJtJSfmXxDnWuF9IofjvfMmz87fb3t0vVA8zzj2GiddmqTUAD" />
          </div>
        </div>
      </div>
    </div>
  );
}
