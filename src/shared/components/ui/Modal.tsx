import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
}>;

export function Modal({ children, isOpen, onClose, title }: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-base)]/80 p-4 backdrop-blur-sm">
      <button aria-label="Close modal" className="absolute inset-0 h-full w-full cursor-default" onClick={onClose} type="button" />
      <div className="relative w-full max-w-2xl rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
          <Button aria-label="Close modal" className="h-8 w-8 p-0" onClick={onClose} variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
