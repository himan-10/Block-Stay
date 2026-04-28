import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const TopBar = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-xl flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold text-white">
          BlockStay
        </span>

        <nav className="hidden md:flex gap-6 text-slate-400">
          <a href="#">Dashboard</a>
          <a href="#">Bookings</a>
          <a href="#">Wishlist</a>
          <a className="text-violet-400 font-semibold" href="#">
            Profile
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined">search</span>
        <span className="material-symbols-outlined">notifications</span>

        <img
          src={user?.photo || "/avatar.jpg"}
          className="w-10 h-10 rounded-full object-cover"
          alt="Profile"
          onError={(e) => { e.target.src = "/avatar.jpg"; }}
        />
      </div>
    </header>
  );
};

export default TopBar;