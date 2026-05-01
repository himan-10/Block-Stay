import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Search, Bell } from 'lucide-react';

export default function Topbar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="fixed top-0 left-64 right-0 h-20 bg-background border-b border-surface-container flex items-center justify-between px-8 z-10">
      <div className="flex items-center bg-surface-container rounded-full px-4 py-2 w-96 border border-surface-container-highest focus-within:border-primary transition-colors">
        <Search className="text-on-surface-variant mr-2" />
        <input 
          type="text" 
          placeholder="Search bookings, users, or properties..." 
          className="bg-transparent border-none outline-none text-on-surface w-full placeholder-on-surface-variant"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-on-surface-variant hover:text-on-surface transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-on-surface">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-primary">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
        </div>
      </div>
    </div>
  );
}
