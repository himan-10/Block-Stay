export default function BasicInfoForm() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">List Your Property on Blockstay</h2>
      <p className="text-slate-400 mb-6 -mt-4 text-sm">Join thousands of trusted hosts. Share your space and start earning today with our secure booking platform.</p>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          placeholder="Property Title"
          className="bg-slate-800 p-3 rounded"
        />

        <select className="bg-slate-800 p-3 rounded">
          <option>Apartment</option>
          <option>Private Room</option>
          <option>PG / Coliving</option>
        </select>

        <textarea
          placeholder="Describe your property..."
          className="md:col-span-2 bg-slate-800 p-3 rounded"
        />

      </div>
    </div>
  );
}