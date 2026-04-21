const SideNav = () => {
  return (
    <aside className="hidden lg:flex w-64 fixed top-[72px] left-0 bg-slate-900 h-full flex-col p-6">
      <h3 className="text-white mb-6">Concierge Access</h3>

      {["Dashboard", "Bookings", "Wishlist", "Chat", "Profile"].map((item, i) => (
        <a
          key={i}
          href="#"
          className={`flex items-center gap-4 px-4 py-3 ${
            item === "Profile"
              ? "text-violet-400 bg-slate-800"
              : "text-slate-500 hover:text-white"
          }`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          {item}
        </a>
      ))}
    </aside>
  );
};

export default SideNav;