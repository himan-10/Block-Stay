import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-950 border-r border-slate-800/30 flex flex-col py-6 z-50">
      <div className="px-6 mb-10">
        <h1 className="text-xl font-bold text-violet-500">Midnight Admin</h1>
        <p className="text-[10px] uppercase text-slate-500 mt-1">
          System Oversight
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {["Dashboard", "Listings", "Bookings", "Users", "Reports", "Settings"].map((item) => (
          <Link
            key={item}
            className={`flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-900/80 ${
              item === "Listings" ? "text-violet-400 font-bold" : "text-slate-400"
            }`}
          >
            <span className="material-symbols-outlined">{item.toLowerCase()}</span>
            {item}
          </Link>
        ))}
      </nav>

      <div className="px-6">
        <button className="w-full py-3 bg-violet-600 text-white rounded-md text-sm font-bold">
          + New Listing
        </button>
      </div>
    </aside>
  );
}