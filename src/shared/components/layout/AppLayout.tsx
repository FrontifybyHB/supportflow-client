import { LogOut, Menu, Search } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Button } from "@/shared/components/ui/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function AppLayout() {
  const { logout, user, isLoggingOut } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white px-4 py-5 lg:block">
        <div className="flex h-11 items-center rounded-md bg-slate-950 px-3 text-sm font-semibold text-white">
          SupportFlow
        </div>
        <nav className="mt-6 space-y-1">
          <a
            className="flex h-10 items-center rounded-md bg-cyan-50 px-3 text-sm font-semibold text-cyan-900"
            href="/dashboard"
          >
            Dashboard
          </a>
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
            <Button aria-label="Open navigation" className="lg:hidden" variant="ghost">
              <Menu size={20} />
            </Button>

            <div className="hidden h-10 max-w-md flex-1 items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 md:flex">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                placeholder="Search tickets, users, or teams"
              />
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <Button
                aria-label="Sign out"
                disabled={isLoggingOut}
                onClick={() => void logout()}
                variant="secondary"
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
