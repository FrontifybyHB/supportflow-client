import { useQuery } from "@tanstack/react-query";
import { Clock3, Inbox, ShieldCheck, Users } from "lucide-react";
import { httpClient } from "@/lib/api/httpClient";
import { MetricCard } from "../components/MetricCard";

type DashboardStats = {
  openTickets: number;
  activeAgents: number;
  avgResponseTime: string;
  resolvedToday: number;
};

async function getDashboardStats(): Promise<DashboardStats> {
  if (import.meta.env.DEV) {
    return {
      openTickets: 42,
      activeAgents: 12,
      avgResponseTime: "8m",
      resolvedToday: 31,
    };
  }

  const { data } = await httpClient.get<DashboardStats>("/dashboard/stats");
  return data;
}

export function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: getDashboardStats,
  });

  const stats = data ?? {
    openTickets: 0,
    activeAgents: 0,
    avgResponseTime: "-",
    resolvedToday: 0,
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Operations
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">
            Dashboard
          </h1>
        </div>
        <p className="text-sm text-slate-500">
          {isLoading ? "Loading latest metrics..." : "Dev metrics loaded"}
        </p>
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={Inbox}
          label="Open tickets"
          trend="+12% from yesterday"
          value={String(stats.openTickets)}
        />
        <MetricCard
          icon={Users}
          label="Active agents"
          trend="4 teams online"
          value={String(stats.activeAgents)}
        />
        <MetricCard
          icon={Clock3}
          label="Avg response"
          trend="2m faster this week"
          value={stats.avgResponseTime}
        />
        <MetricCard
          icon={ShieldCheck}
          label="Resolved today"
          trend="On track for SLA"
          value={String(stats.resolvedToday)}
        />
      </section>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Feature folder pattern</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          Add each domain under <code>src/features</code> with its own API,
          hooks, store, types, components, and pages. Shared primitives stay in
          <code> src/shared</code>, while app-level providers and routes stay in
          <code> src/app</code>.
        </p>
      </section>
    </div>
  );
}
