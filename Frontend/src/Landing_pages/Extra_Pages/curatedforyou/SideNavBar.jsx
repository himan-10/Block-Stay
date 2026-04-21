export default function SideNavBar() {
  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 pt-8">

      <div className="px-6 mb-10">
        <h2 className="text-violet-500 text-2xl font-bold">MC</h2>
        <p className="text-slate-400 text-xs mt-4">Elite Member</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">

        <a className="flex items-center gap-3 px-4 py-3 bg-violet-500/10 text-violet-400 rounded-lg">
          <span className="material-symbols-outlined">smart_toy</span>
          Concierge
        </a>

        <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 rounded-lg">
          <span className="material-symbols-outlined">explore</span>
          Experiences
        </a>

        <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 rounded-lg">
          <span className="material-symbols-outlined">hotel</span>
          Stays
        </a>

      </nav>

    </aside>
  );
}