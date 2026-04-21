export default function OrderSummary({ room, dates, price }) {
  return (
    <aside className="glass-panel p-8 rounded-3xl space-y-6 sticky top-32 border border-slate-800">
      
      <img
        src={room?.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"}
        className="rounded-xl mb-4 w-full h-48 object-cover"
      />

      <h3 className="text-2xl font-bold">
        {room?.name || "The Obsidian Penthouse"}
      </h3>

      <div className="border-y py-4 space-y-2 border-slate-700 text-slate-300">
        <p>{dates?.checkIn ? new Date(dates.checkIn).toLocaleDateString() : 'Nov 14'} — {dates?.checkOut ? new Date(dates.checkOut).toLocaleDateString() : 'Nov 18'}</p>
        <p>{room?.capacity || 2} Guests</p>
      </div>

      <div className="space-y-2 text-sm text-slate-400">
        <div className="flex justify-between">
          <span>Monthly</span>
          <span>₹{price?.monthly || 25000}</span>
        </div>

        <div className="flex justify-between">
          <span>Fees</span>
          <span>₹{price?.fees || 1500}</span>
        </div>

        <div className="flex justify-between">
          <span>Taxes</span>
          <span>₹{price?.taxes || 3000}</span>
        </div>
      </div>

      <div className="flex justify-between text-xl font-bold border-t border-slate-700 pt-4">
        <span>Total</span>
        <span>₹{price?.total || 29500}</span>
      </div>

    </aside>
  );
}