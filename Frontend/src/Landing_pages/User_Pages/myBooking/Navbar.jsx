import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-slate-950/70 backdrop-blur-xl fixed top-0 w-full z-50 shadow-xl">
      <div className="flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-xl font-bold text-slate-100 hover:text-cyan-400 transition-colors">BlockStay</Link>

        <nav className="hidden md:flex gap-8">
          <a className="text-slate-400 hover:text-violet-300">Dashboard</a>
          <a className="text-violet-400 font-semibold">Bookings</a>
          <a className="text-slate-400 hover:text-violet-300">Wishlist</a>
          <a className="text-slate-400 hover:text-violet-300">Chat</a>
        </nav>

        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-slate-400">search</span>
          <span className="material-symbols-outlined text-slate-400">notifications</span>
          <img src="/avatar.jpg" className="w-8 h-8 rounded-full" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;