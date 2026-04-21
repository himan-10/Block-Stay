export default function OrderSummary() {
  return (
    <aside className="glass-panel p-8 rounded-3xl space-y-6 sticky top-32">
      
      <img
        src="YOUR_IMAGE"
        className="rounded-xl mb-4"
      />

      <h3 className="text-2xl font-bold">
        The Obsidian Penthouse
      </h3>

      <div className="border-y py-4 space-y-2">
        <p>Nov 14 — Nov 18</p>
        <p>2 Guests</p>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Nightly</span>
          <span>$3400</span>
        </div>

        <div className="flex justify-between">
          <span>Fees</span>
          <span>$150</span>
        </div>

        <div className="flex justify-between">
          <span>Taxes</span>
          <span>$284</span>
        </div>
      </div>

      <div className="flex justify-between text-xl font-bold">
        <span>Total</span>
        <span>$3834</span>
      </div>

      <button className="w-full bg-purple-600 py-4 rounded-xl">
        Complete Payment →
      </button>
    </aside>
  );
}