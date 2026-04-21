export default function MetricsGrid() {
  const cards = [
    { title: "Active Users", value: "14,282", color: "text-cyan-400" },
    { title: "Pending Listings", value: "47", color: "text-red-400" },
    { title: "Daily Revenue", value: "₹2,84,500", color: "text-cyan-400" },
    { title: "System Health", value: "99.9%", color: "text-green-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      {cards.map((c) => (
        <div key={c.title} className="bg-slate-900 p-6 rounded-xl">
          <p className="text-xs text-gray-400 uppercase">{c.title}</p>
          <h2 className={`text-3xl font-bold ${c.color}`}>
            {c.value}
          </h2>
        </div>
      ))}
    </div>
  );
}