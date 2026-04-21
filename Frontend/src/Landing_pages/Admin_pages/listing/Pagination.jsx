export default function Pagination() {
  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button className="w-10 h-10 border border-slate-800 text-slate-400 rounded">
        ‹
      </button>

      <button className="w-10 h-10 bg-violet-600 text-white rounded text-xs font-bold">
        1
      </button>
      <button className="w-10 h-10 border border-slate-800 text-slate-400 rounded text-xs">
        2
      </button>
      <button className="w-10 h-10 border border-slate-800 text-slate-400 rounded text-xs">
        3
      </button>

      <span className="text-slate-600">...</span>

      <button className="w-10 h-10 border border-slate-800 text-slate-400 rounded text-xs">
        10
      </button>

      <button className="w-10 h-10 border border-slate-800 text-slate-400 rounded">
        ›
      </button>
    </div>
  );
}