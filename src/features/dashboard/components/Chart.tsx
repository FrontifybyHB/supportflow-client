import { JSX } from "react/jsx-runtime";

const Chart = (): JSX.Element => {
  const bars = [20, 40, 60, 80, 50, 90, 30];

  return (
    <div className="bg-[#0e2037] p-6 rounded-xl">
      <h3 className="mb-4">Support Velocity</h3>

      <div className="flex items-end gap-2 h-40">
        {bars.map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className="flex-1 bg-cyan-400/60 rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default Chart;