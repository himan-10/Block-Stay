const Sidebar = () => {
  return (
    <aside className="h-full w-64 fixed left-0 border-r border-slate-800/30 bg-slate-900 flex flex-col py-8 z-50 hidden md:flex">
      <div className="px-8 mb-12">
        <h1 className="text-lg font-black text-slate-100">
          BlockStay
        </h1>
      </div>

      <nav className="flex-grow space-y-1 px-4">
        {[
            { name: "Dashboard", path: "/user/dashboard", icon: "dashboard" },
            { name: "Bookings", path: "/user/bookings", icon: "event" },
            { name: "Wishlist", path: "/user/wishlist", icon: "favorite" },
            { name: "Profile", path: "/user/profile", icon: "person" }
          ].map((item, i) => (
            <a key={i} href={item.path} className="flex items-center space-x-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
              <span className="material-symbols-outlined text-sm">{item.icon}</span>
              <span className="text-[10px] uppercase font-medium">{item.name}</span>
            </a>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;