import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div 
      className="dark bg-[#0b0c10] min-h-screen text-slate-200 flex font-sans selection:bg-purple-500/30 transition-colors relative overflow-hidden"
      style={{ colorScheme: 'dark' }}
    >
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Wrapper */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 relative min-w-0 flex flex-col min-h-screen transition-all duration-300">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        {children}
      </div>
    </div>
  );
}
