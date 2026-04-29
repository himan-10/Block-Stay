import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const DashboardStats = () => {
  const [totalSpends, setTotalSpends] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [confirmedBookings, setConfirmedBookings] = useState(0);
  const [loading, setLoading] = useState(true);
  const { api, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/bookings/my-bookings');
        if (data && Array.isArray(data)) {
          // Filter out pending if needed, but data already filters pending out based on our previous fix in backend.
          // Wait, backend bookingController.js getMyBookings excludes pending? 
          // Let's just calculate based on what we get:
          const confirmed = data.filter(b => b.status === 'confirmed');
          const spends = confirmed.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
          
          setTotalBookings(data.length);
          setConfirmedBookings(confirmed.length);
          setTotalSpends(spends);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchStats();
  }, [api, user]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-28 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-white/10 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Spends */}
      <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 backdrop-blur-md border border-violet-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-violet-500/40 transition-colors">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-violet-500/10 rounded-full blur-xl group-hover:bg-violet-500/20 transition-colors"></div>
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-violet-200 text-sm font-medium mb-1">Total Spends</p>
            <h4 className="text-3xl font-black text-white">₹{totalSpends.toLocaleString()}</h4>
          </div>
          <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
            <span className="material-symbols-outlined text-violet-300">payments</span>
          </div>
        </div>
      </div>

      {/* Total Bookings */}
      <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-colors"></div>
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-cyan-200 text-sm font-medium mb-1">Total Bookings</p>
            <h4 className="text-3xl font-black text-white">{totalBookings}</h4>
          </div>
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
            <span className="material-symbols-outlined text-cyan-300">history</span>
          </div>
        </div>
      </div>

      {/* Confirmed Bookings */}
      <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors"></div>
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-emerald-200 text-sm font-medium mb-1">Confirmed Stays</p>
            <h4 className="text-3xl font-black text-white">{confirmedBookings}</h4>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <span className="material-symbols-outlined text-emerald-300">check_circle</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
