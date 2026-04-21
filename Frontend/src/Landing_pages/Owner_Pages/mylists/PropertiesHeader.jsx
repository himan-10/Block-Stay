export default function PropertiesHeader() {
  return (
    <div className="flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-bold">Property Portfolio</h2>
        <p className="text-slate-400 text-sm">
          Manage your properties
        </p>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-slate-800 rounded">
          Filter
        </button>
        <button className="px-4 py-2 bg-slate-800 rounded">
          Export
        </button>
      </div>
    </div>
  );
}