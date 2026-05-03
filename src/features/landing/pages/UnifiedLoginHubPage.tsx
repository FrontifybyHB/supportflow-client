import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Building2, Headphones, LayoutDashboard, MessageSquare, UserRound, Zap } from "lucide-react";
import { env } from "@/config/env";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggle";

const previewImages = [
  {
    alt: "Dashboard UI preview",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCociGB1EKqu9KUF1Uoio600Nbr_WVaXF2HYWJ_N5I2mCGqoOrZgG03117easE_Bz5fWXXeQn9iV3xunutqaLDmvQDaRXlGz4ro91E98N11I3qrqzXVWMZy1XpdjWIbeTZAA6-iQzBc8W98Wcq7DibOoBp_PSN6-yLcYrfvuMSdtCYDqyMbLLbWsJhF3pYCpqQKCasIfkqJ1gTeMDYFydFbQnfjglADSHfdqYQZnaMK_VV7S88DOVB0LwSZIHKSWfYU8-MzyxQ2sK9q",
    icon: LayoutDashboard,
  },
  {
    alt: "Team collaboration preview",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAixd4o6dsyx9eIE7d1xGlSUsx1p-uLFeYgvE-bjPEPjUpn7SnvBhPivnkgHrP157eLXtRC0OAv2OrGOIOEHTbx_rEyDvMzpg2X121y780NymtqEB4phZWlsIWL3t9587ulTT6ZecvAZaRzUrWOdS1Tz4J28YL_OXs_UeEPFtHrciIOM8WRi5n0uKZnUfxWQtsA0ClTKEV2J6F7Su__HIugUveQDqFlaiYJqBy5XaP_Y-QgPdGce83z_IykIjviolgcnAf6E8uEIYVa",
    icon: Headphones,
  },
  {
    alt: "Mobile support preview",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNI2BqOhaMxcpEKLSDm-udXS5oljbMZX-eyWu54tQ0ZmSqcv4c-hDaCPhACO-4ySXO8UAsge4h6yqwSQ5SE0iRlyBJf8g-gxISdHoAiyuzBxMveIOpSijgXGuyl0mPpcXbcv5g0b5MaUIFazAN8g-Oa4EslI1Ngc1utGpRsrw3v4KKnxz_NmAAM5WDU9t3zbNkJgs6Stn3tfQbcVVMv7FeltkpX4wP8xXxdp56JlCdj-Nmp3NSi4ojnqpVoMPx6marYdGlc6DFOyev",
    icon: MessageSquare,
  },
];

export default function UnifiedLoginHubPage() {
  const location = useLocation();
  const routeState = location.state as { from?: Location } | null;

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] font-sans">
      <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--accent-primary)] text-[#07111f]">
              <Zap size={20} strokeWidth={2.5} />
            </span>
            <span className="font-display text-xl font-bold">{env.appName}</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <ThemeToggle />
            <span className="hidden text-[var(--text-secondary)] sm:inline">New here?</span>
            <Link to="/register?role=business" className="font-bold text-[var(--accent-primary)] hover:text-[var(--accent-hover)]">
              Create an account
            </Link>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,var(--border-default)_1px,transparent_1px)] bg-[size:24px_24px] opacity-35" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center px-4 py-14 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Welcome back</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
              Select your portal to continue to the correct SupportFlow workspace.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Link
              to="/login/workspace"
              state={routeState ? { from: routeState.from } : undefined}
              className="group flex min-h-72 flex-col items-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 text-center shadow-sm transition hover:border-[var(--accent-primary)] hover:shadow-lg"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-glow)] text-[var(--accent-primary)] transition group-hover:bg-[var(--accent-primary)] group-hover:text-[#07111f]">
                <Building2 size={30} />
              </span>
              <h2 className="mt-6 font-display text-2xl font-bold">Business Admin / Agent Login</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-[var(--text-secondary)]">
                Access your workspace, manage support tickets, invite agents, and view performance analytics.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-[var(--accent-primary)] transition-all group-hover:gap-4">
                Enter workspace
                <ArrowRight size={17} />
              </span>
            </Link>

            <Link
              to="/customer"
              className="group flex min-h-72 flex-col items-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 text-center shadow-sm transition hover:border-[var(--accent-primary)] hover:shadow-lg"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--bg-elevated)] text-[var(--info)] transition group-hover:bg-[var(--accent-primary)] group-hover:text-[#07111f]">
                <UserRound size={30} />
              </span>
              <h2 className="mt-6 font-display text-2xl font-bold">Customer Login</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-[var(--text-secondary)]">
                Find your business provider, verify your details, track requests, and connect with support.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-[var(--accent-primary)] transition-all group-hover:gap-4">
                Track my requests
                <ArrowRight size={17} />
              </span>
            </Link>
          </div>

          <div className="mt-12 grid gap-4 opacity-80 sm:grid-cols-3">
            {previewImages.map((image) => (
              <div key={image.alt} className="relative h-32 overflow-hidden rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                <img className="h-full w-full object-cover" alt={image.alt} src={image.src} />
                <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-md bg-[var(--bg-surface)]/90 text-[var(--accent-primary)] shadow-sm">
                  <image.icon size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-sm text-[var(--text-secondary)] sm:px-6 md:flex-row lg:px-8">
          <span className="font-display font-bold text-[var(--text-primary)]">{env.appName}</span>
          <span>© 2026 {env.appName}. Engineered for performance.</span>
        </div>
      </footer>
    </div>
  );
}
