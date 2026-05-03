import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Inbox, Search, Send } from "lucide-react";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { useConversationMessages, useConversations } from "../hooks/useConversations";
import { useSendMessage } from "../hooks/useSendMessage";
import type { Conversation, Message } from "../types/conversation.types";

const ConversationsPage = () => {
  const [activeConversationId, setActiveConversationId] = useState<string | undefined>();
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversations = useConversations();
  const sendMessage = useSendMessage();

  const items = useMemo(() => conversations.data?.data ?? [], [conversations.data?.data]);
  const selectedConversationId = useMemo(() => {
    return items.some((conversation) => conversation._id === activeConversationId)
      ? activeConversationId
      : items[0]?._id;
  }, [activeConversationId, items]);
  const messages = useConversationMessages(selectedConversationId);
  const activeConversation = useMemo(() => {
    return items.find((conversation) => conversation._id === selectedConversationId);
  }, [items, selectedConversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.data]);

  // Conversation search is recomputed frequently while typing, so keep it tied to the query and ticket list only.
  const filteredConversations = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return items.filter((conversation) => {
      const name = conversation.customerName ?? "Guest";
      return !query || name.toLowerCase().includes(query) || conversation.customerEmail?.toLowerCase().includes(query);
    });
  }, [items, searchQuery]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!inputText.trim() || !activeConversation) return;
    sendMessage.mutate({ conversationId: activeConversation._id, text: inputText.trim() });
    setInputText("");
  }, [activeConversation, inputText, sendMessage]);

  const handleComposerKeyDown = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-[calc(100vh-4rem)] -mx-4 sm:-mx-6 lg:-mx-8 -my-8 overflow-hidden bg-[var(--bg-base)]">
      <aside className="hidden lg:flex flex-col w-[220px] bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] p-4 gap-2 overflow-y-auto">
        <div className="px-3 py-2 text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-wider">Inbox</div>
        <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-[var(--accent-glow)] text-[var(--accent-primary)] font-medium">
          <div className="flex items-center gap-3"><Inbox size={18} /><span className="text-sm">All Tickets</span></div>
          <span className="bg-[var(--accent-primary)] text-[var(--bg-base)] text-[10px] px-1.5 py-0.5 rounded-full font-bold">{items.length}</span>
        </div>
      </aside>

      <section className="flex-1 flex overflow-hidden">
        <div className="w-[320px] bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] flex flex-col shrink-0">
          <div className="p-4 border-b border-[var(--border-subtle)]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input className="w-full pl-10 pr-4 py-2 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] placeholder:text-[var(--text-muted)] transition-all" placeholder="Search chats..." type="text" value={searchQuery} onChange={handleSearchChange} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {conversations.isLoading ? (
              Array.from({ length: 8 }).map((_, index) => <div key={index} className="p-4"><Skeleton className="h-16 rounded-lg" /></div>)
            ) : filteredConversations.length === 0 ? (
              <p className="p-6 text-sm text-[var(--text-muted)]">No conversations found.</p>
            ) : (
              filteredConversations.map((conversation) => (
                <ConversationListItem
                  key={conversation._id}
                  conversation={conversation}
                  isActive={activeConversation?._id === conversation._id}
                  onSelect={setActiveConversationId}
                />
              ))
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-[var(--bg-base)]">
          <div className="h-16 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between px-6">
            <div>
              <h2 className="font-display font-bold text-[var(--text-primary)]">{activeConversation?.customerName ?? "Select a conversation"}</h2>
              <p className="text-xs text-[var(--text-muted)]">{activeConversation?.customerEmail ?? activeConversation?._id}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.isLoading ? (
              Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="h-20 rounded-xl" />)
            ) : (messages.data ?? []).length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">No messages loaded for this ticket yet.</p>
            ) : (
              messages.data?.map((message) => <MessageBubble key={message._id} message={message} />)
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <div className="flex items-end gap-3 bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl p-2 focus-within:border-[var(--accent-primary)] focus-within:ring-2 focus-within:ring-[var(--accent-primary)]/20 transition-all">
              <textarea rows={1} value={inputText} onChange={handleInputChange} onKeyDown={handleComposerKeyDown} className="flex-1 bg-transparent resize-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] py-2 px-2 max-h-32" placeholder="Reply to customer..." />
              <button onClick={handleSendMessage} disabled={!inputText.trim() || sendMessage.isPending || !activeConversation} className="h-9 w-9 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-base)] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const ConversationListItem = React.memo(function ConversationListItem({
  conversation,
  isActive,
  onSelect,
}: {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  const handleSelect = useCallback(() => {
    onSelect(conversation._id);
  }, [conversation._id, onSelect]);

  return (
    <button onClick={handleSelect} className={`w-full text-left p-4 border-b border-[var(--border-subtle)] transition-colors ${isActive ? "bg-[var(--bg-elevated)] border-l-4 border-l-[var(--accent-primary)]" : "hover:bg-[var(--bg-elevated)] border-l-4 border-l-transparent"}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--accent-glow)] flex items-center justify-center text-[var(--accent-primary)] font-bold">{(conversation.customerName ?? "G").slice(0, 1).toUpperCase()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-sm text-[var(--text-primary)] truncate">{conversation.customerName ?? "Guest"}</h3>
            <span className="text-[10px] text-[var(--text-muted)]">{new Date(conversation.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] truncate">{conversation.customerEmail ?? conversation.category ?? "Ticket conversation"}</p>
        </div>
      </div>
    </button>
  );
});

const MessageBubble = React.memo(function MessageBubble({ message }: { message: Message }) {
  const isCustomer = message.sender === "customer";

  return (
    <div className={isCustomer ? "flex justify-start" : "flex justify-end"}>
      <div className={`max-w-[78%] rounded-2xl p-3.5 text-sm border ${isCustomer ? "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)] rounded-tl-sm" : "bg-[var(--accent-primary)] text-[var(--bg-base)] border-[var(--accent-primary)] rounded-tr-sm"}`}>
        <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
        <p className="text-[10px] opacity-60 mt-2">{new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
      </div>
    </div>
  );
});

export default React.memo(ConversationsPage);
