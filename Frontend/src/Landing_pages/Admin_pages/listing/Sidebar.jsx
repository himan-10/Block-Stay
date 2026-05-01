import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { LayoutDashboard, List, CalendarCheck, Users, PieChart, Settings, AlertCircle, ClipboardList } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/listings", { withCredentials: true });
        const count = res.data.filter(l => l.status === "pending").length;
        setPendingCount(count);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPendingCount();
  }, []);

  const items = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Listings", path: "/admin/listings", icon: List },
    { name: "Bookings", path: "/admin/bookings", icon: CalendarCheck },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Financials", path: "/admin/financial", icon: PieChart },
    { name: "Reports", path: "/admin/reports", icon: AlertCircle },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-950 border-r border-slate-800/30 flex flex-col py-6 z-50">
      <div className="px-6 mb-10">
        <h1 className="text-xl font-bold text-violet-500">Midnight Admin</h1>
        <p className="text-[10px] uppercase text-slate-500 mt-1">
          System Oversight
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors ${
                  isActive
                    ? "bg-slate-900/80 text-violet-400 font-bold shadow-sm"
                    : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-300"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-6">
        <button 
          onClick={() => navigate('/admin/listings?status=pending')}
          title="Review and approve new property listings"
          className="relative w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
        >
          <ClipboardList size={16} />
          Review Pending
          {pendingCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md animate-pulse">
              {pendingCount}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}