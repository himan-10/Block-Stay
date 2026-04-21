import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-950 p-4 flex flex-col">
      
      <h1 className="text-lg font-bold text-white mb-8">
        Obsidian Suite
      </h1>

      <nav className="space-y-3 flex-grow">
        <a className="block text-violet-400">Dashboard</a>
        <a className="block text-slate-400">Properties</a>
        <a className="block text-slate-400">Reservations</a>
        <a className="block text-slate-400">Messages</a>
        <a className="block text-slate-400">Financials</a>
      </nav>

      <button className="mt-10 w-full bg-violet-600 hover:bg-violet-700 transition-colors py-2 rounded text-white font-bold mb-4">
        Add Property
      </button>

      <button 
        onClick={handleLogout}
        className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/50 transition-colors py-2 rounded font-bold mt-auto"
      >
        Logout
      </button>
    </aside>
  );
}