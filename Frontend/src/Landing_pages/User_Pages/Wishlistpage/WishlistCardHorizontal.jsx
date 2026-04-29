import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function WishlistCardHorizontal({ room }) {
  const { wishlist, toggleWishlist } = useContext(AuthContext);
  const isWishlisted = wishlist.includes(room?._id);

  if (!room) return null;

  return (
    <div className="md:col-span-6 flex flex-col sm:flex-row bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 group">
      <Link to={`/rooms/${room._id}`} className="sm:w-2/5 relative h-48 sm:h-auto overflow-hidden block">
        <img src={room.images?.[0] || "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={room.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326]/80 sm:bg-gradient-to-r sm:from-transparent sm:to-[#0b1326]/80"></div>
        <button 
          onClick={(e) => { e.preventDefault(); toggleWishlist(room._id); }}
          className={`absolute top-4 left-4 backdrop-blur-md p-2 rounded-full transition-colors border shadow-lg ${isWishlisted ? 'bg-red-500/20 border-red-500/50 hover:bg-red-500/30' : 'bg-white/20 border-white/30 hover:bg-white/30'}`}
        >
          <svg className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-current' : 'text-white'}`} fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </button>
      </Link>

      <div className="p-6 flex flex-col justify-between sm:w-3/5">
        <Link to={`/rooms/${room._id}`} className="block">
          <h3 className="text-2xl text-white font-bold group-hover:text-violet-300 transition-colors truncate">{room.name}</h3>
          <p className="text-slate-400 text-sm mt-2 line-clamp-2">{room.description || "A luxurious space with breathtaking views and premium amenities designed for ultimate comfort."}</p>
        </Link>

        <div className="flex justify-between items-end mt-6 pt-4 border-t border-white/10">
          <div>
            <span className="text-slate-400 text-xs block mb-1">From</span>
            <span className="text-white font-extrabold text-xl">₹{room.pricePerMonth}</span>
          </div>
          <Link to={`/rooms/${room._id}`} className="bg-white/10 hover:bg-violet-600 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-colors border border-white/10 hover:border-violet-500 shadow-md">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}