import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./admin/AdminLayout";
import StatsCards from "./Financial/StatsCards";
import RevenueByRegion from "./Financial/RevenueByRegion";
import OccupancyTrends from "./Financial/OccupancyTrends";
import PayoutTable from "./Financial/PayoutTable";

export default function Financial() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinancials = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/financials`, { withCredentials: true });
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch financials", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFinancials();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <main className="pt-24 px-4 md:px-8 pb-20 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Financial Reports
            </h2>
            <p className="text-slate-400 mt-2 text-sm max-w-xl">
              Deep dive into fiscal performance, payouts, and platform revenue metrics.
            </p>
          </div>

          <StatsCards stats={data?.stats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <RevenueByRegion data={data?.revenueByRegion} />
            <OccupancyTrends data={data?.occupancyTrends} />
          </div>

          <PayoutTable payouts={data?.payouts} />
        </main>
    </AdminLayout>
  );
}