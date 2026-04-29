import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const MembershipCard = () => {
  const { user, api } = useContext(AuthContext);
  const [tier, setTier] = useState("Member");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (user) {
      api.get('/bookings/my-bookings')
        .then(({ data }) => {
          const stays = data.length;
          setPoints(stays * 1500); // 1500 points per stay
          if (stays >= 10) setTier("Elite");
          else if (stays >= 5) setTier("Gold");
          else if (stays >= 1) setTier("Silver");
          else setTier("Member");
        })
        .catch(console.error);
    }
  }, [api, user]);

  return (
    <div className="md:col-span-2 bg-gradient-to-br from-violet-600 via-indigo-700 to-slate-900 border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700 -mr-20 -mt-20"></div>
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-white/70 font-medium text-sm tracking-widest uppercase mb-1">Blockstay Rewards</p>
            <h2 className="text-4xl text-white font-extrabold tracking-tight">{tier}</h2>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-white text-3xl font-bold">{points.toLocaleString()} <span className="text-lg text-white/70 font-normal">pts</span></span>
            <span className="text-white/70 text-sm font-medium">Target: 15,000 pts</span>
          </div>
          <div className="w-full bg-black/40 rounded-full h-2.5 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${Math.min((points / 15000) * 100, 100)}%` }}></div>
          </div>
          <p className="text-white/60 text-xs mt-3 font-medium">Earn 1,500 points per completed stay to upgrade your tier.</p>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;