const BookingTabs = () => {
  return (
    <div className="flex gap-8 border-b border-slate-700 mb-10">
      <button className="text-violet-400 border-b-2 border-violet-400 pb-2">
        Upcoming
      </button>
      <button className="text-slate-400">Past</button>
      <button className="text-slate-400">Cancelled</button>
    </div>
  );
};

export default BookingTabs;