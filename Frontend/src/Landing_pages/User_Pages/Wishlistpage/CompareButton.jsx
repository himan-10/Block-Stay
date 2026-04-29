export default function CompareButton({ onClick, count }) {
  return (
    <div className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-50">
      <button onClick={onClick} className="group relative bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-6 py-4 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center gap-3 transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]">
        <div className="absolute inset-0 rounded-full border border-white/20"></div>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        <span className="font-bold tracking-wide">Compare ({count > 3 ? 3 : count})</span>
      </button>
    </div>
  );
}