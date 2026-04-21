import Sidebar from "./OwnerDashboard/Sidebar";
import Topbar from "./OwnerDashboard/Topbar";
import MetricCard from "./OwnerDashboard/MetricCard";
import ArrivalCard from "./OwnerDashboard/ArrivalCard";
import ActivityTimeline from "./OwnerDashboard/ActivityTimeline";
import MaintenanceCard from "./OwnerDashboard/MaintenanceCard";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function OwnerDashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-[#0b1326] text-slate-200 min-h-screen flex">
      
      <Sidebar />

      <div className="flex-1 ml-64">
        <Topbar />

        <div className="p-10 space-y-12">

          {/* Hero */}
          <div>
            <p className="text-cyan-400 text-xs tracking-widest uppercase">
              Portfolio Overview
            </p>
            <h1 className="text-4xl font-bold mt-2">
              Welcome back, <span className="text-violet-400">{user?.name || "Owner"}</span>
            </h1>
          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            <MetricCard title="Revenue" value="$142,850" />
            <MetricCard title="Occupancy" value="94%" />
            <MetricCard title="Rating" value="4.92" />
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-12 gap-10">
            
            <div className="lg:col-span-8 space-y-8">
              <ArrivalCard />
              <ActivityTimeline />
            </div>

            <div className="lg:col-span-4">
              <MaintenanceCard />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}