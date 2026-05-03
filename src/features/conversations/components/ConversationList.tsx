import { cn } from "@/shared/utils/cn";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Badge } from "@/shared/components/ui/Badge";
import type { Conversation } from "../types/conversation.types";

interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
  onSelect: (id: string) => void;
}

export function ConversationList({ conversations, activeId, onSelect }: ConversationListProps) {
  return (
    <div className="flex flex-col divide-y divide-[var(--border-subtle)]">
      {conversations.map((conv) => {
        const lastMessage = conv.messages[conv.messages.length - 1];
        const isActive = activeId === conv._id;

        return (
          <button
            key={conv._id}
            onClick={() => onSelect(conv._id)}
            className={cn(
              "w-full flex items-start gap-3 p-4 text-left transition-colors hover:bg-[var(--bg-elevated)]",
              isActive && "bg-[var(--bg-elevated)] border-l-2 border-[var(--accent-primary)]"
            )}
          >
            <Avatar initials={conv.customerName?.[0] || "C"} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                  {conv.customerName || "Unknown Customer"}
                </span>
                <span className="text-xs text-[var(--text-muted)] shrink-0">
                  {lastMessage ? new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] truncate">
                {lastMessage ? lastMessage.text : "No messages yet"}
              </p>
              {conv.ticketId && (
                <div className="mt-2">
                  <Badge variant="status-open">Ticket: {conv.ticketId}</Badge>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
