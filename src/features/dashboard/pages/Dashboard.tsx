import Topbar from "../components/Topbar";
import Chart from "../components/Chart";
import ActivityFeed from "../components/ActivityFeed"; 
import { JSX } from "react/jsx-runtime";
import Sidebar from "../components/Sidebar";
import KPIGrid from "../components/KPIgrid";

const Dashboard = (): JSX.Element => {
  return (
    <div className="bg-[#02142a] text-white min-h-screen">
      <Sidebar />
      <Topbar />

      <main className="ml-[240px] pt-24 p-6 space-y-6">
        <KPIGrid />
        <Chart />
        <ActivityFeed />
      </main>
    </div>
  );
};

export default Dashboard;