import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  
  const isActive = (path) => {
    return location.pathname.startsWith(path) ? "text-violet-400 border-b-2 border-violet-500 pb-1" : "text-gray-400 hover:text-white transition-colors duration-300";
  };

  return (
    <nav className="bg-slate-900/40 backdrop-blur-2xl border-b border-white/5 fixed top-0 w-full z-50 flex justify-between items-center px-8 py-5 transition-all duration-500">
      <Link to="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase hover:opacity-80 transition-opacity">
        BlockStay
      </Link>

      <div className="hidden md:flex gap-10 text-sm font-medium tracking-wide">
        <Link to="/rooms" className={isActive('/rooms')}>Rooms</Link>
        <Link to="/about" className={isActive('/about')}>About</Link>
        <Link to="/contact" className={isActive('/contact')}>Contact</Link>
      </div>

      <div className="hidden md:flex gap-5 items-center">
        {user ? (
          <Link to={user.role === 'owner' ? '/owner/dashboard' : '/user/dashboard'} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-colors">
            <img src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&background=6d28d9&color=fff`} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
            <span className="text-sm font-bold text-white">{user.name}</span>
          </Link>
        ) : (
          <>
            <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-violet-300 transition-colors duration-300">
              Login
            </Link>
            <Link to="/signup" className="text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 rounded-full text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all duration-300">
              Sign Up
            </Link>
          </>
        )}
      </div>

      <button className="md:hidden text-gray-400 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
        <span className="material-symbols-outlined text-3xl">{isOpen ? "close" : "menu"}</span>
      </button>

      {/* Mobile Menu Dropdown */}
      <div className={`absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-3xl border-b border-white/5 overflow-hidden transition-all duration-300 md:hidden ${isOpen ? "max-h-[400px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"}`}>
        <div className="flex flex-col items-center gap-6">
          <Link to="/rooms" className={isActive('/rooms')} onClick={() => setIsOpen(false)}>Rooms</Link>
          <Link to="/about" className={isActive('/about')} onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className={isActive('/contact')} onClick={() => setIsOpen(false)}>Contact</Link>
          <div className="flex flex-col gap-4 mt-4 w-full px-8">
            {user ? (
              <Link to={user.role === 'owner' ? '/owner/dashboard' : '/user/dashboard'} className="text-center text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 rounded-full text-white shadow-lg shadow-violet-500/20" onClick={() => setIsOpen(false)}>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-center text-sm font-medium text-gray-400 hover:text-violet-300 transition-colors duration-300" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="text-center text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 rounded-full text-white shadow-lg shadow-violet-500/20" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;