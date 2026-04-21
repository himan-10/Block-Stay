export default function ApprovalQueue() {
  const items = [
    "Obsidian Retreat",
    "Skyline Sanctuary",
    "Moonlight Cove",
  ];

  return (
    <div className="bg-slate-900 p-6 rounded-xl">
      <h3 className="font-bold mb-4">Approval Queue</h3>

      <div className="space-y-3">
        {items.map((i) => (
          <div
            key={i}
            className="p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700"
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}