import { LockKeyhole, Mail, User, Bolt, Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { env } from "@/config/env";
import { Button } from "@/shared/components/ui/Button";
import { TextField } from "@/shared/components/ui/TextField";
import { useRegister } from "../hooks/useRegister";
import { useCallback, useState } from "react";
import type { RegisterInput } from "@/api/auth";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { useAuth } from "../hooks/useAuth";
import { getDefaultRouteForRole } from "@/app/routes/roleRoutes";

type RegisterFormValues = RegisterInput & { confirmPassword: string };

export function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerApi, isRegistering } = useRegister();
  const { googleLogin, isGoogleLoggingIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegisterFormValues>();

  const password = useWatch({ control, name: "password" }) || "";

  // Password strength criteria
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const strengthScore = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar].filter(Boolean).length;

  const getStrengthColor = (index: number) => {
    if (index < strengthScore) return "bg-[var(--success)]";
    if (index === strengthScore && strengthScore > 0) return "bg-[var(--warning)]";
    return "bg-[var(--border-default)]";
  };

  const onSubmit = async (values: RegisterInput) => {
    await registerApi({ name: values.name, email: values.email, password: values.password }).catch(() => undefined);
  };

  const handleGoogleCredential = useCallback(async (idToken: string) => {
    const session = await googleLogin({ idToken }).catch(() => null);
    if (!session) return;
    const destination = session.user.role === "admin" && !session.user.businessId ? "/onboarding" : getDefaultRouteForRole(session.user.role);
    navigate(destination, { replace: true });
  }, [googleLogin, navigate]);

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
            <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2">Create an account</h1>
            <p className="text-[var(--text-secondary)] text-base">Start automating your customer support today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <TextField
              icon={User}
              label="Full Name"
              type="text"
              placeholder="John Doe"
              error={errors.name?.message}
              {...register("name", {
                required: "Name is required",
              })}
            />

            <TextField
              icon={Mail}
              label="Email Address"
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

            <div className="flex flex-col gap-1.5">
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
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: {
                    uppercase: (value) => /[A-Z]/.test(value) || "Password needs one uppercase letter",
                    lowercase: (value) => /[a-z]/.test(value) || "Password needs one lowercase letter",
                    number: (value) => /[0-9]/.test(value) || "Password needs one number",
                    special: (value) => /[^A-Za-z0-9]/.test(value) || "Password needs one special character",
                  },
                })}
              />

              {/* Password strength indicator */}
              <div className="mt-2 space-y-3">
                <div className="flex gap-1 h-1.5 w-full">
                  {[0, 1, 2, 3].map((idx) => (
                    <div key={idx} className={`flex-1 ${getStrengthColor(idx)} rounded-full transition-colors duration-300`}></div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="flex items-center gap-2 text-[12px]">
                    {hasMinLength ? <CheckCircle2 size={14} className="text-[var(--success)]" /> : <Circle size={14} className="text-[var(--text-muted)]" />}
                    <span className={hasMinLength ? "text-[var(--text-secondary)]" : "text-[var(--text-muted)]"}>8+ characters</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                    {hasUppercase ? <CheckCircle2 size={14} className="text-[var(--success)]" /> : <Circle size={14} className="text-[var(--text-muted)]" />}
                    <span className={hasUppercase ? "text-[var(--text-secondary)]" : "text-[var(--text-muted)]"}>Uppercase</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                    {hasLowercase ? <CheckCircle2 size={14} className="text-[var(--success)]" /> : <Circle size={14} className="text-[var(--text-muted)]" />}
                    <span className={hasLowercase ? "text-[var(--text-secondary)]" : "text-[var(--text-muted)]"}>Lowercase</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                    {hasNumber ? <CheckCircle2 size={14} className="text-[var(--success)]" /> : <Circle size={14} className="text-[var(--text-muted)]" />}
                    <span className={hasNumber ? "text-[var(--text-secondary)]" : "text-[var(--text-muted)]"}>One number</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                    {hasSpecialChar ? <CheckCircle2 size={14} className="text-[var(--success)]" /> : <Circle size={14} className="text-[var(--text-muted)]" />}
                    <span className={hasSpecialChar ? "text-[var(--text-secondary)]" : "text-[var(--text-muted)]"}>Special char</span>
                  </div>
                </div>
              </div>
            </div>

            <TextField
              icon={LockKeyhole}
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="hover:text-[var(--text-secondary)] transition-colors focus:outline-none"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val, values) => values.password === val || "Passwords do not match",
              })}
            />

            <Button className="w-full mt-2" isLoading={isRegistering} type="submit" size="md">
              {!isRegistering && "Create account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center mt-6 mb-6">
            <div className="flex-grow border-t border-[var(--border-subtle)]"></div>
            <span className="flex-shrink mx-4 text-[var(--text-muted)] text-[12px] uppercase font-bold tracking-widest">or</span>
            <div className="flex-grow border-t border-[var(--border-subtle)]"></div>
          </div>

          <GoogleSignInButton onCredential={handleGoogleCredential} isLoading={isGoogleLoggingIn} text="signup_with" />

          <div className="mt-8 text-center pt-2">
            <p className="text-[var(--text-secondary)] text-sm flex justify-center items-center gap-1">
              Already have an account?{" "}
              <Link to="/login/workspace" className="font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors inline-flex items-center">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
