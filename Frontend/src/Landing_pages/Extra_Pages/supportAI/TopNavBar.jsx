import { Link } from 'react-router-dom';

export default function TopNavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/70 backdrop-blur-xl h-20 flex items-center justify-between px-6">
      <Link to="/" className="font-bold text-xl hover:text-cyan-400 transition-colors">BlockStay</Link>

      <div className="hidden md:flex gap-8 text-slate-400">
        <a className="text-violet-400 border-b-2 border-violet-500">Chat</a>
        <a>Explore</a>
        <a>Hotels</a>
        <a>Bookmarks</a>
      </div>

      <div className="flex gap-3 text-violet-400">
        <span className="material-symbols-outlined">account_circle</span>
        <span className="material-symbols-outlined">settings</span>
      </div>
    </nav>
  );
}