export default function OccupancyTrends({ data }) {
  if (!data) return null;

  const currentOccupancy = data.data[data.data.length - 1] || 0;
  const strokeDashoffset = 377 - (377 * currentOccupancy) / 100;

  return (
    <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
      <h3 className="text-lg font-bold mb-6 text-white self-start w-full">Occupancy Trends</h3>

      <div className="relative">
        <svg className="w-40 h-40 -rotate-90">
          <circle cx="80" cy="80" r="60" stroke="#1e293b" strokeWidth="12" fill="none" />
          <circle cx="80" cy="80" r="60" stroke="#22d3ee" strokeWidth="12"
            strokeDasharray="377" strokeDashoffset={strokeDashoffset}
            fill="none" strokeLinecap="round" className="transition-all duration-1000 ease-out" />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{currentOccupancy}%</span>
          <span className="text-xs text-slate-500 uppercase font-semibold">Global Avg</span>
        </div>
      </div>

      <div className="mt-8 w-full text-xs space-y-3">
        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-slate-400 font-semibold uppercase tracking-wider">Peak Demand</span>
          <span className="text-cyan-400 font-bold text-sm">{Math.max(...data.data)}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 font-semibold uppercase tracking-wider">Low Season</span>
          <span className="text-slate-300 font-bold text-sm">{Math.min(...data.data)}%</span>
        </div>
      </div>
    </div>
  );
}