import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const HeroSection = () => {
  const [featured, setFeatured] = useState(null);
  const { api } = useContext(AuthContext);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/rooms');
        if (data && data.length > 0) {
          setFeatured(data[0]);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchFeatured();
  }, [api]);
  return (
    <div className="lg:col-span-2 relative h-[400px] rounded-3xl overflow-hidden group shadow-2xl shadow-black/50">
      <img
        src={featured?.images?.[0] || "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80"}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        alt="Featured Property"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>
      <div className="absolute bottom-0 p-8 w-full transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-white bg-white/20 backdrop-blur-md rounded-full border border-white/30 uppercase">Featured Listing</span>
        <h3 className="text-4xl text-white font-extrabold tracking-tight drop-shadow-lg">
          {featured?.name || "Executive Penthouse"}
        </h3>
        {featured?.location && (
          <p className="text-slate-300 mt-2 text-lg drop-shadow-md flex items-center gap-2">
            <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            {featured.location}
          </p>
        )}
        <button className="mt-5 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-600/30 transition-all hover:-translate-y-0.5 opacity-0 group-hover:opacity-100 duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default HeroSection;