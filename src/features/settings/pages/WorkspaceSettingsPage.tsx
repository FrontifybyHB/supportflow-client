import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Bot, Check, Copy, Loader2, MessageCircle, Save, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { getAiModels, getAiSelection, selectAiModel } from "@/api/analytics";
import { getBusinessProfile, updateBusinessProfile, type Business } from "@/api/business";
import { Button } from "@/shared/components/ui/Button";
import { Skeleton } from "@/shared/components/ui/Skeleton";

type WorkspaceForm = {
  name: string;
  industry: string;
  description: string;
  chatWidgetEnabled: boolean;
  autoReplyEnabled: boolean;
};

const industries = ["SaaS", "Technology", "Retail", "Healthcare", "Finance", "Education", "Logistics", "Other"];

function getBooleanSetting(business: Business | undefined, key: string, fallback: boolean) {
  const value = business?.settings?.[key];
  return typeof value === "boolean" ? value : fallback;
}

const WorkspaceSettingsPage = () => {
  const businessQuery = useQuery({
    queryKey: ["business", "profile"],
    queryFn: getBusinessProfile,
  });

  if (businessQuery.isLoading) {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <Skeleton className="h-10 w-72 rounded-xl" />
        <Skeleton className="h-80 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (businessQuery.isError || !businessQuery.data) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-[var(--warning)]/30 bg-[var(--warning)]/10 p-6 text-[var(--warning)]">
        Workspace settings require an active business. Create a business from onboarding or sign in as an admin.
      </div>
    );
  }

  return <WorkspaceSettingsForm key={businessQuery.data._id} business={businessQuery.data} />;
};

function WorkspaceSettingsForm({ business }: { business: Business }) {
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<WorkspaceForm>(() => ({
    name: business.name ?? "",
    industry: business.industry ?? "SaaS",
    description: business.description ?? "",
    chatWidgetEnabled: getBooleanSetting(business, "chatWidgetEnabled", true),
    autoReplyEnabled: getBooleanSetting(business, "autoReplyEnabled", false),
  }));

  const modelsQuery = useQuery({
    queryKey: ["business-ai", "models"],
    queryFn: getAiModels,
  });

  const selectionQuery = useQuery({
    queryKey: ["business-ai", "selection"],
    queryFn: getAiSelection,
  });

  const updateBusiness = useMutation({
    mutationFn: (input: WorkspaceForm) =>
      updateBusinessProfile({
        name: input.name.trim(),
        industry: input.industry,
        description: input.description.trim(),
        settings: {
          ...(business.settings ?? {}),
          chatWidgetEnabled: input.chatWidgetEnabled,
          autoReplyEnabled: input.autoReplyEnabled,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business", "profile"] });
      toast.success("Workspace settings saved");
    },
    onError: () => toast.error("Unable to save workspace settings"),
  });

  const selectModel = useMutation({
    mutationFn: selectAiModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-ai", "selection"] });
      toast.success("AI model updated");
    },
    onError: () => toast.error("Unable to update AI model"),
  });

  const businessId = business._id;
  const embedCode = useMemo(() => {
    return `<script src="${window.location.origin}/widget.js" data-business-id="${businessId}"></script>`;
  }, [businessId]);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success("Widget snippet copied");
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleChange = (field: keyof WorkspaceForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-5xl space-y-8 pb-12"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)]">Workspace Settings</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Live business profile, widget configuration, and AI model selection from the backend.</p>
        </div>
        <Button onClick={() => updateBusiness.mutate(form)} isLoading={updateBusiness.isPending} className="gap-2">
          {!updateBusiness.isPending && <Save size={18} />}
          Save changes
        </Button>
      </div>

      <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm">
        <div className="border-b border-[var(--border-subtle)] p-5">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[var(--text-primary)]">
            <Settings2 size={19} />
            Business profile
          </h2>
        </div>
        <div className="grid gap-5 p-5 md:grid-cols-2">
          <Field label="Business name" value={form.name} onChange={(value) => handleChange("name", value)} />
          <label className="space-y-2">
            <span className="text-sm font-semibold text-[var(--text-secondary)]">Industry</span>
            <select
              value={form.industry}
              onChange={(event) => handleChange("industry", event.target.value)}
              className="h-11 w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] px-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-[var(--text-secondary)]">Description</span>
            <textarea
              value={form.description}
              onChange={(event) => handleChange("description", event.target.value)}
              rows={4}
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20"
            />
          </label>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-sm">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[var(--text-primary)]">
            <MessageCircle size={19} />
            Chat widget
          </h2>
          <div className="mt-5 space-y-4">
            <Toggle label="Widget enabled" description="Allow customers to start chat through this business id." checked={form.chatWidgetEnabled} onChange={(checked) => handleChange("chatWidgetEnabled", checked)} />
            <Toggle label="AI auto-reply enabled" description="Let the backend attempt AI self-service before handoff." checked={form.autoReplyEnabled} onChange={(checked) => handleChange("autoReplyEnabled", checked)} />
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Embed snippet</p>
                <Button size="sm" variant="outline" onClick={handleCopyCode} className="gap-2" disabled={!businessId}>
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-md bg-[var(--bg-elevated)] p-3 font-mono text-xs text-[var(--text-secondary)]">{embedCode}</pre>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-sm">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[var(--text-primary)]">
            <Bot size={19} />
            AI model
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Current source: <span className="font-semibold text-[var(--text-primary)]">{selectionQuery.data?.source ?? "loading"}</span>
          </p>
          <div className="mt-5 space-y-3">
            {modelsQuery.isLoading ? (
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Loader2 className="animate-spin" size={16} />
                Loading models
              </div>
            ) : modelsQuery.data?.length ? (
              modelsQuery.data.map((model) => {
                const active = selectionQuery.data?.model?._id === model._id;
                return (
                  <button
                    key={model._id}
                    type="button"
                    onClick={() => selectModel.mutate(model._id)}
                    className={`w-full rounded-lg border p-4 text-left transition-colors ${
                      active
                        ? "border-[var(--accent-primary)] bg-[var(--accent-glow)] text-[var(--accent-primary)]"
                        : "border-[var(--border-subtle)] bg-[var(--bg-base)] text-[var(--text-secondary)] hover:border-[var(--border-default)]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold">{model.name}</span>
                      {active && <Check size={17} />}
                    </div>
                    <p className="mt-1 text-xs opacity-80">{model.provider}{model.isDefault ? " · default" : ""}</p>
                    {model.description && <p className="mt-2 text-sm opacity-80">{model.description}</p>}
                  </button>
                );
              })
            ) : (
              <p className="rounded-lg border border-dashed border-[var(--border-default)] p-4 text-sm text-[var(--text-muted)]">No active AI models are exposed by the backend yet.</p>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-semibold text-[var(--text-secondary)]">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] px-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20"
      />
    </label>
  );
}

function Toggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)] p-4 text-left"
      aria-pressed={checked}
    >
      <span>
        <span className="block text-sm font-semibold text-[var(--text-primary)]">{label}</span>
        <span className="mt-1 block text-xs leading-5 text-[var(--text-muted)]">{description}</span>
      </span>
      <span className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-[var(--accent-primary)]" : "bg-[var(--border-default)]"}`}>
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
      </span>
    </button>
  );
}

export default React.memo(WorkspaceSettingsPage);
