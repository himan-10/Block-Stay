export default function ConciergeCard() {
  return (
    <div className="bg-slate-800 p-6 rounded-xl flex items-center gap-6">
      <img
        src="YOUR_IMAGE"
        className="w-20 h-20 rounded-full object-cover"
      />

      <div>
        <h3 className="text-lg font-bold">
          Your Personal Concierge is ready
        </h3>
        <p className="text-sm text-gray-400">
          Book dining, spa, or chauffeur before arrival.
        </p>
        <button className="text-blue-400 mt-2">Contact →</button>
      </div>
    </div>
  );
}