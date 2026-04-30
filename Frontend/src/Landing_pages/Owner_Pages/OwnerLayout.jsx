import React, { useState, useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Home, 
  CalendarCheck, 
  Wallet, 
  User, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen, logout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/owner/dashboard' },
    { name: 'Properties', icon: Home, path: '/owner/properties' },
    { name: 'Bookings', icon: CalendarCheck, path: '/owner/bookings' },
    { name: 'Earnings', icon: Wallet, path: '/owner/earnings' },
    { name: 'Profile', icon: User, path: '/owner/profile' },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside 
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0a0f1d]/90 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-white font-bold text-xl tracking-wide">Blockstay</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-white/70 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const active = location.pathname.includes(item.path);
            return (
              <button 
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  active 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

const Topbar = ({ setSidebarOpen, user }) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#050814]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-white/70 hover:text-white p-2 bg-white/5 rounded-lg"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-white hidden sm:block">Blockstay Owner</h1>
      </div>

      <div className="hidden md:flex items-center gap-6 mr-4">
        <a href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Go to Website</a>
        <a href="/rooms" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Browse Rooms</a>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 shadow-inner">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[2px]">
            <img 
              src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Owner'}`} 
              alt="Owner" 
              className="w-full h-full rounded-full bg-[#1a1f36] object-cover"
            />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-semibold text-white">{user?.name || "Loading..."}</span>
            <span className="text-xs text-cyan-400">Property Owner</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default function OwnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#050814] selection:bg-cyan-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]"></div>
      </div>

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} logout={handleLogout} />
      
      <div className="lg:ml-64 relative z-10 flex flex-col min-h-screen">
        <Topbar setSidebarOpen={setSidebarOpen} user={user} />
        
        {/* Main Route Content */}
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
