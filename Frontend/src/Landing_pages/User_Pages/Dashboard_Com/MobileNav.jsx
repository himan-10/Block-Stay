const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 w-full flex justify-around bg-slate-900 p-4 md:hidden">
      {["Explore", "Bookings", "Saved", "Inbox", "Profile"].map((item, i) => (
        <button key={i} className="text-slate-400">
          {item}
        </button>
      ))}
    </nav>
  );
};

export default MobileNav;