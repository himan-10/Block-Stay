export default function BillingForm() {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-primary">
        Billing Address
      </h2>

      <input
        placeholder="Street Address"
        className="w-full p-4 rounded-xl bg-slate-800"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          placeholder="City"
          className="p-4 rounded-xl bg-slate-800"
        />
        <input
          placeholder="Postal Code"
          className="p-4 rounded-xl bg-slate-800"
        />
      </div>
    </section>
  );
}