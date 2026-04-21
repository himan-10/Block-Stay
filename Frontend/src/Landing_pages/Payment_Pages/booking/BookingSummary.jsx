export default function BookingSummary() {
  return (
    <div className="glass-panel rounded-xl p-8 border border-outline-variant/30">
      
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Booking Confirmed</h2>
          <p className="text-secondary text-xs">Ref: #MC-8829410-X</p>
        </div>
        <button className="text-primary">Download</button>
      </div>

      <div className="grid grid-cols-2 gap-6 border-y py-6">
        <div>
          <p className="text-xs text-gray-400">Destination</p>
          <p>The Obsidian Retreat</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Suite</p>
          <p>Moon Garden Villa</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Arrival</p>
          <p>Oct 24</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Departure</p>
          <p>Oct 29</p>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button className="bg-purple-600 px-6 py-3 rounded-md">
          View Details
        </button>
        <button className="border px-6 py-3 rounded-md">
          Add to Calendar
        </button>
      </div>
    </div>
  );
}