export default function Header() {
  return (
    <header className="bg-slate-900/70 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <h1 className="text-xl font-bold uppercase">
          The BlockStay
        </h1>

        <span className="material-symbols-outlined text-slate-400 cursor-pointer">
          help_outline
        </span>
      </div>
    </header>
  );
}