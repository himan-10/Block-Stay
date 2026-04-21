export default function TopNavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/70 backdrop-blur-xl shadow-lg">
      <div className="flex justify-between items-center px-6 h-20 max-w-7xl mx-auto">
        <h1 className="text-xl font-bold">Midnight Concierge</h1>

        <div className="hidden md:flex space-x-6 text-sm">
          <a className="text-violet-400 border-b border-violet-500">Experiences</a>
          <a className="text-slate-400">Sanctuaries</a>
          <a className="text-slate-400">Perks</a>
        </div>

        <div className="flex space-x-3">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="material-symbols-outlined">settings</span>
        </div>
      </div>
    </nav>
  );
}