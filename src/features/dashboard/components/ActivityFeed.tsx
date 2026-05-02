import { JSX } from "react/jsx-runtime";

const ActivityFeed = (): JSX.Element => {
  const logs = [
    "Ticket #AX-9021 escalated",
    "AI resolved billing issue",
    "New request received",
  ];

  return (
    <div className="bg-[#0e2037] p-6 rounded-xl">
      <h3 className="mb-4">Event Logs</h3>

      <div className="space-y-3">
        {logs.map((log, i) => (
          <p key={i} className="text-sm text-gray-300">
            {log}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;