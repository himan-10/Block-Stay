export default function ListingCard({ data }) {
  return (
    <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-lg group hover:-translate-y-2 transition">
      <div className="relative h-64">
        <img src={data.image} className="w-full h-full object-cover group-hover:scale-110 transition" />
        <span className={`absolute top-4 left-4 text-[10px] px-3 py-1 rounded-full text-white ${
          data.status === "pending"
            ? "bg-amber-500"
            : data.status === "flagged"
            ? "bg-rose-600"
            : "bg-cyan-500"
        }`}>
          {data.status}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-white font-bold text-lg">{data.title}</h3>
        <p className="text-xs text-slate-400">{data.location}</p>

        <div className="flex justify-between mt-4">
          <span className="text-violet-400 font-bold">₹{data.price}</span>
          <span className="text-[10px] text-slate-500">per month</span>
        </div>

        <div className="flex gap-3 mt-6">
          {data.status === "pending" ? (
            <>
              <button className="flex-1 bg-emerald-600/20 text-emerald-400 py-2 text-xs rounded">
                Approve
              </button>
              <button className="flex-1 bg-red-600/20 text-red-400 py-2 text-xs rounded">
                Reject
              </button>
            </>
          ) : (
            <>
              <button className="flex-1 bg-slate-800 text-slate-300 py-2 text-xs rounded">
                Review
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}