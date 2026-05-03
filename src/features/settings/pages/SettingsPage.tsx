import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, ShieldAlert, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { getBusinesses, getPlatformStats } from "@/api/superadmin";
import { Skeleton } from "@/shared/components/ui/Skeleton";

const SettingsPage = () => {
  const stats = useQuery({ queryKey: ["superadmin", "stats"], queryFn: getPlatformStats });
  const businesses = useQuery({ queryKey: ["superadmin", "businesses"], queryFn: getBusinesses });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-6xl space-y-8 pb-12"
    >
      <div>
        <div className="flex items-center gap-3">
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)]">Platform Settings</h1>
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-purple-400">
            Superadmin
          </span>
        </div>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          The current backend exposes platform stats and tenant controls. Runtime policy controls are not exposed yet, so this page only renders live backend data.
        </p>
      </div>

      {stats.isLoading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-32 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <Metric title="Total businesses" value={stats.data?.totalBusinesses ?? 0} icon={Building2} />
          <Metric title="Active businesses" value={stats.data?.activeBusinesses ?? 0} icon={CheckCircle2} />
          <Metric title="Total users" value={stats.data?.totalUsers ?? 0} icon={Users} />
        </div>
      )}

      <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm">
        <div className="flex flex-col gap-3 border-b border-[var(--border-subtle)] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">Tenant Controls</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Use the businesses page for activate/suspend and plan updates.</p>
          </div>
          <Link to="/businesses" className="text-sm font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-hover)]">
            Manage businesses
          </Link>
        </div>

        {businesses.isLoading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-14 rounded-lg" />)}
          </div>
        ) : businesses.data?.businesses.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                <tr>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Business</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Owner</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Plan</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {businesses.data.businesses.slice(0, 8).map((business) => (
                  <tr key={business._id} className="hover:bg-[var(--bg-elevated)]">
                    <td className="px-5 py-4 text-sm font-semibold text-[var(--text-primary)]">{business.name}</td>
                    <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">{getOwnerLabel(business)}</td>
                    <td className="px-5 py-4 text-sm uppercase text-[var(--text-secondary)]">{business.plan ?? "free"}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-[var(--accent-primary)]">{business.isActive === false ? "suspended" : "active"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-sm text-[var(--text-muted)]">No businesses returned from the backend yet.</div>
        )}
      </section>

      <div className="flex gap-3 rounded-xl border border-[var(--warning)]/30 bg-[var(--warning)]/10 p-4 text-sm leading-6 text-[var(--warning)]">
        <ShieldAlert className="mt-0.5 shrink-0" size={18} />
        Platform branding, MFA enforcement, SMTP, cache purge, and maintenance mode controls were removed from this screen because the current backend API does not expose those mutations.
      </div>
    </motion.div>
  );
};

function Metric({ title, value, icon: Icon }: { title: string; value: number; icon: React.ElementType }) {
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-glow)] text-[var(--accent-primary)]">
        <Icon size={20} />
      </div>
      <p className="text-sm text-[var(--text-muted)]">{title}</p>
      <p className="mt-1 font-display text-3xl font-bold text-[var(--text-primary)]">{value.toLocaleString()}</p>
    </div>
  );
}

function getOwnerLabel(business: { owner?: { email?: string; name?: string; _id?: string }; ownerId?: string | { email?: string; name?: string; _id?: string } }) {
  const owner = business.owner ?? business.ownerId;
  if (!owner) return "Unknown";
  if (typeof owner === "string") return owner;
  return owner.email ?? owner.name ?? owner._id ?? "Unknown";
}

export default React.memo(SettingsPage);
