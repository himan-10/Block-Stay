const BookingHeroCard = ({ booking }) => {
  return (
    <div className="lg:col-span-8 bg-surface-container rounded-xl overflow-hidden shadow-xl">
      <div className="grid md:grid-cols-2">
        <img src={booking?.room?.images?.[0] || "/hotel.jpg"} className="h-full min-h-[16rem] w-full object-cover" />

        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl text-white font-bold">
              {booking?.room?.name || "The Obsidian Cliff Retreat"}
            </h3>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${booking?.status === 'cancelled' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
              {booking?.status}
            </span>
          </div>

          <p className="text-slate-400 mb-2">{booking?.room?.location}</p>
          <p className="text-slate-300">In: {new Date(booking?.checkIn).toLocaleDateString()}</p>
          <p className="text-slate-300">Out: {new Date(booking?.checkOut).toLocaleDateString()}</p>
          
          <p className="text-violet-400 font-bold text-lg mt-4">₹{booking?.totalPrice}</p>

          <button className="mt-6 bg-violet-600 px-6 py-2 rounded">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingHeroCard;