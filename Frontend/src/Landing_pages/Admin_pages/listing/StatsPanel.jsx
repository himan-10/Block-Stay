export default function StatsPanel() {
  return (
    <div className="bg-violet-600/10 border border-violet-500/20 rounded-xl p-6 text-white">
      <h3 className="text-xs uppercase tracking-widest text-violet-400 mb-6">
        Moderation Health
      </h3>

      <div className="space-y-6">
        <div className="flex justify-between">
          <span className="text-3xl font-bold">12</span>
          <span className="text-xs text-slate-400 uppercase">Pending</span>
        </div>

        <div className="flex justify-between">
          <span className="text-3xl font-bold">842</span>
          <span className="text-xs text-slate-400 uppercase">Active</span>
        </div>

        <div className="flex justify-between">
          <span className="text-3xl font-bold text-rose-500">3</span>
          <span className="text-xs text-slate-400 uppercase">Flags</span>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-6">
        System is operating within normal moderation limits.
      </p>
    </div>
  );
}