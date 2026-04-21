export default function TravelerInfo() {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden">
      <div className="p-6">
        <h4 className="text-xs text-gray-400 mb-4">
          Traveler Information
        </h4>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Guest</span>
            <span>Julian</span>
          </div>

          <div className="flex justify-between">
            <span>Total</span>
            <span className="text-xl font-bold">₹1,24,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}