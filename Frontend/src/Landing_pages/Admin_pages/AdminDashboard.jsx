import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./admin/Sidebar";
import Topbar from "./admin/Topbar";
import MetricsGrid from "./admin/MetricsGrid";
import RevenueChart from "./admin/RevenueChart";
import ApprovalQueue from "./admin/ApprovalQueue";
import SystemLogs from "./admin/SystemLogs";
import FloatingButton from "./admin/FloatingButton";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/metrics", { withCredentials: true });
        setMetrics(res.data);
      } catch (err) {
        console.error("Failed to fetch admin metrics", err);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="bg-background text-on-surface min-h-screen font-body">
      <Sidebar />
      <Topbar />

      <main className="ml-64 pt-24 px-8 pb-12">
        <MetricsGrid metrics={metrics} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <RevenueChart />
          <ApprovalQueue />
        </div>

        <SystemLogs />
      </main>

      <FloatingButton />
    </div>
  );
}