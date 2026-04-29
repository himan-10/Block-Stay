import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const MembershipCard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:-translate-y-1">
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-600/30 rounded-full blur-3xl group-hover:bg-violet-500/40 transition-colors duration-500"></div>
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 mb-6 shadow-lg shadow-violet-500/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <p className="text-violet-300 text-sm font-medium tracking-wide uppercase mb-1">Current Tier</p>
          <h4 className="text-2xl text-white font-extrabold tracking-tight">
            Elite Member
          </h4>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-end">
          <div>
            <p className="text-slate-400 text-sm mb-1">Account</p>
            <p className="text-white font-medium truncate max-w-[150px]">{user?.name || user?.email || "Guest User"}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm mb-1">Points</p>
            <p className="text-violet-400 font-bold text-xl">128,450</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;