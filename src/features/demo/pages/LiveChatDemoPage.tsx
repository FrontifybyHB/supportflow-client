import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bot, Building2, CheckCircle2, Headset, LogOut, Mail, Send, Sparkles, User } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggle";
import { useIdentifyCustomer, useSendChatMessage } from "../hooks/useLiveChat";

type ChatMessage = {
  type: "agent" | "user";
  text: string;
  agentName?: string | null;
};

type StoredCustomerSession = {
  businessId?: string;
  name?: string;
  email?: string;
};

function readStoredCustomerSession(): StoredCustomerSession | null {
  try {
    const stored = sessionStorage.getItem("supportflow.customer");
    return stored ? (JSON.parse(stored) as StoredCustomerSession) : null;
  } catch {
    return null;
  }
}

const starterMessages: ChatMessage[] = [
  {
    type: "agent",
    text: "Hi, welcome to support. Tell me what you need help with and I will route it to the right team.",
    agentName: "SupportFlow AI",
  },
];

const quickPrompts = ["Track my ticket", "I need a refund update", "Talk to an agent"];

const LiveChatDemoPage = () => {
  const [searchParams] = useSearchParams();
  const storedCustomer = readStoredCustomerSession();
  const [businessId, setBusinessId] = useState(searchParams.get("businessId") ?? storedCustomer?.businessId ?? import.meta.env.VITE_DEMO_BUSINESS_ID ?? "");
  const [fullName, setFullName] = useState(storedCustomer?.name ?? "");
  const [workEmail, setWorkEmail] = useState(storedCustomer?.email ?? "");
  const [showPreChat, setShowPreChat] = useState(!storedCustomer?.businessId || !storedCustomer?.name || !storedCustomer?.email);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const identifyMutation = useIdentifyCustomer();
  const chatMutation = useSendChatMessage();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatMutation.isPending]);

  const startChat = async () => {
    if (!businessId.trim() || !fullName.trim() || !workEmail.trim()) return;
    const result = await identifyMutation.mutateAsync({ businessId, name: fullName, email: workEmail }).catch(() => null);
    if (!result) return;
    sessionStorage.setItem(
      "supportflow.customer",
      JSON.stringify({
        businessId,
        customerId: result.customerId,
        customerToken: result.customerToken,
        name: result.name || fullName,
        email: workEmail,
      }),
    );
    setShowPreChat(false);
    toast.success("Support profile ready");
  };

  const endCustomerSession = () => {
    sessionStorage.removeItem("supportflow.customer");
    setFullName("");
    setWorkEmail("");
    setConversationId(undefined);
    setMessages(starterMessages);
    setNewMessage("");
    setShowPreChat(true);
    toast.info("Customer chat session ended");
  };

  const sendMessage = (messageText = newMessage) => {
    if (!messageText.trim() || !businessId.trim() || showPreChat) return;
    const text = messageText.trim();
    setMessages((prev) => [...prev, { type: "user", text, agentName: null }]);
    setNewMessage("");
    chatMutation.mutate(
      {
        businessId,
        message: text,
        subject: text.slice(0, 120),
        conversationId,
        customerName: fullName,
        customerEmail: workEmail,
      },
      {
        onSuccess: (result) => {
          setConversationId(result.ticket?._id ?? conversationId);
          setMessages((prev) => [
            ...prev,
            { type: "agent", text: result.reply, agentName: result.handoff ? "Support team" : "SupportFlow AI" },
          ]);
        },
      },
    );
  };

  const handleComposerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] font-sans">
      <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--accent-primary)] text-[#07111f]">
              <Headset size={19} strokeWidth={2.5} />
            </span>
            <span className="truncate font-display text-xl font-bold">SupportFlow AI</span>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Link to="/customer" className="hidden h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] sm:inline-flex">
              <ArrowLeft size={16} />
              Providers
            </Link>
            {!showPreChat && (
              <button
                type="button"
                onClick={endCustomerSession}
                className="inline-flex h-10 items-center gap-2 rounded-md border border-[var(--border-default)] px-3 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">End chat</span>
              </button>
            )}
            <Link to="/login" className="inline-flex h-10 items-center rounded-md bg-[var(--accent-primary)] px-4 text-sm font-bold text-[#07111f] hover:bg-[var(--accent-hover)]">
              Login
            </Link>
          </div>
        </div>
      </header>

      <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,var(--border-default)_1px,transparent_1px)] bg-[size:28px_28px] opacity-25" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(300px,0.78fr)_minmax(420px,1.22fr)] lg:px-8">
          <section className="flex min-w-0 flex-col justify-between rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-6">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-[var(--accent-primary)]/25 bg-[var(--accent-glow)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--accent-primary)]">
                <Sparkles size={14} />
                Customer support
              </div>
              <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
                Start a focused support conversation.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                Share your issue once. SupportFlow keeps the business, customer, and ticket context together.
              </p>

              <div className="mt-8 grid gap-3">
                <InfoRow icon={Building2} label="Business" value={businessId || "Choose a provider first"} />
                <InfoRow icon={User} label="Customer" value={fullName || "Not identified"} />
                <InfoRow icon={Mail} label="Email" value={workEmail || "Not added"} />
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <Metric label="Status" value={showPreChat ? "Setup" : "Live"} />
              <Metric label="Mode" value="AI + Agent" />
              <Metric label="Response" value="Fast" />
            </div>
          </section>

          <section className="flex min-h-[620px] min-w-0 flex-col overflow-hidden rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl shadow-black/10">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-5 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[var(--accent-glow)] text-[var(--accent-primary)]">
                  <Bot size={22} />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate font-display text-lg font-bold">Live Support</h2>
                  <p className="truncate text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    {showPreChat ? "Add details to begin" : "Ready for messages"}
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-md border border-[var(--border-subtle)] px-3 py-1.5 text-xs font-bold text-[var(--text-secondary)]">
                <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
                Online
              </span>
            </div>

            {showPreChat ? (
              <div className="grid flex-1 place-items-center p-5">
                <div className="w-full max-w-lg rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] p-5 sm:p-6">
                  <h3 className="font-display text-2xl font-bold">Confirm your details</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    This connects your conversation to the correct business workspace.
                  </p>
                  <div className="mt-6 space-y-4">
                    <Field label="Business ID" value={businessId} onChange={setBusinessId} placeholder="Business ID" />
                    <Field label="Full name" value={fullName} onChange={setFullName} placeholder="John Doe" />
                    <Field label="Email" value={workEmail} onChange={setWorkEmail} placeholder="john@company.com" type="email" />
                    <button
                      type="button"
                      onClick={startChat}
                      disabled={identifyMutation.isPending || !businessId || !fullName || !workEmail}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[var(--accent-primary)] px-4 text-sm font-bold text-[#07111f] transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {!identifyMutation.isPending && <CheckCircle2 size={17} />}
                      {identifyMutation.isPending ? "Connecting..." : "Start support chat"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
                  <div className="mx-auto flex max-w-3xl flex-col gap-4">
                    {messages.map((msg, idx) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={`${msg.type}-${idx}`}
                        className={msg.type === "user" ? "flex justify-end" : "flex justify-start"}
                      >
                        <div
                          className={
                            msg.type === "agent"
                              ? "max-w-[86%] rounded-2xl rounded-tl-sm border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 text-sm text-[var(--text-primary)]"
                              : "max-w-[86%] rounded-2xl rounded-tr-sm bg-[var(--accent-primary)] p-4 text-sm font-medium text-[#07111f] shadow-sm"
                          }
                        >
                          {msg.agentName && (
                            <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                              <User size={12} />
                              {msg.agentName}
                            </div>
                          )}
                          <p className="break-words leading-relaxed">{msg.text}</p>
                        </div>
                      </motion.div>
                    ))}

                    {chatMutation.isPending && (
                      <div className="flex justify-start">
                        <div className="rounded-2xl rounded-tl-sm border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                          Writing reply...
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
                  <div className="mx-auto max-w-3xl">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {quickPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => sendMessage(prompt)}
                          disabled={chatMutation.isPending}
                          className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] transition hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] disabled:opacity-50"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleComposerSubmit} className="flex items-center gap-3 rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-2 focus-within:border-[var(--accent-primary)] focus-within:ring-2 focus-within:ring-[var(--accent-primary)]/20">
                      <input
                        type="text"
                        className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(event) => setNewMessage(event.target.value)}
                        disabled={chatMutation.isPending}
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim() || chatMutation.isPending}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--accent-primary)] text-[#07111f] transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Send message"
                      >
                        <Send size={18} />
                      </button>
                    </form>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

function InfoRow({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] p-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--bg-elevated)] text-[var(--accent-primary)]">
        <Icon size={18} />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--text-muted)]">{label}</p>
        <p className="truncate text-sm font-semibold text-[var(--text-primary)]">{value}</p>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] p-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--text-muted)]">{label}</p>
      <p className="mt-1 font-display text-lg font-bold">{value}</p>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-[var(--text-secondary)]">{label}</label>
      <input
        type={type}
        className="h-11 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 text-sm text-[var(--text-primary)] outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default LiveChatDemoPage;
