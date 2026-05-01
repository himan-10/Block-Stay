export default function RevenueByRegion({ data }) {
  if (!data) return null;

  const { labels, data: values } = data;
  const maxVal = Math.max(...values, 1);

  return (
    <div className="lg:col-span-2 p-8 bg-slate-900 rounded-2xl border border-slate-800">
      <h3 className="text-lg font-bold mb-6 text-white">Revenue by Region</h3>

      <div className="h-64 flex items-end justify-between gap-4">
        {labels.map((r, i) => {
          const heightPercentage = `${(values[i] / maxVal) * 100}%`;
          return (
            <div key={r} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full h-full bg-slate-800 rounded-t-sm flex flex-col justify-end overflow-hidden relative">
                <div 
                  className="bg-gradient-to-t from-violet-600 to-violet-400 w-full transition-all duration-1000 group-hover:brightness-125" 
                  style={{ height: heightPercentage }} 
                />
              </div>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{r}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}