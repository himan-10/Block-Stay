import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClipboardList } from "lucide-react";

export default function SideNavBar() {
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
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Listings", path: "/admin/listings" },
    { name: "Bookings", path: "/admin/bookings" },
    { name: "Users", path: "/admin/users" },
    { name: "Financials", path: "/admin/financial" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-950 border-r border-slate-800 flex flex-col py-6">
      
      {/* Logo */}
      <div className="px-6 mb-8">
        <h1 className="text-violet-500 font-bold text-xl uppercase">Midnight Admin</h1>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
          System Control Hub
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-2 text-sm">
        {items.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block p-2 rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? "bg-slate-800 text-violet-400 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-4 space-y-2">
        <button 
          onClick={() => navigate('/admin/listings?status=pending')}
          title="Review and approve new property listings"
          className="w-full relative py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-colors rounded-lg text-xs uppercase text-white font-bold mb-4 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20"
        >
          <ClipboardList size={14} />
          Review Pending
          {pendingCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md animate-pulse">
              {pendingCount}
            </span>
          )}
        </button>

        <button className="block w-full text-left p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">Support</button>
        <button className="block w-full text-left p-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors">Sign Out</button>
      </div>
    </aside>
  );
}