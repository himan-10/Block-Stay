const TopBar = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-xl flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold text-white">
          Midnight Concierge
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
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5LUGg1y3KukGKrkQjuox1Nmf3C-5yw7mGW-DjikylHG7hABcqZUmkkj_57D64vGBb3QR82OBXWOX1856xM4ESkMarZveEVmF0nk-eRdxmOwZ9TxqDt3qeRll5p7V0I2OY9jv67PyA5pkiMrP6zAfKrrpiGsM0OJzpQ3Ts6xIHtdvjeRcJ6EA_iy_UBLLasc0VFatzmmp3lvGR031Un3qh5tjh6euIEyDyaVEEAuGICtyR5venhNYeE-mrNS9buroklSo0ytG6ihJf"
          className="w-10 h-10 rounded-full"
          alt=""
        />
      </div>
    </header>
  );
};

export default TopBar;