export default function Topbar() {
  return (
    <div className="flex justify-between items-center px-10 py-4 bg-slate-900 sticky top-0">
      
      <h2 className="text-xl font-bold">BlockStay</h2>

      <input
        placeholder="Search..."
        className="bg-slate-800 px-4 py-1 rounded-full text-sm"
      />

    </div>
  );
}