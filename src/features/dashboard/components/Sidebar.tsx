import { JSX } from "react/jsx-runtime";

const Sidebar = (): JSX.Element => {
  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-slate-900 text-sm flex flex-col p-4">
      
      <div className="mb-8 flex items-center gap-3">
        <div className="w-9 h-9 bg-cyan-400/20 rounded-lg flex items-center justify-center">
          🛡
        </div>
        <h1 className="text-cyan-400 font-bold">Aegis AI</h1>
      </div>

      <nav className="flex flex-col gap-2">
        <a className="text-cyan-400 bg-cyan-400/10 p-2 rounded">Dashboard</a>
        <a className="text-gray-400 hover:text-white">Tickets</a>
        <a className="text-gray-400 hover:text-white">Analytics</a>
        <a className="text-gray-400 hover:text-white">AI Training</a>
        <a className="text-gray-400 hover:text-white">Settings</a>
      </nav>

      <button className="mt-6 bg-cyan-400 text-black py-2 rounded">
        + New Ticket
      </button>
    </aside>
  );
};

export default Sidebar;