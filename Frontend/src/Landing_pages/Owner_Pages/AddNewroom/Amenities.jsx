const items = ["WiFi", "Spa", "Mini Bar", "AC", "TV", "Terrace"];

export default function Amenities() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Amenities</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <label key={i} className="bg-slate-800 p-4 rounded cursor-pointer">
            <input type="checkbox" className="mr-2" />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}