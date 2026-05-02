import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Search, Bell, Menu } from 'lucide-react';

export default function Topbar({ onMenuClick }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="fixed top-0 left-0 md:left-64 right-0 h-20 bg-slate-50/80 dark:bg-[#0b0c10]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-4 md:px-8 z-30 transition-colors">
      <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
        <button onClick={onMenuClick} className="md:hidden p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors">
          <Menu size={24} />
        </button>
        <div className="flex-1 md:flex-none flex items-center bg-white dark:bg-[#13151a] rounded-xl md:rounded-full px-4 py-2.5 md:w-96 border border-slate-200 dark:border-white/10 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all shadow-sm">
          <Search className="text-slate-400 mr-2" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-slate-700 dark:text-slate-300 w-full placeholder-slate-400 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button className="relative text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-md animate-pulse">
            3
          </span>
        </button>

        <div className="flex items-center gap-3 pl-4 md:pl-6 border-l border-slate-200 dark:border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-lg shadow-purple-500/30">
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
        </div>
      </div>
    </div>
  );
}
