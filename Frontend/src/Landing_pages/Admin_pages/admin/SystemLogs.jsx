export default function SystemLogs() {
  const logs = [
    { service: "Auth", status: "Success" },
    { service: "Payment", status: "Processing" },
    { service: "API", status: "Blocked" },
  ];

  return (
    <div className="mt-10 bg-slate-950 p-6 rounded-xl">
      <h3 className="font-bold mb-4">System Logs</h3>

      <table className="w-full text-sm">
        <tbody>
          {logs.map((l, i) => (
            <tr key={i} className="border-b border-slate-800">
              <td className="py-2">{l.service}</td>
              <td className="py-2 text-gray-400">{l.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}