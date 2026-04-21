export default function SideNavBar() {
  const items = [
    { name: "Concierge", icon: "smart_toy", active: true },
    { name: "Experiences", icon: "explore" },
    { name: "Stays", icon: "hotel" },
    { name: "Bookmarks", icon: "bookmark" },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-slate-950 pt-24 flex-col border-r border-slate-800">

      <div className="px-6 mb-6">
        <h2 className="font-bold">Welcome back</h2>
        <p className="text-slate-500 text-sm">Elite Member</p>
      </div>

      <div className="flex flex-col gap-2 px-3">
        {items.map((i) => (
          <div
            key={i.name}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
            ${i.active ? "bg-violet-500/10 text-violet-400 border-r-2 border-violet-500" : "text-slate-500 hover:bg-slate-900"}`}
          >
            <span className="material-symbols-outlined">{i.icon}</span>
            {i.name}
          </div>
        ))}
      </div>

      <div className="mt-auto p-4">
        <button className="w-full py-3 bg-violet-600 rounded-xl font-bold">
          Book Experience
        </button>
      </div>

    </aside>
  );
}