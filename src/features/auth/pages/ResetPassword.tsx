import { JSX } from "react/jsx-runtime";
import ResetPasswordCard from "../components/ResetPasswordCard";

const ResetPassword = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col bg-[#02142a] text-[#d4e3ff]">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="flex items-center gap-2 text-xl font-bold text-slate-50">
          🔐 SupportFlow AI
        </div>

        <div className="flex gap-4 text-slate-400">
          <button>?</button>
          <button>🌙</button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-4 py-10 mt-16">
        <ResetPasswordCard />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-6 text-center text-xs text-gray-500 border-t border-slate-900">
        © 2024 SupportFlow AI
      </footer>
    </div>
  );
};

export default ResetPassword;