export default function ActivityTimeline() {
  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Recent Activity</h3>

      <ul className="space-y-3 text-sm">
        <li>Booking Confirmed</li>
        <li>Payout Scheduled</li>
        <li>New Review</li>
      </ul>
    </div>
  );
}