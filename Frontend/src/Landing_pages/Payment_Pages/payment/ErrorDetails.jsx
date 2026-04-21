export default function ErrorDetails() {
  return (
    <div className="mb-8">
      <h4 className="text-xs text-gray-400 uppercase mb-3">
        Reason
      </h4>

      <div className="bg-slate-800 p-5 rounded-lg flex gap-4">
        <span className="material-symbols-outlined text-red-400">
          credit_card_off
        </span>

        <div>
          <p className="font-semibold">Insufficient funds</p>
          <p className="text-sm text-gray-400">
            Your balance is lower than the required amount.
          </p>
        </div>
      </div>
    </div>
  );
}