import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClipboardList, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/listings/pending/count`, { withCredentials: true });
        setPendingCount(res.data.count);
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

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen flex flex-col bg-white dark:bg-[#13151a] border-r border-slate-200 dark:border-white/5 p-6 z-50 transition-colors shadow-2xl md:shadow-none">
      <div className="flex items-center justify-between">
        <h1 className="text-purple-600 dark:text-purple-500 font-black text-xl uppercase tracking-tight">
          Blockstay Admin
        </h1>
        <button onClick={onClose} className="md:hidden text-slate-500 hover:text-slate-800 dark:hover:text-white p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <nav className="mt-8 space-y-2 flex-1 overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block p-2 rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? "bg-slate-100 dark:bg-slate-800 text-purple-600 dark:text-violet-400 font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-4 space-y-3">
        <button 
          onClick={() => navigate('/admin/listings?status=pending')}
          title="Review and approve new property listings"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-3 rounded-lg text-white font-bold hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 relative shadow-lg shadow-purple-500/20"
        >
          <ClipboardList size={18} />
          Review Pending
          {pendingCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-black px-2 py-1 rounded-full shadow-md animate-pulse">
              {pendingCount}
            </span>
          )}
        </button>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-500/30 transition-all font-semibold"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
}