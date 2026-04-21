import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

export default function ArrivalCard() {
  const [arrivals, setArrivals] = useState([]);
  const { api } = useContext(AuthContext);

  useEffect(() => {
    const fetchArrivals = async () => {
      try {
        const { data } = await api.get('/bookings/owner-bookings');
        const upcoming = data.filter(b => b.status === 'confirmed');
        setArrivals(upcoming.slice(0, 3));
      } catch (e) {
        console.error(e);
      }
    };
    fetchArrivals();
  }, [api]);

  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Upcoming Arrivals</h3>

      <div className="space-y-4">
        {arrivals.length === 0 ? (
          <p className="text-sm text-slate-400">No upcoming arrivals.</p>
        ) : arrivals.map(arrival => (
          <div key={arrival._id} className="flex justify-between items-center border-b border-slate-700 pb-2 last:border-0">
            <div>
              <p className="font-semibold">{arrival.room?.name || 'Unknown Room'}</p>
              <p className="text-sm text-slate-400">Guest: {arrival.user?.name || 'Unknown'}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-violet-400">In: {new Date(arrival.checkIn).toLocaleDateString()}</p>
              <p className="text-xs text-slate-500">Out: {new Date(arrival.checkOut).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}