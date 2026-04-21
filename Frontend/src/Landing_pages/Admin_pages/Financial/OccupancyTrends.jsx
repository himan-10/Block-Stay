export default function OccupancyTrends() {
  return (
    <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
      <h3 className="text-lg font-bold mb-6">Occupancy Trends</h3>

      <div className="relative">
        <svg className="w-40 h-40 -rotate-90">
          <circle cx="80" cy="80" r="60" stroke="#1e293b" strokeWidth="12" fill="none" />
          <circle cx="80" cy="80" r="60" stroke="#22d3ee" strokeWidth="12"
            strokeDasharray="377" strokeDashoffset="75"
            fill="none" strokeLinecap="round" />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">80%</span>
          <span className="text-xs text-slate-500 uppercase">Global Avg</span>
        </div>
      </div>

      <div className="mt-6 w-full text-xs space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-400">Peak Demand</span>
          <span className="text-cyan-400 font-bold">92%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Low Season</span>
          <span className="text-slate-300 font-bold">64%</span>
        </div>
      </div>
    </div>
  );
}