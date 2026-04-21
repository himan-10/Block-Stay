export default function RevenueByRegion() {
  const regions = ["Nordic", "Alpine", "Adriatic", "Iberian", "Baltic"];

  return (
    <div className="lg:col-span-2 p-8 bg-slate-900 rounded-2xl border border-slate-800">
      <h3 className="text-lg font-bold mb-6">Revenue by Region</h3>

      <div className="h-64 flex items-end justify-between gap-4">
        {regions.map((r) => (
          <div key={r} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full h-full bg-slate-800 rounded-t-sm flex flex-col justify-end overflow-hidden">
              <div className="bg-violet-500/40 h-3/4" />
              <div className="bg-violet-500 h-2/5" />
            </div>
            <span className="text-[10px] text-slate-500 uppercase">{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}