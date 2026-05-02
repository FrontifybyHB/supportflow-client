import { JSX } from "react/jsx-runtime";

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 w-full py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-4 text-xs text-gray-500">
        
        <div>© 2024 SupportFlow AI</div>

        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
          <div className="text-cyan-400">● System Status</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;