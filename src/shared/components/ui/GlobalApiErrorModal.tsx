import { useEffect, useState } from "react";
import { AlertTriangle, RefreshCw, X } from "lucide-react";
import { subscribeToApiNetworkErrors, type ApiNetworkErrorEvent } from "@/api/errorEvents";
import { Button } from "./Button";

export function GlobalApiErrorModal() {
  const [error, setError] = useState<ApiNetworkErrorEvent | null>(null);

  useEffect(() => subscribeToApiNetworkErrors(setError), []);

  if (!error) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-[var(--error)]/10 p-2 text-[var(--error)]">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">{error.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{error.message}</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close network error"
            onClick={() => setError(null)}
            className="rounded-lg p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setError(null)}>
            Dismiss
          </Button>
          {error.retry && (
            <Button
              onClick={() => {
                error.retry?.();
                setError(null);
              }}
            >
              <RefreshCw size={16} />
              Retry
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
