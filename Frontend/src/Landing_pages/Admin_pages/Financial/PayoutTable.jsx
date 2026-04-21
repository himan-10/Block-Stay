export default function PayoutTable() {
  const data = [
    { id: "#TXN-90210", name: "The Obsidian Suite", region: "Zurich", amount: "$12,450", fee: "$498", status: "Cleared" },
    { id: "#TXN-88432", name: "Velvet Manor", region: "Milan", amount: "$8,900", fee: "$356", status: "Pending" },
    { id: "#TXN-87611", name: "Glass & Steel", region: "Oslo", amount: "$24,120", fee: "$964", status: "Cleared" },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
      
      <div className="p-6 border-b border-slate-800">
        <h3 className="text-lg font-bold">Recent Payouts</h3>
      </div>

      <table className="w-full text-sm">
        <thead className="text-xs uppercase text-slate-500 bg-slate-950">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Hotel</th>
            <th className="p-4 text-left">Region</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Fee</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((t) => (
            <tr key={t.id} className="border-t border-slate-800 hover:bg-slate-800/40">
              <td className="p-4 font-mono text-slate-400">{t.id}</td>
              <td className="p-4">{t.name}</td>
              <td className="p-4 text-slate-400">{t.region}</td>
              <td className="p-4 font-semibold">{t.amount}</td>
              <td className="p-4 text-cyan-400">{t.fee}</td>
              <td className="p-4">
                <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-400">
                  {t.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}