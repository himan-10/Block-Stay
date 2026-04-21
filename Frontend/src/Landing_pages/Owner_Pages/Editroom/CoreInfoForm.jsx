export default function CoreInfoForm() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Core Info</h3>

      <div className="grid grid-cols-2 gap-4">
        <input
          className="p-3 bg-slate-800 rounded"
          placeholder="Suite Name"
        />
        <select className="p-3 bg-slate-800 rounded">
          <option>Penthouse</option>
        </select>
      </div>

      <textarea
        className="w-full mt-4 p-3 bg-slate-800 rounded"
        rows={4}
        placeholder="Description"
      />

      <div className="grid grid-cols-3 gap-4 mt-4">
        <input className="p-3 bg-slate-800 rounded" placeholder="Size" />
        <input className="p-3 bg-slate-800 rounded" placeholder="Guests" />
        <input className="p-3 bg-slate-800 rounded" placeholder="Price" />
      </div>
    </div>
  );
}