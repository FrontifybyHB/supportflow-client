import { JSX } from "react/jsx-runtime";

const Topbar = (): JSX.Element => {
  return (
    <header className="fixed top-0 right-0 h-16 bg-slate-900 w-[calc(100%-240px)] flex items-center justify-between px-6">
      
      <input
        placeholder="Search..."
        className="bg-slate-800 px-4 py-2 rounded text-sm"
      />

      <div className="flex items-center gap-4">
        🔔 ⏱ 🌐
        <div className="flex items-center gap-2">
          <span className="text-xs">Admin</span>
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;