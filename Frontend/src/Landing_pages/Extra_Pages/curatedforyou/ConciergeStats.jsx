export default function ConciergeStats() {
  return (
    <div className="mt-20 bg-slate-900 p-10 rounded-2xl grid md:grid-cols-2 gap-10">

      <div>
        <h2 className="text-3xl font-bold">Concierge Intelligence</h2>
        <p className="text-slate-400 mt-4">
          AI-driven personalization engine built from your behavior.
        </p>

        <div className="flex gap-10 mt-6">
          <div>
            <p className="text-2xl text-violet-400">98%</p>
            <p className="text-xs text-slate-500">Match Rate</p>
          </div>

          <div>
            <p className="text-2xl text-cyan-400">Elite</p>
            <p className="text-xs text-slate-500">Tier Status</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl">
        <p className="italic text-slate-300">
          "Would you like similar experiences based on your Tokyo stay?"
        </p>
      </div>

    </div>
  );
}