import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClipboardList } from "lucide-react";

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
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Listings", path: "/admin/listings" },
    { name: "Bookings", path: "/admin/bookings" },
    { name: "Users", path: "/admin/users" },
    { name: "Financials", path: "/admin/financial" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-6 z-50 transition-colors">
      <h1 className="text-purple-600 dark:text-violet-500 font-bold text-xl uppercase">
        Midnight Admin
      </h1>

      <nav className="mt-8 space-y-2">
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

      <button 
        onClick={() => navigate('/admin/listings?status=pending')}
        title="Review and approve new property listings"
        className="mt-10 w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-3 rounded-lg text-white font-bold hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 relative shadow-lg shadow-purple-500/20"
      >
        <ClipboardList size={18} />
        Review Pending
        {pendingCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-black px-2 py-1 rounded-full shadow-md animate-pulse">
            {pendingCount}
          </span>
        )}
      </button>
    </aside>
  );
}