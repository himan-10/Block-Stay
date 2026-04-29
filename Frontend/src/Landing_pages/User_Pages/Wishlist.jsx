import { useContext, useEffect, useState } from "react";
import WishlistHeader from "./Wishlistpage/WishlistHeader";
import WishlistHeroCard from "./Wishlistpage/WishlistHeroCard";
import WishlistCardVertical from "./Wishlistpage/WishlistCardVertical";
import WishlistCardHorizontal from "./Wishlistpage/WishlistCardHorizontal";
import RecommendedCard from "./Wishlistpage/RecommendedCard";
import CompareButton from "./Wishlistpage/CompareButton";   
import CompareModal from "./Wishlistpage/CompareModal";   
import { AuthContext } from "../../context/AuthContext";

export default function Wishlist() {
  const { wishlist, api } = useContext(AuthContext);
  const [wishlistRooms, setWishlistRooms] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/rooms', { params: { limit: 100 } });
        setAllRooms(data.rooms || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [api]);

  useEffect(() => {
    if (allRooms.length > 0) {
      setWishlistRooms(allRooms.filter(room => wishlist.includes(room._id)));
      setRecommended(allRooms.filter(room => !wishlist.includes(room._id)).slice(0, 3));
    }
  }, [wishlist, allRooms]);

  return (
    <>
      <WishlistHeader />

      {loading ? (
        <div className="text-center py-20 flex flex-col items-center justify-center">
            <svg className="w-10 h-10 animate-spin text-violet-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <p className="text-slate-400 text-lg">Loading your wishlist...</p>
        </div>
      ) : wishlistRooms.length > 0 ? (
        <div className="grid md:grid-cols-12 gap-8 mt-10">
          {wishlistRooms[0] && <WishlistHeroCard room={wishlistRooms[0]} />}
          {wishlistRooms[1] && <WishlistCardVertical room={wishlistRooms[1]} />}

          {wishlistRooms.slice(2).map((room) => (
            <WishlistCardHorizontal key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 border-dashed mt-10">
          <svg className="w-16 h-16 text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          <p className="text-slate-300 text-lg font-medium">Your wishlist is empty.</p>
          <p className="text-slate-500 mt-2">Explore properties and click the heart icon to save them here.</p>
        </div>
      )}

      {recommended.length > 0 && (
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-white mb-6">More properties you might like</h3>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
            {recommended.map(room => (
              <RecommendedCard key={room._id} room={room} />
            ))}
          </div>
        </div>
      )}

      {wishlistRooms.length > 1 && (
        <CompareButton count={wishlistRooms.length} onClick={() => setIsCompareModalOpen(true)} />
      )}

      <CompareModal 
        isOpen={isCompareModalOpen} 
        onClose={() => setIsCompareModalOpen(false)} 
        rooms={wishlistRooms} 
      />
    </>
  );
}