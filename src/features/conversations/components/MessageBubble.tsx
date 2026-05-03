import { cn } from "@/shared/utils/cn";
import { Avatar } from "@/shared/components/ui/Avatar";
import type { Message } from "../types/conversation.types";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAgent = message.sender === "agent";
  const isSystem = message.sender === "system";

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <span className="bg-[var(--bg-elevated)] text-[var(--text-muted)] text-xs px-3 py-1 rounded-full">
          {message.text}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-3 my-4", isAgent ? "flex-row-reverse" : "flex-row")}>
      <Avatar 
        initials={isAgent ? "A" : "C"} 
        size="sm" 
        className={cn(isAgent ? "bg-[var(--accent-primary)] text-[var(--bg-base)]" : "")} 
      />
      <div className={cn("max-w-[75%] flex flex-col", isAgent ? "items-end" : "items-start")}>
        <div 
          className={cn(
            "px-4 py-2 rounded-2xl text-sm",
            isAgent 
              ? "bg-[var(--accent-primary)] text-[var(--bg-base)] rounded-tr-sm" 
              : "bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-tl-sm"
          )}
        >
          {message.text}
        </div>
        <span className="text-[10px] text-[var(--text-muted)] mt-1 mx-1">
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
