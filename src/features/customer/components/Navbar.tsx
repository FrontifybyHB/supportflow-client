import { JSX } from "react/jsx-runtime";

const Navbar = (): JSX.Element => {
  return (
    <header className="fixed top-0 w-full h-16 flex justify-between items-center px-8 bg-[#111827]/80 backdrop-blur-md border-b border-white/5 z-50">
      
      <h1 className="text-cyan-400 font-bold text-lg">
        Aegis AI Support
      </h1>

      <nav className="hidden md:flex gap-6 text-gray-400">
        <a href="#">Analytics</a>
        <a href="#">Deployments</a>
        <a href="#">Training</a>
        <a href="#">Settings</a>
      </nav>

      <div className="flex gap-3 items-center">
        🔔 ❓
        <img
          src="https://i.pravatar.cc/40"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Navbar;