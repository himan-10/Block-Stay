import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./admin/AdminLayout";
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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/metrics`, { withCredentials: true });
        setMetrics(res.data);
      } catch (err) {
        console.error("Failed to fetch admin metrics", err);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <AdminLayout>
      <main className="pt-24 px-4 md:px-8 pb-12 w-full max-w-7xl mx-auto">
        <MetricsGrid metrics={metrics} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <RevenueChart />
          <ApprovalQueue />
        </div>

        <SystemLogs />
      </main>

      <FloatingButton />
    </AdminLayout>
  );
}