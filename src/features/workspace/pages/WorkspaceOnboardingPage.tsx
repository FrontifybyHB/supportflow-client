import React, { useState } from "react";
import { Store, ChevronDown, ArrowRight, Bolt } from "lucide-react";
import { env } from "@/config/env";
import { Button } from "@/shared/components/ui/Button";
import { useCreateWorkspace } from "../hooks/useCreateWorkspace";

export function WorkspaceOnboardingPage() {
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const { mutate: createWorkspace, isPending } = useCreateWorkspace();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !industry) return;
    createWorkspace({ name: businessName, industry });
  };

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

        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-8 shadow-2xl flex flex-col gap-6">
          <div className="flex justify-center items-center gap-3">
            <div className="h-1.5 w-6 rounded-full bg-[var(--accent-primary)]"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--border-default)]"></div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Set up your workspace</h1>
            <p className="text-[var(--text-secondary)] text-sm">Tell us about your business</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-2">
              <label htmlFor="business_name" className="text-sm font-medium text-[var(--text-secondary)]">
                Business Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[var(--text-muted)] group-focus-within:text-[var(--accent-primary)] transition-colors">
                  <Store size={18} />
                </div>
                <input
                  id="business_name"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all placeholder-[var(--text-muted)]"
                  placeholder="Acme Corp"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="industry" className="text-sm font-medium text-[var(--text-secondary)]">
                Industry
              </label>
              <div className="relative group">
                <select
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full h-11 px-4 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all appearance-none"
                  required
                >
                  <option disabled value="">Select an industry</option>
                  <option value="technology">Technology</option>
                  <option value="retail">Retail</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[var(--text-muted)] group-focus-within:text-[var(--accent-primary)] transition-colors">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            <div className="w-full h-32 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] overflow-hidden relative">
              <img
                alt="Corporate Analytics"
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQEpqcyVWzUXrqMFPzspG8KHt8jgv42oGtwYRqaviVScKwh_1Yrv1X8lATjl-TXlB4tj_PA-8QotSpEstamRjdJGsbCu2T3_YD2sVhXRFz9foNC4LkUo6wrokBeqrFcKge0CburnlY1IwmBmSkTXFFiqfirvPLTfY2uxOeutJdO7XnErarE1kg1YLWpW3EuTdqB_T-38wd5q-9pb7OyIBDxaVJQ2zfCSPNkJb09d_ge81foyqEgJRR8tQBbhCZ4yICJzpmw_Sc9uie"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] to-transparent opacity-80"></div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="md"
              isLoading={isPending}
            >
              {!isPending && (
                <>
                  Continue
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </Button>
          </form>
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
          </div>
        </div>
      </div>
    </div>
  );
}
