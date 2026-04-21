export default function FiltersBar() {
  return (
    <div className="bg-slate-900/60 rounded-xl p-6 mb-10 flex flex-wrap items-center justify-between gap-6">
      <div className="flex flex-wrap gap-8">
        {/* Status */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-slate-500 uppercase tracking-widest">
            Status
          </label>
          <select className="bg-transparent text-slate-200 text-sm outline-none">
            <option>All Listings</option>
            <option>Pending</option>
            <option>Active</option>
            <option>Flagged</option>
          </select>
        </div>

        {/* Region */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-slate-500 uppercase tracking-widest">
            Region
          </label>
          <select className="bg-transparent text-slate-200 text-sm outline-none">
            <option>Global</option>
            <option>Europe</option>
            <option>Asia</option>
          </select>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-slate-500 uppercase tracking-widest">
            Category
          </label>
          <select className="bg-transparent text-slate-200 text-sm outline-none">
            <option>All</option>
            <option>Luxury</option>
            <option>Villas</option>
            <option>Hotels</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="px-5 py-2 border border-slate-700 text-xs uppercase tracking-widest text-slate-400 rounded">
          Clear
        </button>
        <button className="px-5 py-2 bg-violet-600 text-white text-xs uppercase tracking-widest rounded">
          Apply
        </button>
      </div>
    </div>
  );
}