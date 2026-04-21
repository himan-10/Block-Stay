import { NavLink } from "react-router-dom";

export default function SideNavBar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-950 border-r border-slate-800 flex flex-col py-6">
      
      {/* Logo */}
      <div className="px-6 mb-8">
        <h1 className="text-violet-500 font-bold text-xl">Midnight Admin</h1>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
          System Oversight
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1 text-sm">
        
        <NavLink className="nav-item" to="/dashboard">Dashboard</NavLink>
        <NavLink className="nav-item" to="/listings">Listings</NavLink>
        <NavLink className="nav-item" to="/bookings">Bookings</NavLink>

        {/* Active */}
        <NavLink
          to="/users"
          className="nav-item bg-slate-900 text-violet-400 font-bold"
        >
          Users
        </NavLink>

        <NavLink className="nav-item" to="/reports">Reports</NavLink>
        <NavLink className="nav-item" to="/settings">Settings</NavLink>
      </nav>

      {/* Bottom */}
      <div className="px-4 space-y-2">
        <button className="w-full py-2 bg-violet-600 rounded text-xs uppercase">
          New Listing
        </button>

        <button className="nav-item">Support</button>
        <button className="nav-item">Sign Out</button>
      </div>
    </aside>
  );
}