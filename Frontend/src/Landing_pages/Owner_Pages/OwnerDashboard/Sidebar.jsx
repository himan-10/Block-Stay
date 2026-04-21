export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-950 p-4">
      
      <h1 className="text-lg font-bold text-white mb-8">
        Obsidian Suite
      </h1>

      <nav className="space-y-3">
        <a className="block text-violet-400">Dashboard</a>
        <a className="block text-slate-400">Properties</a>
        <a className="block text-slate-400">Reservations</a>
        <a className="block text-slate-400">Messages</a>
        <a className="block text-slate-400">Financials</a>
      </nav>

      <button className="mt-10 w-full bg-violet-600 py-2 rounded">
        Add Property
      </button>
    </aside>
  );
}