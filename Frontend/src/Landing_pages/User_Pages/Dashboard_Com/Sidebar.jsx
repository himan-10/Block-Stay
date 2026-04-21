import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="h-full w-64 fixed left-0 border-r border-slate-800/30 bg-slate-900 flex flex-col py-8 z-50 hidden md:flex">
      <div className="px-8 mb-12">
        <Link to="/" className="text-lg font-black text-slate-100 hover:text-cyan-400 transition-colors block">
          BlockStay
        </Link>
      </div>

      <nav className="flex-grow space-y-1 px-4">
        {[
            { name: "Dashboard", path: "/user/dashboard", icon: "dashboard" },
            { name: "Bookings", path: "/user/bookings", icon: "event" },
            { name: "Wishlist", path: "/user/wishlist", icon: "favorite" },
            { name: "Profile", path: "/user/profile", icon: "person" }
          ].map((item, i) => (
            <Link key={i} to={item.path} className="flex items-center space-x-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
              <span className="material-symbols-outlined text-sm">{item.icon}</span>
              <span className="text-[10px] uppercase font-medium">{item.name}</span>
            </Link>
          ))}
      </nav>

      <div className="px-8 mt-auto">
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-4 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          <span className="text-[10px] uppercase font-bold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;