import Sidebar from "./mylists/Sidebar";
import Topbar from "./mylists/Topbar";
import StatsCard from "./mylists/StatsCard";
import PropertyCard from "./mylists/PropertyCard";
import PropertiesHeader from "./mylists/PropertiesHeader";
import Pagination from "./mylists/Pagination";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const { api, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyListings = async () => {
      if (!user) return;
      try {
        const { data } = await api.get('/rooms');
        // Filter by the logged-in owner and map fields to PropertyCard expectations
        const myRooms = data
          .filter(room => room.owner && room.owner._id === user._id)
          .map(room => ({
            _id: room._id,
            name: room.name,
            location: room.location,
            price: room.pricePerMonth,
            status: "active",
            analytics: Math.floor(Math.random() * 50) + 50, // mock analytics
            image: room.images && room.images.length > 0 ? room.images[0] : "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
          }));
        setProperties(myRooms);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchMyListings();
  }, [user, api]);

  return (
    <div className="flex bg-[#0b1326] text-slate-200 min-h-screen">

      <Sidebar />

      <div className="flex-1 ml-64">
        <Topbar />

        <div className="p-10 space-y-10">

          <PropertiesHeader />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <StatsCard title="Revenue" value="₹14.28L" />
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