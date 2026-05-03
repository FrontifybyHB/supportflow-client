import React from 'react';
import { Link } from 'react-router-dom';
import { Box, LayoutDashboard, Mail, Book, SearchX } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen flex flex-col font-sans">
      <style>
        {`
          .dot-grid {
            background-image: radial-gradient(circle, var(--border-subtle) 1px, transparent 1px);
            background-size: 24px 24px;
          }
        `}
      </style>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center relative dot-grid overflow-hidden p-6">
        {/* Decorative Background Element */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] flex items-center justify-center">
          <span className="font-display text-[24rem] leading-none text-[var(--text-primary)] select-none font-extrabold tracking-tighter">
            404
          </span>
        </div>

        {/* Centered Card */}
        <div className="z-10 w-full max-w-[420px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm p-10 flex flex-col items-center text-center">
          {/* Branding */}
          <div className="mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--accent-primary)] rounded-xl flex items-center justify-center shadow-sm">
              <Box className="text-[var(--bg-base)]" size={20} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">SupportFlow AI</span>
          </div>

          {/* Content Area */}
          <div className="space-y-4 mb-10">
            <h1 className="font-display text-3xl font-bold text-[var(--text-primary)]">Page not found</h1>
            <p className="text-sm text-[var(--text-secondary)] max-w-[300px] mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Primary Action */}
          <Link
            to="/dashboard"
            className="w-full bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--bg-base)] font-bold text-sm h-11 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm shadow-[var(--accent-primary)]/20"
          >
            <LayoutDashboard size={18} />
            Back to Dashboard
          </Link>

          {/* Secondary Help */}
          <div className="mt-8 pt-8 border-t border-[var(--border-subtle)] w-full flex flex-col items-center gap-4">
            <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Need technical assistance?</p>
            <div className="flex gap-6">
              <Link
                to="#"
                className="text-sm font-semibold text-[var(--accent-primary)] hover:underline flex items-center gap-1.5"
              >
                <Mail size={16} />
                Support
              </Link>
              <Link
                to="#"
                className="text-sm font-semibold text-[var(--accent-primary)] hover:underline flex items-center gap-1.5"
              >
                <Book size={16} />
                Documentation
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative UI Element (Asymmetric accent) */}
        <div className="absolute bottom-12 right-12 hidden lg:block opacity-60 pointer-events-none">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-5 rounded-2xl flex items-start gap-4 w-72 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent-glow)] flex items-center justify-center shrink-0 border border-[var(--accent-primary)]/10">
              <SearchX className="text-[var(--accent-primary)]" size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)] mb-1">Index Missing</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                The requested resource could not be found on our production nodes.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--bg-elevated)] w-full py-12 border-t border-[var(--border-subtle)] z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-[var(--text-primary)] text-sm">SupportFlow AI</span>
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">© 2024. Engineered for performance.</span>
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

export default NotFoundPage;
