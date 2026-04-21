const BookingHeroCard = () => {
  return (
    <div className="lg:col-span-8 bg-surface-container rounded-xl overflow-hidden shadow-xl">
      <div className="grid md:grid-cols-2">
        <img src="/hotel.jpg" className="h-64 w-full object-cover" />

        <div className="p-8">
          <h3 className="text-2xl text-white font-bold mb-4">
            The Obsidian Cliff Retreat
          </h3>

          <p className="text-slate-400">Oct 12 — Oct 18, 2024</p>
          <p className="text-violet-400 font-bold text-lg mt-4">$4,250</p>

          <button className="mt-6 bg-violet-600 px-6 py-2 rounded">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingHeroCard;