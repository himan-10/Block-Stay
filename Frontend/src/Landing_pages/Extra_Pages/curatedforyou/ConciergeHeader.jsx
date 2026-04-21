export default function ConciergeHeader() {
  return (
    <header className="mb-16 space-y-4">

      <span className="text-xs px-3 py-1 bg-violet-500/10 rounded-full text-violet-300">
        Elite Tier Recommendations
      </span>

      <h1 className="text-5xl md:text-7xl font-bold leading-tight">
        Your Midnight <span className="text-violet-400">Selections</span>
      </h1>

      <p className="text-slate-400 max-w-2xl">
        Curated experiences based on your preferences and past stays.
      </p>

    </header>
  );
}