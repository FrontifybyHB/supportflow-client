import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User as UserIcon, Tag, AlignLeft } from "lucide-react";
import { useTicketById } from "../hooks/useTicketById";
import { useUpdateTicketStatus } from "../hooks/useUpdateTicketStatus";
import { useSuggestReply } from "../hooks/useSuggestReply";
import { useSendTicketMessage } from "../hooks/useSendTicketMessage";
import { useAssignTicket } from "../hooks/useAssignTicket";
import { SuggestedReplyEditor } from "../components/SuggestedReplyEditor";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { Card } from "@/shared/components/ui/Card";
import { useAppSelector } from "@/lib/redux/hooks";
import type { TicketStatus } from "../types/ticket.types";

const TicketDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useTicketById(id || "");
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateTicketStatus();
  const { mutate: suggestReply, isPending: isGeneratingReply, data: suggestionData } = useSuggestReply();
  const { mutate: sendTicketMessage, isPending: isSendingReply } = useSendTicketMessage();
  const { mutate: assignTicket, isPending: isAssigning } = useAssignTicket();
  const user = useAppSelector((state) => state.auth.user);
  if (isLoading || !data) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  const ticket = data.data.ticket;
  const messages = data.data.messages;

  const handleStatusChange = (status: TicketStatus) => {
    updateStatus({ id: ticket._id, status });
  };

  const handleSendReply = (reply: string) => {
    sendTicketMessage({ ticketId: ticket._id, content: reply });
  };

  const handleAssignToMe = () => {
    if (!user?._id) return;
    assignTicket({ id: ticket._id, agentId: user._id });
  };

  const statusVariant = `status-${ticket.status}` as const;
  const priorityVariant = `priority-${ticket.priority}` as const;
  const sentimentVariant = `sentiment-${ticket.sentiment}` as const;
  const suggestedReply = suggestionData?.data?.reply || ticket.aiSuggestedReply || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto pb-12"
    >
      <div className="mb-6">
        <Link to="/tickets" className="inline-flex items-center text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tickets
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold font-display tracking-tight text-[var(--text-primary)]">{ticket.title}</h1>
            <Badge variant={statusVariant}>{ticket.status}</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
            <span className="font-mono text-[var(--text-muted)]">{ticket._id}</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Created {new Date(ticket.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          {ticket.status !== "resolved" && ticket.status !== "closed" && (
            <Button 
              variant="outline" 
              onClick={() => handleStatusChange("resolved")}
              isLoading={isUpdatingStatus}
            >
              Mark Resolved
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <Card>
                <p className="text-sm text-[var(--text-secondary)]">No messages have been added to this ticket yet.</p>
              </Card>
            ) : (
              messages.map((message) => (
                <Card key={message._id}>
                  <div className="flex items-start gap-4">
                    <Avatar initials={message.senderType === "customer" ? ticket.customerName?.[0] || "C" : "A"} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-[var(--text-primary)] capitalize">{message.senderType}</h3>
                        <span className="text-xs text-[var(--text-muted)]">{new Date(message.createdAt).toLocaleTimeString()}</span>
                      </div>
                      <div className="text-[var(--text-secondary)] text-sm whitespace-pre-wrap mt-2 bg-[var(--bg-elevated)] p-4 rounded-lg border border-[var(--border-subtle)]">
                        {message.content}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[var(--text-primary)]">Reply</h3>
            <SuggestedReplyEditor
              key={suggestedReply}
              initialReply={suggestedReply}
              isGenerating={isGeneratingReply}
              onSend={handleSendReply}
              onRegenerate={() => suggestReply(ticket._id)}
            />
            {isSendingReply && <p className="text-xs text-[var(--text-muted)]">Sending reply...</p>}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="space-y-6">
            <h3 className="font-semibold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3">Details</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-1">
                  <UserIcon className="w-4 h-4" />
                  <span>Customer</span>
                </div>
                <p className="font-medium text-[var(--text-primary)]">{ticket.customerName}</p>
                <p className="text-sm text-[var(--text-secondary)]">{ticket.customerEmail || "No email on file"}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-1">
                  <Tag className="w-4 h-4" />
                  <span>Priority</span>
                </div>
                <Badge variant={priorityVariant} className="mt-1">
                  {ticket.priority}
                </Badge>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-1">
                  <AlignLeft className="w-4 h-4" />
                  <span>Sentiment</span>
                </div>
                <Badge variant={sentimentVariant} className="mt-1">
                  {ticket.sentiment}
                </Badge>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-1">
                  <UserIcon className="w-4 h-4" />
                  <span>Assignee</span>
                </div>
                {ticket.assignedAgent ? (
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar initials={ticket.assignedAgent.name[0]} size="sm" />
                    <span className="text-sm font-medium text-[var(--text-primary)]">{ticket.assignedAgent.name}</span>
                  </div>
                ) : (
                  <Button variant="link" size="sm" className="p-0 h-auto mt-1" onClick={handleAssignToMe} isLoading={isAssigning}>Assign to me</Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(TicketDetailPage);
