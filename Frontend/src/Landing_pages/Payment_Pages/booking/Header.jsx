export default function Header() {
  return (
    <header className="bg-slate-900/70 backdrop-blur-xl fixed top-0 w-full z-50">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="text-xl font-bold text-slate-100 uppercase">
          The BlockStay
        </div>
        <span className="material-symbols-outlined text-slate-400">
          help_outline
        </span>
      </div>
    </header>
  );
}