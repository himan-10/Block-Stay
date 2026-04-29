import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="bg-slate-950/70 backdrop-blur-xl fixed top-0 w-full z-50 shadow-xl">
      <div className="flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-xl font-bold text-slate-100 hover:text-cyan-400 transition-colors">BlockStay</Link>

        <nav className="hidden md:flex gap-8">
          <Link to="/user/dashboard" className={`hover:text-violet-300 transition-colors ${currentPath === '/user/dashboard' ? 'text-violet-400 font-semibold' : 'text-slate-400'}`}>Dashboard</Link>
          <Link to="/user/bookings" className={`hover:text-violet-300 transition-colors ${currentPath === '/user/bookings' ? 'text-violet-400 font-semibold' : 'text-slate-400'}`}>Bookings</Link>
          <Link to="/user/wishlist" className={`hover:text-violet-300 transition-colors ${currentPath === '/user/wishlist' ? 'text-violet-400 font-semibold' : 'text-slate-400'}`}>Wishlist</Link>
          <Link to="/user/profile" className={`hover:text-violet-300 transition-colors ${currentPath === '/user/profile' ? 'text-violet-400 font-semibold' : 'text-slate-400'}`}>Profile</Link>
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