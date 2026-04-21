export default function StatsCards() {
  const stats = [
    { title: "Total Revenue", value: "$1,428,900", change: "+12.4%", color: "text-green-400" },
    { title: "Occupancy Rate", value: "84.2%", change: "+3.1%", color: "text-green-400" },
    { title: "Service Fees", value: "$194,520", change: "Stable", color: "text-slate-400" },
    { title: "Active Payouts", value: "1,024", change: "-2%", color: "text-red-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      {stats.map((s) => (
        <div key={s.title} className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-xs text-slate-500 uppercase">{s.title}</p>
          <h3 className="text-2xl font-bold mt-2">{s.value}</h3>
          <p className={`text-xs mt-1 ${s.color}`}>{s.change}</p>
        </div>
      ))}
    </div>
  );
}