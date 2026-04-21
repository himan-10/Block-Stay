import StatsCards from "./Financial/StatsCards";
import RevenueByRegion from "./Financial/RevenueByRegion";
import OccupancyTrends from "./Financial/OccupancyTrends";
import PayoutTable from "./Financial/PayoutTable";

export default function Financial() {
  return (
    <main className="pt-24 px-10 pb-20">

      {/* Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold">Financial Reports</h2>
        <p className="text-slate-400">
          Deep dive into fiscal performance and regional growth metrics.
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <RevenueByRegion />
        <OccupancyTrends />
      </div>

      <PayoutTable />

    </main>
  );
}