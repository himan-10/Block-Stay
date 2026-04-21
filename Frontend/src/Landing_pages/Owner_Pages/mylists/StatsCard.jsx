export default function StatsCard({ title, value }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}