export default function PricingSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pricing</h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="number"
          placeholder="Price per month"
          className="bg-slate-800 p-3 rounded"
        />

        <input
          type="text"
          value="2 Months"
          className="bg-slate-800 p-3 rounded text-center"
        />

      </div>
    </div>
  );
}