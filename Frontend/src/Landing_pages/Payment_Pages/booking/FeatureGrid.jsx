export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-slate-800 p-4 rounded-xl">
        <p className="font-bold">Dining</p>
        <p className="text-xs text-gray-400">24/7 Available</p>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl">
        <p className="font-bold">Spa</p>
        <p className="text-xs text-gray-400">Open</p>
      </div>
    </div>
  );
}