export default function Sidebar() {
  const items = [
    "Dashboard",
    "Listings",
    "Bookings",
    "Users",
    "Reports",
    "Settings",
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-950 border-r border-slate-800 p-6">
      <h1 className="text-violet-500 font-bold text-xl uppercase">
        Midnight Admin
      </h1>

      <nav className="mt-8 space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            {item}
          </div>
        ))}
      </nav>

      <button className="mt-10 w-full bg-purple-600 py-3 rounded-lg">
        New Listing
      </button>
    </aside>
  );
}