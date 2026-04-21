import Sidebar from "./admin/Sidebar";
import Topbar from "./admin/Topbar";
import MetricsGrid from "./admin/MetricsGrid";
import RevenueChart from "./admin/RevenueChart";
import ApprovalQueue from "./admin/ApprovalQueue";
import SystemLogs from "./admin/SystemLogs";
import FloatingButton from "./admin/FloatingButton";

export default function AdminDashboard() {
  return (
    <div className="bg-background text-on-surface min-h-screen font-body">
      <Sidebar />
      <Topbar />

      <main className="ml-64 pt-24 px-8 pb-12">
        <MetricsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <RevenueChart />
          <ApprovalQueue />
        </div>

        <SystemLogs />
      </main>

      <FloatingButton />
    </div>
  );
}