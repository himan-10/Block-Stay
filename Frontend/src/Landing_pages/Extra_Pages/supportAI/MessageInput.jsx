export default function MessageInput() {
  return (
    <div className="p-4 border-t border-slate-800 bg-slate-950">
      <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-2xl">

        <button className="p-2">+</button>

        <input
          className="flex-1 bg-transparent outline-none"
          placeholder="Ask your concierge..."
        />

        <button className="p-2">🎤</button>
        <button className="bg-violet-600 p-2 rounded-xl">➤</button>

      </div>
    </div>
  );
}