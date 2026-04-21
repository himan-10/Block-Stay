export default function StatsBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

      <div className="bg-slate-900 p-6 rounded-xl">
        <p className="text-xs text-violet-400">Growth</p>
        <h2 className="text-2xl font-bold">+12.5%</h2>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl">
        <p className="text-xs text-cyan-400">Active Users</p>
        <h2 className="text-2xl font-bold">412</h2>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl">
        <p className="text-xs text-red-400">Flagged</p>
        <h2 className="text-2xl font-bold">18</h2>
      </div>

    </div>
  );
}