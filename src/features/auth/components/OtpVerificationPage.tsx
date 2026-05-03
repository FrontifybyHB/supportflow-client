import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, ArrowLeft, Bolt } from "lucide-react";
import { env } from "@/config/env";
import { useVerifyOtp } from "../hooks/useVerifyOtp";
import { Button } from "@/shared/components/ui/Button";

export function OtpVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email || "your email";
  const userId = (location.state as { userId?: string } | null)?.userId || "";
  
  const { verifyOtp, isVerifying, resendOtp, isResending } = useVerifyOtp();

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    // Only allow single digit numbers
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input if value is entered and not last
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move focus to previous input on backspace and current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];
    pasteData.forEach((char, idx) => {
      if (idx < 6 && /^\d$/.test(char)) newOtp[idx] = char;
    });
    setOtp(newOtp);
    // Focus last filled or first empty
    let lastFilledIndex = -1;
    for (let idx = newOtp.length - 1; idx >= 0; idx -= 1) {
      if (newOtp[idx] !== "") {
        lastFilledIndex = idx;
        break;
      }
    }
    const focusIndex = lastFilledIndex === 5 ? 5 : lastFilledIndex + 1;
    if (inputRefs.current[focusIndex]) inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      return; // Could show inline error
    }
    await verifyOtp({ userId, otp: otpCode }).catch(() => undefined);
  };

  const handleResend = async () => {
    if (timeLeft === 0) {
      await resendOtp(userId).catch(() => undefined);
      setTimeLeft(60);
    }
  };

  const handleWrongEmail = () => {
    navigate("/register");
  };

  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen w-full bg-[var(--bg-base)] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--accent-glow)] rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--info)] rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--border-subtle)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
      </div>

      <div className="w-full max-w-[420px] z-10 flex flex-col items-center">
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-[var(--accent-primary)] p-2 rounded-lg flex items-center justify-center shadow-lg shadow-[var(--accent-primary)]/20">
              <Bolt className="text-[var(--bg-base)] w-6 h-6" strokeWidth={2.5} />
            </div>
            <span className="font-display text-2xl tracking-tight text-[var(--accent-primary)] font-bold">{env.appName}</span>
          </div>
        </div>

        <div className="w-full bg-[var(--bg-surface)] p-8 rounded-xl border border-[var(--border-subtle)] shadow-2xl flex flex-col items-center text-center">
          {/* Mail Icon Header */}
          <div className="w-16 h-16 bg-[var(--accent-glow)] rounded-full flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-[var(--accent-primary)]" />
          </div>

          {/* Heading Section */}
          <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2">Check your email</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-8">
            We sent a 6-digit code to <span className="font-medium text-[var(--text-primary)]">{email}</span>
          </p>

          {/* OTP Input Section */}
          <form onSubmit={handleSubmit} className="w-full space-y-8">
            <div className="flex justify-between gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={idx === 0 ? handlePaste : undefined}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  className="w-12 h-14 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-center font-mono text-2xl font-semibold text-[var(--accent-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all placeholder-[var(--text-muted)]"
                  placeholder="0"
                />
              ))}
            </div>
            <Button
              type="submit"
              className="w-full"
              size="md"
              isLoading={isVerifying}
              disabled={otp.join("").length !== 6}
            >
              Verify Email
            </Button>
          </form>

          {/* Resend Timer */}
          <div className="mt-6">
            {timeLeft > 0 ? (
              <p className="text-sm text-[var(--text-muted)]">
                Resend OTP in <span className="font-mono">{formattedTime}</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="text-sm text-[var(--accent-primary)] hover:text-[var(--accent-hover)] font-medium transition-colors"
              >
                {isResending ? "Resending..." : "Resend code"}
              </button>
            )}
          </div>

          {/* Footer Link */}
          <div className="mt-8 border-t border-[var(--border-subtle)] w-full pt-6">
            <button
              onClick={handleWrongEmail}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center justify-center gap-1 w-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Wrong email? Start over
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
