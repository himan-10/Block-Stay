export default function AIProfilePanel() {
  return (
    <aside className="hidden lg:flex w-80 flex-col border-l border-slate-800 p-6">

      <div className="text-center">
        <div className="w-20 h-20 rounded-xl bg-slate-800 mx-auto mb-3" />
        <h3 className="font-bold">Nova</h3>
        <p className="text-xs text-slate-500">AI Travel Architect</p>
      </div>

      <div className="mt-6 text-xs text-slate-400 space-y-3">
        <p>• Exotic Charters</p>
        <p>• Luxury Dining</p>
        <p>• VIP Access</p>
      </div>

    </aside>
  );
}