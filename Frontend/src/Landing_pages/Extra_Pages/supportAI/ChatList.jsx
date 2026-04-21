export default function ChatList() {
  const chats = [
    { title: "Maldives Itinerary", desc: "Curated villas...", time: "2m ago", active: true },
    { title: "Tokyo Dining", desc: "Jiro reservation...", time: "1h ago" },
    { title: "Private Jet Charter", desc: "Gulfstream comparison...", time: "Yesterday" },
  ];

  return (
    <section className="hidden md:flex w-80 flex-col border-r border-slate-800 bg-slate-900/30">

      <div className="p-4 border-b border-slate-800">
        <h3 className="font-bold mb-3">Recent Dialogues</h3>
        <input
          className="w-full p-2 bg-slate-800 rounded-lg text-sm"
          placeholder="Search..."
        />
      </div>

      <div className="p-3 space-y-2 overflow-y-auto">
        {chats.map((c) => (
          <div
            key={c.title}
            className={`p-3 rounded-xl cursor-pointer ${
              c.active ? "bg-violet-500/10 border-l-2 border-violet-500" : "hover:bg-slate-800"
            }`}
          >
            <div className="flex justify-between text-sm font-semibold">
              {c.title}
              <span className="text-[10px] text-slate-500">{c.time}</span>
            </div>
            <p className="text-xs text-slate-500">{c.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}