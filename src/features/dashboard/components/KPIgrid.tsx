import { JSX } from "react/jsx-runtime";

const KPIGrid = (): JSX.Element => {
  const data = [
    { title: "Active Tickets", value: "24" },
    { title: "Resolution Rate", value: "94%" },
    { title: "AI Deflection", value: "68%" },
    { title: "Avg Response", value: "12m" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {data.map((item, i) => (
        <div key={i} className="bg-[#0e2037] p-4 rounded-xl">
          <p className="text-gray-400 text-sm">{item.title}</p>
          <h2 className="text-2xl font-bold">{item.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default KPIGrid;