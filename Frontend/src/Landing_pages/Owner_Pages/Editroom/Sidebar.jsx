export default function Sidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-950 p-4 border-r border-slate-800 flex flex-col">
      <div className="mb-10 px-2">
        <h1 className="text-lg font-black text-slate-200">
          The Obsidian Suite
        </h1>
        <p className="text-[10px] text-slate-500 uppercase">
          Luxury Boutique Portal
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {["Dashboard", "Properties", "Reservations", "Messages", "Financials"].map(
          (item, i) => (
            <div
              key={i}
              className={`px-4 py-3 rounded-lg cursor-pointer ${
                item === "Properties"
                  ? "bg-violet-500/10 text-violet-400"
                  : "text-slate-500 hover:bg-slate-900/50"
              }`}
            >
              {item}
            </div>
          )
        )}
      </nav>
    </aside>
  );
}