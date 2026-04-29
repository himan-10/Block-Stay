import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const TopBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-slate-800/50 rounded-full px-4 py-2 w-96 border border-white/5 focus-within:border-cyan-500/50 transition-colors">
        <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
        <input 
          type="text" 
          placeholder="Search bookings, rooms, or messages..." 
          className="bg-transparent border-none outline-none text-xs text-white ml-3 w-full placeholder:text-slate-500"
        />
      </div>
      
      <div className="flex md:hidden items-center">
        {/* Mobile menu toggle or brand can go here if needed */}
      </div>

      {/* Actions: Notifications & Profile */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-slate-900"></span>
        </button>

        {/* Profile Dropdown / Shortcut */}
        <Link to="/user/profile" className="flex items-center gap-3 group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{user?.name || 'Guest User'}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{user?.role || 'Member'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 p-0.5">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
              {user?.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-slate-300 text-lg">person</span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default TopBar;
