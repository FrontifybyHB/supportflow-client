import { useState } from "react";
import { LogOut, Menu, Search, LayoutDashboard, Ticket, MessageSquare, BookOpen, Users, BarChart2, Settings, X, Bolt } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/components/ui/Button";
import { Avatar } from "@/shared/components/ui/Avatar";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggle";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { User as AuthUser } from "@/features/auth/types/auth.types";
import { cn } from "@/shared/utils/cn";

const NAV_LINKS = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Tickets", path: "/tickets", icon: Ticket },
  { name: "Conversations", path: "/conversations", icon: MessageSquare },
  { name: "Knowledge Base", path: "/knowledge", icon: BookOpen },
  { name: "Agents", path: "/agents", icon: Users },
  { name: "Analytics", path: "/analytics", icon: BarChart2 },
  { name: "Settings", path: "/settings", icon: Settings },
];

function NavContent({ user, onNavigate }: { user: AuthUser | null; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center px-6 gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-primary)] shadow-sm">
          <Bolt className="h-5 w-5 text-[var(--bg-base)]" strokeWidth={2.5} />
        </div>
        <span className="font-display text-xl font-bold tracking-tight text-[var(--accent-primary)]">
          SupportFlow
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[var(--accent-glow)] text-[var(--accent-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
              )
            }
          >
            {({ isActive }) => (
              <>
                <link.icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? "text-[var(--accent-primary)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
                  )}
                  aria-hidden="true"
                />
                {link.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-3 py-2">
          <Avatar initials={user?.name?.[0] || "U"} size="sm" />
          <div className="flex flex-col truncate">
            <span className="text-sm font-medium text-[var(--text-primary)] truncate">{user?.name}</span>
            <span className="text-xs text-[var(--text-muted)] truncate">{user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppLayout() {
  const { logout, user, isLoggingOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] font-sans">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-surface)] lg:block z-20">
        <NavContent user={user} />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[var(--bg-base)]/80 backdrop-blur-sm lg:hidden"
              onClick={toggleMenu}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] lg:hidden"
            >
              <div className="absolute right-4 top-4">
                <Button variant="ghost" size="sm" onClick={toggleMenu} className="px-2">
                  <X size={20} />
                </Button>
              </div>
              <NavContent user={user} onNavigate={closeMobileMenu} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 backdrop-blur-md px-4 sm:px-6">
          <Button aria-label="Open navigation" className="lg:hidden px-2" variant="ghost" onClick={toggleMenu}>
            <Menu size={20} />
          </Button>

          <div className="flex flex-1 items-center gap-x-4 lg:gap-x-6">
            <form className="relative flex flex-1" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">Search</label>
              <Search className="absolute inset-y-0 left-0 h-full w-5 text-[var(--text-muted)] pointer-events-none" aria-hidden="true" />
              <input
                id="search-field"
                className="block h-full w-full border-0 py-0 pl-8 pr-0 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:ring-0 sm:text-sm"
                placeholder="Search tickets, knowledge base, and agents..."
                type="search"
                name="search"
              />
            </form>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <ThemeToggle />
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-[var(--border-subtle)]" aria-hidden="true" />
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-[var(--error)] hover:text-[var(--error)] hover:bg-[var(--error)]/10"
                onClick={() => void logout()}
                isLoading={isLoggingOut}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
