import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bell, Settings, Lock, LogOut } from "lucide-react";

export default function TopAppBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-slate-900/70 backdrop-blur flex items-center justify-between px-8 z-40 border-b border-slate-800/50">

      {/* Search */}
      <div className="flex items-center gap-4">
        <input
          placeholder="Search system logs..."
          className="bg-slate-950 px-4 py-2 rounded-full text-sm w-64 text-slate-300 placeholder-slate-500 border border-white/5 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
        />

        <div className="hidden md:flex gap-6 text-xs uppercase text-slate-400 font-semibold tracking-wider">
          <a href="#" className="hover:text-violet-400 transition-colors">System Status</a>
          <a href="#" className="hover:text-violet-400 transition-colors">Log Viewer</a>
        </div>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.6)]"></span>
        </button>
        <button className="text-slate-400 hover:text-white transition-colors">
          🌙
        </button>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none"
          >
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-white leading-tight">Himanshu Patle</p>
              <p className="text-[10px] text-violet-400 uppercase tracking-widest font-semibold">Super Admin</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-500/20 border border-white/10 ring-2 ring-transparent hover:ring-violet-500/50 transition-all">
              H
            </div>
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-3 w-64 bg-[#0d1529] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 origin-top-right"
              >
                {/* Header Profile Section */}
                <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                  <p className="text-base font-bold text-white">Himanshu Patle</p>
                  <p className="text-xs text-slate-400 mt-1 truncate">himanshu@blockstay.com</p>
                  <div className="mt-2 inline-block px-2.5 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] uppercase font-black tracking-widest rounded-md">
                    Super Admin
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2 px-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
                    <User size={16} className="text-slate-400 group-hover:text-violet-400 transition-colors" />
                    My Profile
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
                    <div className="flex items-center gap-3">
                      <Bell size={16} className="text-slate-400 group-hover:text-violet-400 transition-colors" />
                      Notifications
                    </div>
                    <span className="bg-violet-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
                      3 New
                    </span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
                    <Settings size={16} className="text-slate-400 group-hover:text-violet-400 transition-colors" />
                    Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
                    <Lock size={16} className="text-slate-400 group-hover:text-violet-400 transition-colors" />
                    Change Password
                  </button>
                </div>

                <div className="h-px bg-white/5 my-1 w-full" />

                <div className="py-2 px-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors font-semibold group">
                    <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}