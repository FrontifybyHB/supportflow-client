import React, { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LockKeyhole, Mail, Search, ShieldAlert, User, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import { TextField } from "@/shared/components/ui/TextField";
import { useAppSelector } from "@/lib/redux/hooks";
import { useAgents, useCreateAgent } from "../hooks/useAgents";
import type { CreateBusinessAgentInput } from "@/api/business";

type AgentFormValues = CreateBusinessAgentInput;

const AgentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { data, isLoading, isError } = useAgents();
  const createAgent = useCreateAgent();
  const role = useAppSelector((state) => state.auth.user?.role);
  const canCreateAgents = role === "admin";
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<AgentFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const agents = useMemo(() => data?.users ?? [], [data?.users]);
  // Search is derived server state; memoization avoids recomputing filtered cards during unrelated renders.
  const filteredAgents = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return agents.filter((agent) => !query || agent.name.toLowerCase().includes(query) || agent.email.toLowerCase().includes(query));
  }, [agents, searchQuery]);

  const { activeAgents, inactiveAgents } = useMemo(() => {
    const active = agents.filter((agent) => agent.isActive !== false).length;
    return { activeAgents: active, inactiveAgents: agents.length - active };
  }, [agents]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const openCreateModal = useCallback(() => {
    setIsCreateOpen(true);
  }, []);

  const closeCreateModal = useCallback(() => {
    if (createAgent.isPending) return;
    setIsCreateOpen(false);
    reset();
  }, [createAgent.isPending, reset]);

  const handleCreateAgent = useCallback(async (values: AgentFormValues) => {
    const agent = {
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
    };
    await createAgent.mutateAsync(agent);
    setIsCreateOpen(false);
    reset();
  }, [createAgent, reset]);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto w-full space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--text-primary)]">Agents</h1>
          <span className="px-2.5 py-0.5 rounded-full bg-[var(--success)]/10 text-[var(--success)] text-[10px] font-bold tracking-widest uppercase">{activeAgents} Active</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input type="text" value={searchQuery} onChange={handleSearchChange} className="w-full pl-10 pr-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] outline-none transition-all placeholder-[var(--text-muted)] shadow-sm" placeholder="Search agents..." />
          </div>
          {canCreateAgents ? (
            <Button onClick={openCreateModal} className="gap-2">
              <UserPlus size={18} />
              Create agent
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-[var(--bg-elevated)] text-[var(--text-secondary)] px-4 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-subtle)]">
              <UserPlus size={18} />
              Superadmin can assign roles
            </div>
          )}
        </div>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 flex divide-x divide-[var(--border-subtle)] shadow-sm">
        <Stat label="Total agents" value={agents.length} />
        <Stat label="Active" value={activeAgents} />
        <Stat label="Inactive" value={inactiveAgents} />
      </div>

      {isError && (
        <div className="bg-[var(--warning)]/10 border border-[var(--warning)]/20 text-[var(--warning)] rounded-xl p-4 text-sm flex items-center gap-3">
          <ShieldAlert size={18} />
          {canCreateAgents
            ? "Agent APIs are not reachable. Confirm the backend exposes GET/POST /api/v1/business/agents."
            : "Superadmin agent listing uses the platform users endpoint."}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-44 rounded-xl" />)
        ) : filteredAgents.length === 0 ? (
          <div className="col-span-full text-center py-12 text-[var(--text-muted)] bg-[var(--bg-surface)] border border-dashed border-[var(--border-subtle)] rounded-xl">
            <p className="text-lg font-medium">No agents found.</p>
          </div>
        ) : (
          filteredAgents.map((agent) => {
            const active = agent.isActive !== false;
            const initials = agent.name.split(" ").map((part) => part[0]).join("").toUpperCase().slice(0, 2) || "AG";
            return (
              <div key={agent._id} className={`bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-5 flex flex-col space-y-4 shadow-sm transition-all duration-300 ${active ? "hover:border-[var(--accent-primary)]/50 hover:shadow-md" : "opacity-60 grayscale-[0.3]"}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-glow)] flex items-center justify-center text-[var(--accent-primary)] font-bold text-lg border border-[var(--accent-primary)]/10">{initials}</div>
                    <div>
                      <h4 className="font-display text-base font-bold text-[var(--text-primary)] leading-tight mb-0.5">{agent.name}</h4>
                      <p className="text-[var(--text-secondary)] text-sm">{agent.email}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest border border-[var(--border-subtle)]">{agent.role}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${active ? "bg-[var(--success)] shadow-[0_0_8px_var(--success)]" : "bg-[var(--border-default)]"}`}></span>
                    <span className="text-sm text-[var(--text-primary)] font-medium">{active ? "Active" : "Inactive"}</span>
                  </div>
                  <span className="text-[var(--text-muted)] text-sm font-medium">{agent.businessId ? "Tenant assigned" : "No tenant"}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <Modal isOpen={isCreateOpen} onClose={closeCreateModal} title="Create Agent">
        <form onSubmit={handleSubmit(handleCreateAgent)} className="space-y-5">
          <TextField
            icon={User}
            label="Full name"
            placeholder="Agent name"
            error={errors.name?.message}
            {...register("name", {
              required: "Agent name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />
          <TextField
            icon={Mail}
            label="Email"
            type="email"
            placeholder="agent@company.com"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          <TextField
            icon={LockKeyhole}
            label="Temporary password"
            type="password"
            placeholder="NewAgent@123"
            helperText="Share this password securely. The backend should hash it and create an agent scoped to your business."
            error={errors.password?.message}
            {...register("password", {
              required: "Temporary password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: {
                uppercase: (value) => /[A-Z]/.test(value) || "Password needs one uppercase letter",
                lowercase: (value) => /[a-z]/.test(value) || "Password needs one lowercase letter",
                number: (value) => /[0-9]/.test(value) || "Password needs one number",
                special: (value) => /[^A-Za-z0-9]/.test(value) || "Password needs one special character",
              },
            })}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={closeCreateModal}>
              Cancel
            </Button>
            <Button type="submit" isLoading={createAgent.isPending}>
              {!createAgent.isPending && "Create agent"}
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

const Stat = React.memo(function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex-1 px-4 sm:px-6 lg:px-8 first:pl-0">
      <p className="text-[var(--text-muted)] text-sm font-medium mb-1">{label}</p>
      <h3 className="font-display text-3xl font-bold text-[var(--text-primary)]">{value}</h3>
    </div>
  );
});

export default React.memo(AgentsPage);
