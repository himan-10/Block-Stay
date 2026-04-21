const BookingCard = () => {
  return (
    <div className="bg-surface-container rounded-xl p-6">
      <img src="/room.jpg" className="h-40 w-full object-cover rounded-lg" />

      <h4 className="text-xl text-white mt-4">Skyline Penthouse</h4>
      <p className="text-slate-400 text-sm">Tokyo, Japan</p>

      <p className="text-white font-bold mt-4">$2,100</p>

      <div className="flex gap-4 mt-4">
        <button className="flex-1 text-violet-400">Details</button>
        <button className="flex-1 text-red-400">Cancel</button>
      </div>
    </div>
  );
};

export default BookingCard;