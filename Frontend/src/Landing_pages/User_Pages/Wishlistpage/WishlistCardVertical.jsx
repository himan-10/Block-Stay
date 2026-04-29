import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function WishlistCardVertical({ room }) {
  const { wishlist, toggleWishlist } = useContext(AuthContext);
  const isWishlisted = wishlist.includes(room?._id);

  if (!room) return null;

  return (
    <div className="md:col-span-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 group flex flex-col h-full lg:min-h-[420px]">
      <Link to={`/rooms/${room._id}`} className="block relative h-[220px] shrink-0 overflow-hidden">
        <img
          src={room.images?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={room.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] to-transparent opacity-80"></div>
        <button 
          onClick={(e) => { e.preventDefault(); toggleWishlist(room._id); }}
          className={`absolute top-4 right-4 backdrop-blur-md p-2 rounded-full transition-colors border shadow-lg ${isWishlisted ? 'bg-red-500/20 border-red-500/50 hover:bg-red-500/30' : 'bg-white/20 border-white/30 hover:bg-white/30'}`}
        >
          <svg className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-current' : 'text-white'}`} fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </button>
      </Link>

      <div className="p-6 relative flex flex-col flex-grow">
        <Link to={`/rooms/${room._id}`} className="block">
          <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors mb-1 truncate">
            {room.name}
          </h3>
          <p className="text-slate-400 text-sm flex items-center gap-2 mb-6">
            <span>{room.type}</span> <span className="w-1 h-1 bg-slate-500 rounded-full"></span> <span className="truncate">{room.amenities?.[0] || 'Premium'}</span>
          </p>
        </Link>

        <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-auto">
          <div>
            <span className="text-slate-400 text-xs block mb-1">Price per month</span>
            <span className="text-white font-extrabold text-xl">₹{room.pricePerMonth}</span>
          </div>
          <Link to={`/rooms/${room._id}`} className="bg-white/10 hover:bg-violet-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors border border-white/10 hover:border-violet-500 shadow-md">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}