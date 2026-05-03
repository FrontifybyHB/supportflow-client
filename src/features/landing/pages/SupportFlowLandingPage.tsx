import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  Headphones,
  LayoutDashboard,
  LifeBuoy,
  LockKeyhole,
  MessageSquareText,
  PlugZap,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  Users,
  Zap,
} from "lucide-react";
import { env } from "@/config/env";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggle";

const features = [
  {
    title: "AI ticket handling",
    description: "Classify, prioritize, and draft replies before a human agent opens the queue.",
    icon: Bot,
  },
  {
    title: "Live customer chat",
    description: "Let customers identify their business and start a support conversation instantly.",
    icon: MessageSquareText,
  },
  {
    title: "Agent workspace",
    description: "Give support teams a focused view for tickets, conversations, replies, and handoffs.",
    icon: Headphones,
  },
  {
    title: "Business analytics",
    description: "Track open tickets, resolution rate, agent load, sentiment, and AI performance.",
    icon: BarChart3,
  },
];

const rolePaths = [
  {
    title: "Join as a customer",
    description: "Pick a business, verify your details, and open a support chat with the right team.",
    icon: Users,
    to: "/customer",
    cta: "Find a business",
  },
  {
    title: "Join as a business",
    description: "Create your account, set up a workspace, invite agents, and manage customer support.",
    icon: Building2,
    to: "/register?role=business",
    cta: "Create business account",
  },
];

const workflow = [
  "Business creates a workspace and receives a business ID.",
  "Customer chooses that business or enters the business ID.",
  "Customer details are sent with the business ID to identify the customer.",
  "Agents and AI manage conversations, tickets, analytics, and knowledge base.",
];

export default function SupportFlowLandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] font-sans">
      <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label={`${env.appName} home`}>
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--accent-primary)] text-[var(--bg-base)]">
              <Zap size={20} strokeWidth={2.5} />
            </span>
            <span className="font-display text-xl font-bold">{env.appName}</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--text-secondary)] md:flex">
            <a href="#services" className="hover:text-[var(--text-primary)]">Services</a>
            <a href="#roles" className="hover:text-[var(--text-primary)]">Join</a>
            <a href="#workflow" className="hover:text-[var(--text-primary)]">Flow</a>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/login" className="rounded-md px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]">
              Login
            </Link>
            <Link to="/register?role=business" className="hidden rounded-md bg-[var(--accent-primary)] px-4 py-2 text-sm font-semibold text-[var(--bg-base)] hover:bg-[var(--accent-hover)] sm:inline-flex">
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-[var(--border-subtle)]">
          <div className="absolute inset-0 opacity-35" aria-hidden="true">
            <div className="h-full w-full bg-[linear-gradient(90deg,var(--border-subtle)_1px,transparent_1px),linear-gradient(0deg,var(--border-subtle)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl content-center gap-12 px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-[var(--accent-primary)]/25 bg-[var(--accent-glow)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--accent-primary)]">
                <Sparkles size={14} />
                Support platform for every role
              </div>
              <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
                SupportFlow AI
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">
                One service where businesses manage support, agents resolve customer issues, and customers reach the right business by using a business ID.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/customer" className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-[var(--accent-primary)] px-6 text-base font-bold text-[var(--bg-base)] hover:bg-[var(--accent-hover)]">
                  I am a customer
                  <ArrowRight size={18} />
                </Link>
                <Link to="/register?role=business" className="inline-flex h-14 items-center justify-center gap-2 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-6 text-base font-bold text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]">
                  I am a business
                  <Building2 size={18} />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="min-h-[300px] rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 shadow-2xl shadow-black/20">
                <div className="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
                    <LayoutDashboard size={17} />
                    Business workspace
                  </div>
                  <span className="rounded-md bg-[var(--accent-glow)] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--accent-primary)]">
                    Live
                  </span>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {["Open tickets", "AI resolved", "Agents online"].map((label, index) => (
                    <div key={label} className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] p-4">
                      <p className="text-xs font-semibold text-[var(--text-muted)]">{label}</p>
                      <p className="mt-3 font-display text-3xl font-bold">{["128", "72%", "14"][index]}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-3">
                  {["Refund request needs handoff", "Password reset solved by AI", "New customer identified"].map((ticket, index) => (
                    <div key={ticket} className="flex items-center justify-between rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--bg-elevated)] text-[var(--accent-primary)]">
                          <TicketCheck size={16} />
                        </span>
                        <span className="text-sm font-medium">{ticket}</span>
                      </div>
                      <span className="text-xs text-[var(--text-muted)]">#{2380 + index}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
                  <LifeBuoy className="text-[var(--accent-primary)]" size={24} />
                  <h2 className="mt-4 font-display text-xl font-bold">Customer entry</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">Customers select a business or enter the business ID, then start support with their own details.</p>
                </div>
                <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
                  <ShieldCheck className="text-[var(--success)]" size={24} />
                  <h2 className="mt-4 font-display text-xl font-bold">Role-based portals</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">Business admins, agents, customers, admins, and super admins can land in their own workspace.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wide text-[var(--accent-primary)]">Services</p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Everything important in one support flow</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <article key={feature.title} className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] p-6">
                  <feature.icon className="text-[var(--accent-primary)]" size={24} />
                  <h3 className="mt-5 font-display text-xl font-bold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="roles" className="border-b border-[var(--border-subtle)]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-[var(--accent-primary)]">Choose your role</p>
                <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Start from the right door</h2>
                <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                  Agents are invited by a business. The public homepage focuses on the two main entry points: customer and business.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {rolePaths.map((role) => (
                  <Link key={role.title} to={role.to} className="group rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 hover:border-[var(--accent-primary)]/60">
                    <role.icon className="text-[var(--accent-primary)]" size={28} />
                    <h3 className="mt-5 font-display text-2xl font-bold">{role.title}</h3>
                    <p className="mt-3 min-h-20 text-sm leading-6 text-[var(--text-secondary)]">{role.description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent-primary)]">
                      {role.cta}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" className="bg-[var(--bg-surface)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[var(--accent-primary)]">Implementation flow</p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">How frontend and backend connect</h2>
              <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                The frontend sends business IDs and customer details to the backend so each customer conversation is linked to the correct business workspace.
              </p>
            </div>
            <div className="space-y-3">
              {workflow.map((item, index) => (
                <div key={item} className="flex gap-4 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--accent-glow)] text-sm font-bold text-[var(--accent-primary)]">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-[var(--text-secondary)]">{item}</p>
                </div>
              ))}
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="inline-flex items-center gap-2 rounded-md border border-[var(--border-subtle)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                  <LockKeyhole size={14} />
                  Protected dashboards
                </span>
                <span className="inline-flex items-center gap-2 rounded-md border border-[var(--border-subtle)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                  <PlugZap size={14} />
                  API-ready customer identify
                </span>
                <span className="inline-flex items-center gap-2 rounded-md border border-[var(--border-subtle)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                  <CheckCircle2 size={14} />
                  Business ID routing
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
