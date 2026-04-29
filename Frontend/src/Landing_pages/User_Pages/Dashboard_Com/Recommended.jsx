import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Recommended = () => {
  const [recommended, setRecommended] = useState([]);
  const { api } = useContext(AuthContext);

  useEffect(() => {
    const fetchTops = async () => {
      try {
        const { data } = await api.get('/rooms');
        setRecommended(data.slice(0, 2)); // take top 2 rooms
      } catch (e) {
        console.error(e);
      }
    };
    fetchTops();
  }, [api]);

  return (
    <section className="mt-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">
            Recommended For You
          </h3>
          <p className="text-slate-400 mt-2">Curated properties matching your preferences</p>
        </div>
        <button className="hidden sm:flex items-center text-violet-400 hover:text-violet-300 font-medium transition-colors">
          View all <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommended.length > 0 ? recommended.map((room, i) => (
          <div key={i} className="md:col-span-2 group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <div className="relative h-64 overflow-hidden">
              <img
                src={room.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={room.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Type Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-xs font-medium text-white shadow-lg">
                {room.type || "Apartment"}
              </div>
            </div>
            
            <div className="p-6 relative">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-1">{room.name}</h4>
                  <p className="text-slate-400 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {room.location || "Vidisha, MP"}
                  </p>
                </div>
                <div className="text-right shrink-0 bg-violet-600/20 px-3 py-1.5 rounded-xl border border-violet-500/30">
                  <span className="text-violet-300 font-bold text-lg">₹{room.pricePerMonth}</span>
                  <span className="text-slate-400 text-xs block">/ month</span>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 bg-white/5 rounded-3xl border border-white/5 border-dashed">
            <svg className="w-8 h-8 mb-3 animate-spin text-violet-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Loading premium properties...
          </div>
        )}
      </div>
    </section>
  );
};

export default Recommended;