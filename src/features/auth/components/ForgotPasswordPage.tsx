import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Key, Mail, CheckCircle2 } from "lucide-react";
import { env } from "@/config/env";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { Button } from "@/shared/components/ui/Button";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { sendResetCode, isSending } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    const result = await sendResetCode(email).catch(() => null);
    if (!result) return;
    
    // We update local state to show the success view
    setIsSubmitted(true);
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

      <div className="w-full max-w-[420px] z-10">
        <div className="w-full bg-[var(--bg-surface)] p-8 rounded-xl border border-[var(--border-subtle)] shadow-sm relative overflow-hidden">
          
          {!isSubmitted ? (
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center text-center space-y-2 mb-8">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-glow)] flex items-center justify-center text-[var(--accent-primary)] z-10 mb-2">
                  <Key className="w-6 h-6" />
                </div>
                <h1 className="font-display text-2xl font-bold leading-tight text-[var(--text-primary)]">Forgot password?</h1>
                <p className="text-sm text-[var(--text-secondary)]">Enter your email and we'll send a reset code</p>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-6 z-10">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[var(--text-secondary)] block">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-[var(--text-muted)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all placeholder-[var(--text-muted)] text-[var(--text-primary)]"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="md"
                  isLoading={isSending}
                >
                  Send reset code
                </Button>
              </form>

              <div className="mt-8 text-center w-full pt-4 border-t border-[var(--border-subtle)]">
                <Link to="/login" className="text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors inline-flex items-center">
                  Remember it? Sign in
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[var(--success)]/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-[var(--success)]" />
              </div>
              <h1 className="font-display text-2xl font-bold leading-tight text-[var(--text-primary)] mb-2">Check your inbox</h1>
              <p className="text-sm text-[var(--text-secondary)] mb-8">
                We've sent a password reset link to <span className="font-semibold text-[var(--text-primary)]">{email}</span>. Please follow the instructions in the email.
              </p>
              
              {/* In our flow, we actually navigated to /verify-reset-code in the hook.
                  But if we want to show this success state first, we could provide a button 
                  to manually go to verify code or just navigate back to login. */}
              <Link to="/verify-reset-code" state={{ email }} className="w-full">
                <Button className="w-full" size="md">
                  Enter Reset Code
                </Button>
              </Link>
              
              <Link to="/login" className="mt-4 w-full text-center text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Back to login
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
