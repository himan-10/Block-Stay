const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 w-full flex justify-around bg-slate-900 py-3">
      {["Explore", "Bookings", "Saved", "Inbox", "Profile"].map((item) => (
        <div key={item} className="text-slate-400 text-xs">
          {item}
        </div>
      ))}
    </nav>
  );
};

export default BottomNav;