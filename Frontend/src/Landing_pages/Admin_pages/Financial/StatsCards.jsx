export default function StatsCards({ stats }) {
  if (!stats) return null;

  const cards = [
    { title: "Total Volume", value: `₹${stats.totalRevenue.toLocaleString()}`, change: "+12.4%", color: "text-green-400" },
    { title: "Occupancy Rate", value: stats.occupancyRate, change: "+3.1%", color: "text-green-400" },
    { title: "Service Fees", value: `₹${stats.serviceFees.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, change: "Stable", color: "text-slate-400" },
    { title: "Active Payouts", value: stats.activePayouts, change: "Pending", color: "text-yellow-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      {cards.map((s) => (
        <div key={s.title} className="p-6 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            {/* Optional icon */}
          </div>
          <p className="text-xs text-slate-500 uppercase font-semibold">{s.title}</p>
          <h3 className="text-2xl font-black mt-2 text-white">{s.value}</h3>
          <p className={`text-xs mt-1 font-medium ${s.color}`}>{s.change}</p>
        </div>
      ))}
    </div>
  );
}