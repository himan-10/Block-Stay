export default function MetricsGrid({ metrics }) {
  const cards = [
    { title: "Active Users", value: metrics?.totalUsers ?? "Loading...", color: "text-cyan-400" },
    { title: "Total Properties", value: metrics?.totalProperties ?? "Loading...", color: "text-violet-400" },
    { title: "Pending Listings", value: metrics?.pendingListings ?? "Loading...", color: "text-red-400" },
    { title: "Total Revenue", value: metrics ? `₹${metrics.totalRevenue?.toLocaleString()}` : "Loading...", color: "text-green-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map((c) => (
        <div key={c.title} className="bg-surface-container p-6 rounded-2xl border border-surface-container-highest shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="text-xs text-on-surface-variant font-medium tracking-widest uppercase mb-2">{c.title}</p>
          <h2 className={`text-4xl font-black ${c.color} drop-shadow-sm`}>
            {c.value}
          </h2>
        </div>
      ))}
    </div>
  );
}