export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/70 backdrop-blur border-b border-slate-800 px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        Edit Suite: The Velvet Nocturne
      </h1>

      <div className="flex gap-4">
        <button className="px-6 py-2 border border-slate-700 rounded">
          Preview
        </button>
        <button className="px-6 py-2 bg-violet-600 rounded font-bold">
          Save
        </button>
      </div>
    </header>
  );
}