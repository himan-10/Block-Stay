export default function ArrivalCard() {
  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Upcoming Arrivals</h3>

      <div className="flex justify-between">
        <div>
          <p className="font-semibold">Obsidian Loft #402</p>
          <p className="text-sm text-slate-400">Guest: Alexander</p>
        </div>
        <p className="text-sm">Today 14:00</p>
      </div>

    </div>
  );
}