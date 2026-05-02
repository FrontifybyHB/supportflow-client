import { JSX } from "react/jsx-runtime";

const Footer = (): JSX.Element => {
  return (
    <footer className="mt-24 py-10 border-t border-gray-800 text-center text-sm text-gray-500">
      
      <div className="text-cyan-400 font-bold mb-4">
        AEGIS.AI
      </div>

      <div className="flex justify-center gap-6 mb-4">
        <a href="#">Docs</a>
        <a href="#">Security</a>
        <a href="#">Privacy</a>
      </div>

      <p>© 2024 Aegis Systems Inc.</p>
    </footer>
  );
};

export default Footer;