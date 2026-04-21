export default function Amenities() {
  const items = ["Whiskey Bar", "Sound Bath", "Private Deck", "Chef"];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Amenities</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((item, i) => (
          <label key={i} className="p-3 bg-slate-800 rounded flex gap-2">
            <input type="checkbox" />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}