import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { env } from "@/config/env";
import { useVerifyResetCode } from "../hooks/useVerifyResetCode";
import { Button } from "@/shared/components/ui/Button";

export function VerifyResetCodePage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email || "your email";
  const userId = (location.state as { userId?: string } | null)?.userId || "";
  
  const { verifyCode, isVerifying, resendCode, isResending } = useVerifyResetCode();

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
    const code = otp.join("");
    if (code.length !== 6) {
      return; 
    }
    await verifyCode({ userId, code }).catch(() => undefined);
  };

  const handleResend = async () => {
    if (timeLeft === 0) {
      await resendCode(email).catch(() => undefined);
      setTimeLeft(60);
    }
  };

  const handleBack = () => {
    navigate("/forgot-password");
  };

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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
        <div className="w-full bg-[var(--bg-surface)] p-8 rounded-xl border border-[var(--border-subtle)] shadow-sm flex flex-col items-center text-center space-y-6 relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-[var(--accent-glow)] flex items-center justify-center text-[var(--accent-primary)] z-10">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2 z-10">
            <h1 className="font-display text-2xl font-bold leading-tight text-[var(--text-primary)]">Enter reset code</h1>
            <p className="text-sm text-[var(--text-secondary)]">
              We sent a code to <span className="font-medium text-[var(--text-primary)]">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-8 z-10">
            <div className="grid grid-cols-6 gap-2 w-full">
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
                  aria-label={`Digit ${idx + 1}`}
                  className="w-full h-14 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-center font-mono text-2xl font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all placeholder-[var(--text-muted)] shadow-sm"
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button
                type="submit"
                className="w-full"
                size="md"
                isLoading={isVerifying}
                disabled={otp.join("").length !== 6}
              >
                Verify Code
              </Button>
              
              <div className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
                <span>Didn't receive the code?</span>
                {timeLeft > 0 ? (
                  <span className="text-[var(--accent-primary)] font-semibold">Resend in {formatTime()}</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResending}
                    className="text-[var(--accent-primary)] font-semibold hover:underline transition-colors focus:outline-none"
                  >
                    {isResending ? "Resending..." : "Resend code"}
                  </button>
                )}
              </div>
            </div>
          </form>

          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors group z-10 mt-4 focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
}
