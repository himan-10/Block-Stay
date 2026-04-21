export default function MetricCard({ title, value }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <p className="text-xs text-slate-400 uppercase">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}