const Header = () => {
  return (
    <header className="fixed top-0 md:left-64 right-0 bg-slate-950/70 backdrop-blur px-8 py-6 flex justify-between">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Welcome back, Julian
        </h2>
        <p className="text-slate-400 text-sm">
          Your next journey begins in 4 days.
        </p>
      </div>
    </header>
  );
};

export default Header;