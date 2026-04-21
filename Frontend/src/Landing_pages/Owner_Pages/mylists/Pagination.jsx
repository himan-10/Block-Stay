export default function Pagination() {
  return (
    <div className="flex justify-between mt-6">
      <p className="text-sm text-slate-400">Showing 3 of 12</p>

      <div className="flex gap-2">
        <button className="px-3 py-1 bg-slate-800 rounded">1</button>
        <button className="px-3 py-1 bg-slate-800 rounded">2</button>
        <button className="px-3 py-1 bg-slate-800 rounded">3</button>
      </div>
    </div>
  );
}