import { useState } from "react";
import { Sparkles, Copy, Send, Check } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

interface SuggestedReplyEditorProps {
  initialReply: string;
  isGenerating: boolean;
  onSend: (reply: string) => void;
  onRegenerate: () => void;
}

export function SuggestedReplyEditor({ initialReply, isGenerating, onSend, onRegenerate }: SuggestedReplyEditorProps) {
  const [reply, setReply] = useState(initialReply);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isGenerating) {
    return (
      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px] gap-4">
        <Sparkles className="w-8 h-8 text-[var(--accent-primary)] animate-pulse" />
        <p className="text-[var(--text-secondary)] font-medium">Generating AI response...</p>
      </div>
    );
  }

  if (!reply) {
    return (
      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center gap-4">
        <div className="bg-[var(--accent-glow)] p-3 rounded-full">
          <Sparkles className="w-6 h-6 text-[var(--accent-primary)]" />
        </div>
        <div>
          <h4 className="text-[var(--text-primary)] font-medium mb-1">AI Suggested Reply</h4>
          <p className="text-sm text-[var(--text-secondary)] max-w-sm mb-4">
            Generate a context-aware response based on the customer's message history and knowledge base.
          </p>
          <Button onClick={onRegenerate} variant="outline" className="gap-2">
            <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
            Generate Reply
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--accent-primary)]/30 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-[var(--accent-glow)]/50 px-4 py-2 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2 text-[var(--accent-primary)] text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          AI Suggestion
        </div>
        <Button variant="link" size="sm" onClick={onRegenerate} className="text-xs">
          Regenerate
        </Button>
      </div>
      
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="w-full min-h-[160px] p-4 bg-transparent text-[var(--text-primary)] resize-y focus:outline-none focus:ring-0 border-none"
        placeholder="Edit the suggested reply..."
      />
      
      <div className="px-4 py-3 bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)] flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleCopy}
          className="gap-2 text-[var(--text-secondary)]"
        >
          {copied ? <Check className="w-4 h-4 text-[var(--success)]" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy to clipboard"}
        </Button>
        <Button 
          onClick={() => onSend(reply)}
          className="gap-2"
        >
          <Send className="w-4 h-4" />
          Send Reply
        </Button>
      </div>
    </div>
  );
}
