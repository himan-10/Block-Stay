export default function PayoutTable({ payouts }) {
  if (!payouts || payouts.length === 0) {
    return (
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center text-slate-500">
        No payouts available yet.
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Recent Transactions & Payouts</h3>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{payouts.length} total</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-slate-500 bg-slate-950/50">
            <tr>
              <th className="p-4 text-left font-semibold tracking-wider">ID</th>
              <th className="p-4 text-left font-semibold tracking-wider">Hotel</th>
              <th className="p-4 text-left font-semibold tracking-wider">Region</th>
              <th className="p-4 text-left font-semibold tracking-wider">Amount</th>
              <th className="p-4 text-left font-semibold tracking-wider">Fee Retained</th>
              <th className="p-4 text-left font-semibold tracking-wider">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/50">
            {payouts.slice(0, 10).map((t) => (
              <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-mono text-xs text-slate-500">#{t.id.substring(t.id.length - 8).toUpperCase()}</td>
                <td className="p-4 font-medium text-slate-200">{t.name}</td>
                <td className="p-4 text-slate-400">{t.region}</td>
                <td className="p-4 font-bold text-white">₹{t.amount.toLocaleString()}</td>
                <td className="p-4 font-bold text-emerald-400">₹{t.fee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="p-4">
                  <span className={`text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider ${
                    t.status === 'Cleared' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}