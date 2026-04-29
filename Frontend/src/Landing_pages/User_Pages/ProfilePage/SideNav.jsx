import { Link, useLocation } from 'react-router-dom';

const SideNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: "Dashboard", path: "/user/dashboard", icon: "dashboard" },
    { name: "Bookings", path: "/user/bookings", icon: "book_online" },
    { name: "Wishlist", path: "/user/wishlist", icon: "favorite" },
    { name: "Profile", path: "/user/profile", icon: "person" }
  ];

  return (
    <aside className="hidden lg:flex w-64 fixed top-[72px] left-0 bg-slate-900 h-full flex-col p-6 z-40">
      <h3 className="text-white mb-6">Concierge Access</h3>

      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "text-violet-400 bg-slate-800"
                : "text-slate-500 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.name}
          </Link>
        );
      })}
    </aside>
  );
};

export default SideNav;