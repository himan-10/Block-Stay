export default function ActionButtons() {
  return (
    <div className="space-y-4">

      <button className="w-full bg-purple-600 py-4 rounded-lg font-bold">
        Try Again →
      </button>

      <div className="grid grid-cols-2 gap-4">
        <button className="border py-3 rounded-lg">
          Change Method
        </button>
        <button className="border py-3 rounded-lg">
          Contact Support
        </button>
      </div>

    </div>
  );
}