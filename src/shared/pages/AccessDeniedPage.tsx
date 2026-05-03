import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const AccessDeniedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen flex flex-col font-sans">
      <style>
        {`
          .dot-grid-bg {
            background-image: radial-gradient(var(--border-subtle) 1px, transparent 1px);
            background-size: 24px 24px;
          }
        `}
      </style>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[var(--bg-surface)]/80 backdrop-blur-md border-b border-[var(--border-subtle)]">
        <div className="flex items-center justify-between h-14 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <span className="font-display text-lg font-bold tracking-tight text-[var(--text-primary)]">SupportFlow AI</span>
            <div className="hidden md:flex gap-6">
              <Link to="#" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200">
                Features
              </Link>
              <Link to="#" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200">
                Case Studies
              </Link>
              <Link to="#" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200">
                Docs
              </Link>
              <Link to="#" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200">
                Pricing
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-xl transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 text-sm font-semibold bg-[var(--accent-primary)] text-[var(--bg-base)] rounded-xl hover:bg-[var(--accent-hover)] active:scale-95 transition-all shadow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center pt-14 px-4 dot-grid-bg">
        <div className="w-full max-w-[420px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm p-10 flex flex-col items-center text-center">
          {/* Icon Container */}
          <div className="mb-8 p-5 bg-[var(--error)]/10 rounded-full border border-[var(--error)]/20 shadow-sm shadow-[var(--error)]/5">
            <ShieldAlert className="text-[var(--error)]" size={48} strokeWidth={1.5} />
          </div>

          {/* Content */}
          <div className="space-y-4 mb-10">
            <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] tracking-tight">Access Denied</h1>
            <p className="text-sm text-[var(--text-secondary)] max-w-[320px] leading-relaxed mx-auto">
              This section is restricted to administrators. Please contact your system manager for elevated
              permissions.
            </p>
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col gap-3">
            <Link
              to="/dashboard"
              className="w-full h-11 flex items-center justify-center rounded-xl bg-[var(--accent-primary)] text-[var(--bg-base)] text-sm font-bold hover:bg-[var(--accent-hover)] transition-all active:scale-95 shadow-sm shadow-[var(--accent-primary)]/20"
            >
              Back to Dashboard
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="w-full h-11 flex items-center justify-center rounded-xl bg-transparent text-[var(--text-secondary)] text-sm font-semibold border border-[var(--border-default)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-all active:scale-95"
            >
              Go back
            </button>
          </div>

          {/* Subtle Illustration (Asymmetric Pattern) */}
          <div className="mt-12 opacity-20">
            <div className="relative w-full h-12 flex justify-center gap-1.5 items-end">
              <div className="w-1.5 h-8 bg-[var(--accent-primary)] rounded-full"></div>
              <div className="w-1.5 h-12 bg-[var(--accent-primary)] rounded-full"></div>
              <div className="w-1.5 h-6 bg-[var(--accent-primary)] rounded-full"></div>
              <div className="w-1.5 h-10 bg-[var(--accent-primary)] rounded-full"></div>
              <div className="w-1.5 h-7 bg-[var(--accent-primary)] rounded-full"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--bg-elevated)] w-full py-12 border-t border-[var(--border-subtle)] z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <span className="font-display font-bold text-[var(--text-primary)] text-sm">SupportFlow AI</span>
            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">© 2024 SupportFlow AI. Engineered for performance.</p>
          </div>
          <div className="flex gap-8">
            <Link to="#" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
              Privacy
            </Link>
            <Link to="#" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
              Terms
            </Link>
            <Link to="#" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
              Status
            </Link>
            <Link to="#" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
              Twitter
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AccessDeniedPage;
