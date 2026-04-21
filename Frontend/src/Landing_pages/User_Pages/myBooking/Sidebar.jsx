const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 fixed left-0 h-full bg-slate-900 flex-col py-8">
      <div className="px-6 mb-10">
        <h2 className="text-white font-bold">Concierge Access</h2>
        <p className="text-xs text-slate-500 uppercase">Elite Status</p>
      </div>

      <nav className="flex flex-col gap-2">
        {["Dashboard", "Bookings", "Wishlist", "Chat", "Profile"].map((item) => (
          <a key={item} className="px-6 py-3 text-slate-400 hover:text-white">
            {item}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;