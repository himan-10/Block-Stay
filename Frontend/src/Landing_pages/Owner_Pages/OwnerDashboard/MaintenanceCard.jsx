export default function MaintenanceCard() {
  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Maintenance</h3>

      <ul className="space-y-3 text-sm">
        <li>HVAC Leak - Urgent</li>
        <li>Light Issue - Medium</li>
        <li>Lock Battery - Routine</li>
      </ul>
    </div>
  );
}