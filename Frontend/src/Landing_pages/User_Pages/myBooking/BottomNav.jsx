import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: "Explore", path: "/user/dashboard", icon: "explore" },
    { name: "Bookings", path: "/user/bookings", icon: "book_online" },
    { name: "Saved", path: "/user/wishlist", icon: "favorite" },
    { name: "Profile", path: "/user/profile", icon: "person" }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full flex justify-around bg-slate-900 py-3 border-t border-slate-800 z-50">
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <Link key={item.name} to={item.path} className={`flex flex-col items-center gap-1 ${isActive ? 'text-violet-400' : 'text-slate-400 hover:text-slate-200'}`}>
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;