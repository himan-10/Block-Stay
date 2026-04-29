import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';

const WishlistSummary = () => {
  const { wishlist, api } = useContext(AuthContext);
  const [wishlistRooms, setWishlistRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await api.get('/rooms', { params: { limit: 100 } });
        // Only take the first 3 wishlisted items for the summary
        const items = (data.rooms || []).filter(room => wishlist.includes(room._id)).slice(0, 3);
        setWishlistRooms(items);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (wishlist.length > 0) {
      fetchRooms();
    } else {
      setWishlistRooms([]);
      setLoading(false);
    }
  }, [wishlist, api]);

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 lg:p-8 hover:bg-white/10 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
          Saved to Wishlist
        </h3>
        <Link to="/user/wishlist" className="text-violet-400 hover:text-violet-300 text-sm font-semibold transition-colors">View All ({wishlist.length})</Link>
      </div>

      {loading ? (
        <div className="h-24 flex items-center justify-center"><div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div></div>
      ) : wishlistRooms.length > 0 ? (
        <div className="grid sm:grid-cols-3 gap-4">
          {wishlistRooms.map(room => (
            <Link key={room._id} to={`/rooms/${room._id}`} className="group relative h-32 rounded-2xl overflow-hidden shadow-lg border border-white/10 block">
              <img src={room.images?.[0] || "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80"} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-sm font-bold truncate">{room.name}</p>
                <p className="text-violet-300 text-xs font-semibold">₹{room.pricePerMonth}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-black/20 rounded-2xl border border-white/5 border-dashed">
          <p className="text-slate-400 text-sm mb-3">No properties saved yet.</p>
          <Link to="/rooms" className="text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors">Discover luxury stays</Link>
        </div>
      )}
    </div>
  );
};

export default WishlistSummary;
