export default function BasicInfoForm() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Basic Information</h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          placeholder="Room Title"
          className="bg-slate-800 p-3 rounded"
        />

        <select className="bg-slate-800 p-3 rounded">
          <option>Boutique Suite</option>
          <option>Studio</option>
        </select>

        <textarea
          placeholder="Description..."
          className="md:col-span-2 bg-slate-800 p-3 rounded"
        />

      </div>
    </div>
  );
}