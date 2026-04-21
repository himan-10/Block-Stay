import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname.startsWith(path) ? "text-violet-400 border-b-2 border-violet-500 pb-1" : "text-gray-400 hover:text-white transition-colors duration-300";
  };

  return (
    <nav className="bg-slate-900/40 backdrop-blur-2xl border-b border-white/5 fixed top-0 w-full z-50 flex justify-between items-center px-8 py-5 transition-all duration-500">
<Link to="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase hover:opacity-80 transition-opacity">
        Midnight Concierge
      </Link>

      <div className="hidden md:flex gap-10 text-sm font-medium tracking-wide">
        <Link to="/rooms" className={isActive('/rooms')}>Rooms</Link>
        <Link to="/about" className={isActive('/about')}>About</Link>
        <Link to="/contact" className={isActive('/contact')}>Contact</Link>
      </div>

      <div className="flex gap-5 items-center">
        <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-violet-300 transition-colors duration-300">
          Login
        </Link>
        <Link to="/signup" className="text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 rounded-full text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all duration-300">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;