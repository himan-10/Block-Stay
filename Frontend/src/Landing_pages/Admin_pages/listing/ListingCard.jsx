export default function ListingCard({ data, onUpdateStatus }) {
  const imageUrl = data.images && data.images.length > 0 ? data.images[0] : "https://via.placeholder.com/400x300?text=No+Image";
  
  return (
    <div className="bg-surface-container rounded-xl overflow-hidden shadow-lg border border-surface-container-highest group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <img src={imageUrl} alt={data.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <span className={`absolute top-4 left-4 text-[10px] px-3 py-1 rounded-full text-white font-bold uppercase tracking-wider ${
          data.status === "pending"
            ? "bg-amber-500"
            : data.status === "rejected"
            ? "bg-rose-600"
            : "bg-emerald-500"
        }`}>
          {data.status || 'approved'}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-white font-bold text-lg line-clamp-1">{data.name}</h3>
        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{data.location}</p>

        <div className="flex justify-between items-end mt-4">
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Monthly Rent</p>
            <span className="text-violet-400 font-bold text-xl">₹{data.pricePerMonth?.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Type</p>
            <span className="text-slate-300 text-sm">{data.type}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          {(!data.status || data.status === "pending") ? (
            <>
              <button 
                onClick={() => onUpdateStatus(data._id, 'approved')}
                className="flex-1 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
              >
                Approve
              </button>
              <button 
                onClick={() => onUpdateStatus(data._id, 'rejected')}
                className="flex-1 bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
              >
                Reject
              </button>
            </>
          ) : data.status === 'rejected' ? (
            <button 
              onClick={() => onUpdateStatus(data._id, 'approved')}
              className="w-full bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
            >
              Re-Evaluate (Approve)
            </button>
          ) : (
            <button 
              onClick={() => onUpdateStatus(data._id, 'rejected')}
              className="w-full bg-slate-800 hover:bg-rose-500 text-slate-300 hover:text-white py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
            >
              Revoke Approval
            </button>
          )}
        </div>
      </div>
    </div>
  );
}