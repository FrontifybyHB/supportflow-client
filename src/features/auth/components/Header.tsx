import { JSX } from "react/jsx-runtime";

const Header = (): JSX.Element => {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="flex items-center gap-2 text-xl font-bold text-slate-50">
        <span className="text-cyan-400 text-2xl">⚡</span>
        <span>SupportFlow AI</span>
      </div>

      <div className="flex gap-4 text-slate-400">
        <button type="button">?</button>
        <button type="button">🌙</button>
      </div>
    </header>
  );
};

export default Header;