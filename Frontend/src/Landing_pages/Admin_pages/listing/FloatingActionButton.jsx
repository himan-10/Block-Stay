export default function FloatingActionButton() {
  return (
    <button className="fixed bottom-10 right-10 w-14 h-14 bg-cyan-500 text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
      <span className="material-symbols-outlined">edit</span>
    </button>
  );
}