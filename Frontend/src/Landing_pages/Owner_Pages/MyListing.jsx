import Sidebar from "./mylists/Sidebar";
import Topbar from "./mylists/Topbar";
import StatsCard from "./mylists/StatsCard";
import PropertyCard from "./mylists/PropertyCard";
import PropertiesHeader from "./mylists/PropertiesHeader";
import Pagination from "./mylists/Pagination";

export default function Properties() {
  const properties = [
    {
      name: "Obsidian Penthouse",
      location: "Reykjavik",
      price: 1250,
      status: "active",
      analytics: 92,
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
    },
    {
      name: "Vault Loft",
      location: "Berlin",
      price: 840,
      status: "inactive",
      analytics: 45,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    }
  ];

  return (
    <div className="flex bg-[#0b1326] text-slate-200 min-h-screen">

      <Sidebar />

      <div className="flex-1 ml-64">
        <Topbar />

        <div className="p-10 space-y-10">

          <PropertiesHeader />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <StatsCard title="Revenue" value="$142.8k" />
            <StatsCard title="Occupancy" value="88%" />
            <StatsCard title="Insights" value="Growth ↑" />
          </div>

          {/* Properties List */}
          <div className="space-y-4">
            {properties.map((p, i) => (
              <PropertyCard key={i} data={p} />
            ))}
          </div>

          <Pagination />

        </div>
      </div>
    </div>
  );
}