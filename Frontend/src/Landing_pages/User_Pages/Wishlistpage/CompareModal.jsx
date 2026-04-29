import { createPortal } from 'react-dom';

export default function CompareModal({ isOpen, onClose, rooms }) {
  if (!isOpen) return null;

  // Let's only compare up to 3 rooms for layout sanity
  const compareRooms = rooms.slice(0, 3);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0f172a]/90 backdrop-blur-xl w-full max-w-6xl max-h-[90vh] rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5 shrink-0">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 flex items-center gap-3">
            <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            Compare Properties
          </h2>
          <button onClick={onClose} className="p-3 rounded-full bg-white/5 hover:bg-white/20 text-slate-300 hover:text-white transition-all hover:rotate-90">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-auto flex-grow no-scrollbar relative p-6">
          {compareRooms.length < 2 ? (
             <div className="flex flex-col items-center justify-center h-64 text-center">
                <svg className="w-16 h-16 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                <h3 className="text-xl font-bold text-white mb-2">Not enough properties</h3>
                <p className="text-slate-400">Please add at least 2 properties to your wishlist to compare them.</p>
             </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="sticky top-0 z-20 bg-[#0f172a]/95 backdrop-blur-md shadow-md">
                <tr>
                  <th className="w-1/4 p-4 border-b border-white/10 text-slate-400 font-bold uppercase tracking-widest text-xs align-bottom">
                    Features
                  </th>
                  {compareRooms.map(room => (
                    <th key={room._id} className="w-1/4 p-4 border-b border-white/10 align-top">
                      <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-4 group shadow-lg shadow-black/50 border border-white/5">
                        <img src={room.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-transparent to-transparent opacity-90"></div>
                        <div className="absolute bottom-3 left-3 right-3 text-white font-extrabold text-lg truncate drop-shadow-md">{room.name}</div>
                        <div className="absolute top-2 right-2 bg-violet-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                          {room.type}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-5 text-slate-400 font-semibold group-hover:text-violet-300 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">payments</span> Price
                  </td>
                  {compareRooms.map(room => (
                    <td key={room._id} className="p-5">
                      <span className="text-white font-black text-2xl tracking-tight">₹{room.pricePerMonth?.toLocaleString()}</span>
                      <span className="text-slate-500 text-xs ml-1">/mo</span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-5 text-slate-400 font-semibold group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">location_on</span> Location
                  </td>
                  {compareRooms.map(room => (
                    <td key={room._id} className="p-5 text-slate-200 font-medium">{room.location}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-5 text-slate-400 font-semibold group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">group</span> Capacity
                  </td>
                  {compareRooms.map(room => (
                    <td key={room._id} className="p-5 text-slate-200">
                      <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                        {room.capacity} {room.capacity === 1 ? 'Person' : 'People'}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-5 text-slate-400 font-semibold group-hover:text-pink-300 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">description</span> Description
                  </td>
                  {compareRooms.map(room => (
                    <td key={room._id} className="p-5 text-slate-400 text-xs leading-relaxed max-w-[200px]">
                      {room.description?.substring(0, 120)}...
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 text-slate-400 font-semibold align-top pt-8 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">star</span> Amenities
                  </td>
                  {compareRooms.map(room => (
                    <td key={room._id} className="p-5 align-top pt-8">
                      <div className="flex flex-wrap gap-2">
                        {room.amenities?.slice(0, 6).map((amenity, idx) => (
                          <span key={idx} className="flex items-center text-[11px] text-slate-300 gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10 shadow-sm whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                            {amenity}
                          </span>
                        ))}
                        {room.amenities?.length > 6 && (
                          <span className="text-[11px] text-violet-400 font-bold mt-1.5 ml-1 flex items-center">
                            +{room.amenities.length - 6} more
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
