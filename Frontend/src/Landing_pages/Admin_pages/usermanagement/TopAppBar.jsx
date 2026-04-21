export default function TopAppBar() {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-slate-900/70 backdrop-blur flex items-center justify-between px-8 z-40">

      {/* Search */}
      <div className="flex items-center gap-4">
        <input
          placeholder="Search system logs..."
          className="bg-slate-950 px-4 py-2 rounded-full text-sm w-64"
        />

        <div className="hidden md:flex gap-6 text-xs uppercase text-slate-400">
          <a href="#">System Status</a>
          <a href="#">Log Viewer</a>
        </div>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-4">
        <button>🔔</button>
        <button>🌙</button>
        <div className="w-8 h-8 rounded-full bg-violet-500" />
      </div>
    </header>
  );
}