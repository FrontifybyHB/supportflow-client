import { JSX } from "react/jsx-runtime";

const Hero = (): JSX.Element => {
  return (
    <section className="pt-24 flex flex-col items-center text-center px-6 py-20">
      
      <div className="bg-[#192b42]/50 px-4 py-1 rounded-full text-xs mb-6">
        ● System Status: Optimal
      </div>

      <h1 className="text-4xl font-bold mb-4">
        The Future of Support is{" "}
        <span className="text-cyan-400">Autonomous</span>
      </h1>

      <p className="text-gray-400 max-w-xl mb-8">
        Deploy intelligent agents that resolve complex issues in real-time.
      </p>

      <div className="flex gap-4">
        <button className="bg-cyan-400 text-black px-6 py-3 rounded">
          Start Deploying
        </button>
        <button className="border border-gray-600 px-6 py-3 rounded">
          Technical Docs
        </button>
      </div>
    </section>
  );
};

export default Hero;