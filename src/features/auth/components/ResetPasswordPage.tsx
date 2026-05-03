import React, { useState } from "react";
import { useLocation, Link, useSearchParams } from "react-router-dom";
import { Lock, ArrowLeft, Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { env } from "@/config/env";
import { useResetPassword } from "../hooks/useResetPassword";
import { Button } from "@/shared/components/ui/Button";
import { TextField } from "@/shared/components/ui/TextField";

type ResetPasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
};

export function ResetPasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId") || (location.state as { userId?: string } | null)?.userId || "";
  const otp = searchParams.get("otp") || (location.state as { otp?: string } | null)?.otp || "";
  
  const { resetPassword, isResetting } = useResetPassword();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ResetPasswordFormValues>({
    defaultValues: { newPassword: "", confirmPassword: "" }
  });

  const newPassword = useWatch({ control, name: "newPassword" }) || "";

  // Password strength criteria
  const hasMinLength = newPassword.length >= 8;
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSymbol = /[^A-Za-z0-9]/.test(newPassword);
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const strengthScore = [hasMinLength, hasNumber, hasSymbol, hasUppercase, hasLowercase].filter(Boolean).length;

  const getStrengthColor = (index: number) => {
    if (index < strengthScore) return "bg-[var(--success)]";
    if (index === strengthScore && strengthScore > 0) return "bg-[var(--warning)]";
    return "bg-[var(--border-default)]";
  };

  const onSubmit = async (values: { newPassword: string; confirmPassword: string }) => {
    if (strengthScore < 3 || !userId || !otp) {
      return; 
    }
    await resetPassword({ userId, otp, newPassword: values.newPassword }).catch(() => undefined);
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg-base)] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--border-subtle)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center h-14 w-full px-6 bg-transparent antialiased">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-[var(--text-primary)] font-display">{env.appName}</span>
        </div>
      </header>

      <div className="w-full max-w-[420px] z-10 flex flex-col items-center">
        <div className="w-full bg-[var(--bg-surface)] p-8 rounded-xl border border-[var(--border-subtle)] shadow-sm flex flex-col items-center space-y-6 relative overflow-hidden">
          
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent-glow)] flex items-center justify-center text-[var(--accent-primary)] z-10 mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl font-bold leading-tight text-[var(--text-primary)]">Set new password</h1>
            <p className="text-sm text-[var(--text-secondary)]">Choose a strong password for your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 z-10">
            {(!userId || !otp) && (
              <div className="rounded-lg border border-[var(--warning)]/30 bg-[var(--warning)]/10 p-3 text-sm text-[var(--warning)]">
                Reset credentials are missing. Open the reset link from your email or return to the reset-code step.
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <TextField
                icon={Lock}
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                placeholder="••••••••"
                error={errors.newPassword?.message}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="hover:text-[var(--text-secondary)] transition-colors focus:outline-none"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />

              <div className="mt-2 space-y-3 p-4 bg-[var(--bg-elevated)] rounded-lg border border-[var(--border-subtle)]">
                <div className="flex gap-1.5 h-1.5 w-full">
                  {[0, 1, 2, 3].map((idx) => (
                    <div key={idx} className={`flex-1 ${getStrengthColor(idx)} rounded-full transition-colors duration-300`}></div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-tight text-[var(--text-secondary)]">
                    {hasMinLength ? <CheckCircle2 size={14} className="text-[var(--success)]" /> : <Circle size={14} className="text-[var(--text-muted)]" />}
                    <span>8+ characters</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-tight text-[var(--text-secondary)]">
                    {hasNumber ? <CheckCircle2 size={14} className="text-[var(--success)]" /> : <Circle size={14} className="text-[var(--text-muted)]" />}
                    <span>One number</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-tight text-[var(--text-secondary)]">
                    {hasSymbol ? <CheckCircle2 size={14} className="text-[var(--success)]" /> : <Circle size={14} className="text-[var(--text-muted)]" />}
                    <span>One symbol</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-tight text-[var(--text-secondary)]">
                    {hasUppercase ? <CheckCircle2 size={14} className="text-[var(--success)]" /> : <Circle size={14} className="text-[var(--text-muted)]" />}
                    <span>Upper case</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-tight text-[var(--text-secondary)]">
                    {hasLowercase ? <CheckCircle2 size={14} className="text-[var(--success)]" /> : <Circle size={14} className="text-[var(--text-muted)]" />}
                    <span>Lower case</span>
                  </div>
                </div>
              </div>
            </div>

            <TextField
              icon={Lock}
              label="Confirm New Password"
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
                validate: (val, values) => values.newPassword === val || "Passwords do not match",
              })}
            />

            <Button
              type="submit"
              className="w-full mt-2"
              size="md"
              isLoading={isResetting}
              disabled={strengthScore < 3 || !userId || !otp}
            >
              Update password
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] w-full text-center z-10">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors focus:outline-none group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
