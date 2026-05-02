import { JSX } from "react/jsx-runtime";
import ForgotPasswordCard from "../components/ForgotPasswordCard";

const ForgotPassword = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col bg-[#02142a] text-[#d4e3ff]">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-center items-center px-6 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="flex items-center gap-2 text-xl font-bold text-slate-50">
          ⚙️ SupportFlow AI
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-4 pt-20 pb-12 relative">
        <ForgotPasswordCard />
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-950 py-8 border-t border-slate-900 text-center text-xs text-gray-500">
        © 2024 SupportFlow AI
      </footer>
    </div>
  );
};

export default ForgotPassword;