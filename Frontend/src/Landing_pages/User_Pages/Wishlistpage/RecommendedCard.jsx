import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function RecommendedCard({ room }) {
  const { wishlist, toggleWishlist } = useContext(AuthContext);
  const isWishlisted = wishlist.includes(room?._id);

  if (!room) return null;

  return (
    <div className="min-w-[280px] sm:min-w-[320px] shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 group snap-center">
      <Link to={`/rooms/${room._id}`} className="block relative h-48 overflow-hidden">
        <img src={room.images?.[0] || "https://images.unsplash.com/photo-1502672260266-1c1de2d9d0cb?auto=format&fit=crop&q=80"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={room.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] to-transparent opacity-80"></div>
        <button 
          onClick={(e) => { e.preventDefault(); toggleWishlist(room._id); }}
          className={`absolute top-4 right-4 backdrop-blur-md p-2 rounded-full transition-colors border shadow-md ${isWishlisted ? 'bg-red-500/20 border-red-500/50 hover:bg-red-500/30' : 'bg-black/30 border-white/20 hover:bg-violet-600'}`}
        >
          <svg className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-current' : 'text-white'}`} fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </button>
      </Link>

      <div className="p-5 relative">
        <Link to={`/rooms/${room._id}`}>
          <h4 className="text-lg text-white font-bold group-hover:text-violet-300 transition-colors truncate">{room.name}</h4>
        </Link>
        
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-violet-400 font-extrabold text-xl">₹{room.pricePerMonth}</span>
            <span className="text-slate-500 text-xs ml-1">/ month</span>
          </div>
          <Link to={`/rooms/${room._id}`} className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-400 hover:bg-violet-600 hover:text-white flex items-center justify-center transition-colors border border-violet-500/30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}