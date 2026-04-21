const BookingHorizontalCard = () => {
  return (
    <div className="flex gap-6 bg-slate-800 p-4 rounded-xl items-center">
      <img src="/chalet.jpg" className="w-32 h-32 rounded-lg object-cover" />

      <div className="flex-1">
        <h4 className="text-white font-bold">Alpine Zenith Chalet</h4>
        <p className="text-slate-400">Zermatt, Switzerland</p>
      </div>

      <button className="text-violet-400">Modify</button>
    </div>
  );
};

export default BookingHorizontalCard;