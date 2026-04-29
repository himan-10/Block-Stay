import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const StatsCard = () => {
  const { api, user } = useContext(AuthContext);
  const [totalStays, setTotalStays] = useState(0);

  useEffect(() => {
    if (user) {
      api.get('/bookings/my-bookings')
        .then(({ data }) => setTotalStays(data.length))
        .catch(console.error);
    }
  }, [api, user]);

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <p className="text-slate-400 font-medium group-hover:text-violet-300 transition-colors">Total Stays</p>
        <div className="p-2 bg-violet-500/20 rounded-lg text-violet-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
        </div>
      </div>
      <h2 className="text-5xl text-white font-extrabold tracking-tight">{totalStays}</h2>
      <p className="text-emerald-400 text-sm mt-3 flex items-center gap-1 font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
        Updated just now
      </p>
    </div>
  );
};

export default StatsCard;