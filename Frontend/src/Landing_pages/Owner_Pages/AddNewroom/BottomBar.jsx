export default function BottomBar() {
  return (
    <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-slate-900 p-4 flex justify-between">
      
      <button className="text-slate-400">
        Save Draft
      </button>

      <div className="flex gap-4">
        <button className="bg-slate-800 px-6 py-2 rounded">
          Discard
        </button>
        <button className="bg-violet-500 px-6 py-2 rounded">
          Publish
        </button>
      </div>

    </div>
  );
}