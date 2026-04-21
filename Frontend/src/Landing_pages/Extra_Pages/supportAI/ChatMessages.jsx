export default function ChatMessages() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8">

      {/* User */}
      <div className="flex justify-end">
        <div className="bg-slate-800 p-4 rounded-2xl max-w-md">
          Looking for Maldives private pool villa.
        </div>
      </div>

      {/* AI */}
      <div className="flex gap-3">
        <div className="bg-gradient-to-br from-violet-600 to-cyan-500 p-5 rounded-2xl max-w-2xl">
          I found 3 premium overwater villas matching your request...
        </div>
      </div>

    </div>
  );
}