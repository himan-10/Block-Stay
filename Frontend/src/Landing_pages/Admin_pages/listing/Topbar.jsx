export default function Topbar() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-slate-900/70 backdrop-blur-xl flex justify-between items-center px-8 z-40">
      <div className="flex items-center gap-6">
        <input
          placeholder="SEARCH SYSTEM..."
          className="bg-slate-950/50 text-slate-300 text-xs uppercase px-4 py-2 rounded-full w-64"
        />

        <nav className="hidden md:flex gap-6 text-xs uppercase text-slate-400">
          <a>System Status</a>
          <a>Log Viewer</a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined">notifications</span>
        <span className="material-symbols-outlined">dark_mode</span>
        <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
          <span className="text-xs text-slate-400">ADMIN_SYS</span>
          <span className="material-symbols-outlined text-violet-500">
            account_circle
          </span>
        </div>
      </div>
    </header>
  );
}