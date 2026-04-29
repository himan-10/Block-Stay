import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function WishlistHeroCard({ room }) {
  const { wishlist, toggleWishlist } = useContext(AuthContext);
  const isWishlisted = wishlist.includes(room?._id);

  if (!room) return null;

  return (
    <div className="md:col-span-8 group relative overflow-hidden bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 h-[400px] lg:h-auto lg:min-h-[420px] flex">
      <img
        src={room.images?.[0] || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        alt={room.name}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/40 to-transparent"></div>

      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={(e) => { e.preventDefault(); toggleWishlist(room._id); }}
          className={`backdrop-blur-md p-3 rounded-full transition-colors border group/btn shadow-lg ${isWishlisted ? 'bg-red-500/20 border-red-500/50 hover:bg-red-500/30' : 'bg-white/20 border-white/30 hover:bg-white/30'}`}
        >
          <svg className={`w-6 h-6 group-hover/btn:scale-110 transition-transform ${isWishlisted ? 'text-red-500 fill-current' : 'text-white'}`} fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </button>
      </div>

      <div className="absolute bottom-0 p-8 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-white bg-violet-600/80 backdrop-blur-md rounded-full border border-violet-500/50 uppercase shadow-lg">{room.type || 'Property'}</span>
          <h3 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-md mb-2">
            {room.name}
          </h3>
          <p className="text-slate-300 text-lg flex items-center drop-shadow-md">
            <svg className="w-5 h-5 mr-1.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            {room.location || 'Vidisha, MP'}
          </p>
        </div>

        <Link to={`/rooms/${room._id}`} className="w-full md:w-auto text-center bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-8 py-3 rounded-xl text-white font-bold shadow-lg shadow-violet-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap">
          View Details
        </Link>
      </div>
    </div>
  );
}