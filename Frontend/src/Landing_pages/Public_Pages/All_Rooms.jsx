import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import RoomCard from '../../Components/Reusable/RoomCard';

const All_Rooms = () => {
  const urlLocation = useLocation();
  const searchParams = new URLSearchParams(urlLocation.search);
  const searchLocation = searchParams.get('location') || '';
  const searchGuests = searchParams.get('guests') || '';

  const [allRooms, setAllRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [priceRange, setPriceRange] = useState(300000);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://block-stay.onrender.com/api';
        
        const params = {
            page: currentPage,
            limit: 6 // Show 6 rooms per page
        };
        
        if (searchLocation) params.location = searchLocation;
        if (searchGuests) params.guests = searchGuests;

        const { data } = await axios.get(`${apiUrl}/rooms`, { params });
        setAllRooms(data.rooms || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [currentPage, searchLocation, searchGuests]);

  // Filtering Logic
  const filteredRooms = useMemo(() => {
    return allRooms.filter(room => {
      if (room.pricePerMonth > priceRange) return false;

      // Note: We don't have 'type' or 'filterAmenities' in the real DB schema currently, 
      // but if we did, we'd filter here. For now, we only filter by price on the client side.

      return true;
    });
  }, [allRooms, priceRange, selectedTypes, selectedAmenities]);

  const handleTypeToggle = (typeStr) => {
    setSelectedTypes(prev => 
      prev.includes(typeStr) 
        ? prev.filter(t => t !== typeStr) 
        : [...prev, typeStr]
    );
  };

  const handleAmenityToggle = (amenityStr) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityStr) 
        ? prev.filter(a => a !== amenityStr) 
        : [...prev, amenityStr]
    );
  };

  const clearAllFilters = () => {
    setPriceRange(300000);
    setSelectedTypes([]);
    setSelectedAmenities([]);
  };

  return (
    <div className="bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container font-body">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Inter:wght@400;500;600&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0');

          .material-symbols-outlined {
              font-family: 'Material Symbols Outlined';
              font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
          .glass-nav {
              background: rgba(15, 23, 42, 0.7);
              backdrop-filter: blur(12px);
          }
          .no-scrollbar::-webkit-scrollbar {
              display: none;
          }
        `}
      </style>

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-violet-900/10 flex justify-between items-center px-8 py-4 max-w-full font-['Manrope'] tracking-tight">
        <Link to="/" className="text-xl font-bold tracking-tighter text-slate-100 uppercase hover:text-cyan-400 transition-colors">Blockstay</Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/rooms" className="text-violet-400 border-b-2 border-violet-500 pb-1">Rooms</Link>
          <Link to="/about" className="text-slate-400 hover:text-slate-100 transition-colors">About</Link>
          <Link to="/contact" className="text-slate-400 hover:text-slate-100 transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium">Login</Link>
          <Link to="/signup" className="bg-primary-container text-on-primary-container px-6 py-2 rounded-md font-bold text-sm hover:bg-inverse-primary transition-all duration-300 active:scale-95 shadow-[0px_0px_15px_rgba(124,58,237,0.4)]">Sign Up</Link>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6 lg:px-12 max-w-[1600px] mx-auto min-h-screen">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-4">Explore Available Stays</h1>
          <p className="font-body text-on-surface-variant max-w-2xl text-lg leading-relaxed">Find the perfect room, apartment, or PG tailored to your lifestyle. Verified spaces for the modern traveler.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-10">
            <div className="bg-surface-container-low p-8 rounded-xl space-y-8">
              <div>
                <h3 className="font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">tune</span>
                  FILTERS
                </h3>
                {/* Price Range */}
                <div className="space-y-4">
                  <label className="block font-label text-[10px] tracking-[0.1em] text-on-surface-variant font-bold uppercase">Price Range</label>
                  <input 
                    className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" 
                    type="range"
                    min="10000"
                    max="300000"
                    step="5000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-xs font-medium text-on-surface-variant">
                    <span>₹10,000</span>
                    <span>₹{priceRange === 300000 ? '3,00,000+' : priceRange.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Room Types */}
              <div className="space-y-4">
                <label className="block font-label text-[10px] tracking-[0.1em] text-on-surface-variant font-bold uppercase">Room Type</label>
                <div className="space-y-3">
                  {['1BHK', '2BHK', '1RK', 'Single Room'].map(typeBlock => (
                    <label key={typeBlock} className="flex items-center group cursor-pointer w-fit">
                      <input 
                        type="checkbox"
                        checked={selectedTypes.includes(typeBlock)}
                        onChange={() => handleTypeToggle(typeBlock)}
                        className="rounded border-outline-variant bg-surface-container text-primary-container focus:ring-primary-container h-4 w-4" 
                      />
                      <span className="ml-3 text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{typeBlock}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <label className="block font-label text-[10px] tracking-[0.1em] text-on-surface-variant font-bold uppercase">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {['Hot Water', 'WiFi', 'Cooled Water', 'AC', 'Non AC'].map(amBlock => {
                    const isSelected = selectedAmenities.includes(amBlock);
                    return (
                      <button 
                        key={amBlock}
                        onClick={() => handleAmenityToggle(amBlock)}
                        className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                          isSelected 
                            ? 'border-primary text-primary bg-primary/20 hover:bg-primary/30' 
                            : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                        }`}
                      >
                        {amBlock}
                      </button>
                    )
                  })}
                </div>
              </div>

              <button 
                onClick={clearAllFilters}
                className="w-full py-3 bg-surface-container-highest text-on-surface font-bold text-sm rounded-md border border-outline-variant/30 hover:bg-surface-variant transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Promo Card */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-container to-tertiary-container p-8 shadow-xl">
              <div className="relative z-10">
                <h4 className="font-headline text-xl font-extrabold text-on-primary-container mb-2">Member Exclusive</h4>
                <p className="text-on-primary-container/80 text-sm mb-6">Unlock -20% on all obsidian suites this season.</p>
                <button className="bg-surface-container-lowest text-on-surface px-4 py-2 rounded font-bold text-xs hover:bg-surface transition-colors duration-200">Join Inner Circle</button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
          </aside>

          {/* Room Grid */}
          <section className="lg:col-span-9">
            {loading ? (
              <div className="w-full py-20 flex justify-center text-primary">Loading sanctuaries...</div>
            ) : filteredRooms.length === 0 ? (
              <div className="w-full py-20 flex flex-col items-center justify-center text-on-surface-variant border-2 border-dashed border-outline-variant/50 rounded-xl">
                <span className="material-symbols-outlined text-4xl mb-4">search_off</span>
                <p className="font-body text-lg font-medium">No sanctuaries match your filters.</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-4 text-primary font-bold hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredRooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-4">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button 
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-12 h-12 rounded-full font-bold transition-all ${
                        currentPage === page 
                          ? 'bg-primary-container text-on-primary-container' 
                          : 'border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 w-full border-t border-slate-800/50 grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-16 font-['Inter'] leading-relaxed text-sm">
        <div className="space-y-6">
          <Link to="/" className="text-lg font-black text-slate-200 uppercase tracking-tighter hover:text-cyan-400 transition-colors block">BlockStay</Link>
          <p className="text-slate-500 max-w-xs">Elevating the nocturnal experience through design, service, and silent luxury.</p>
        </div>
        <div>
          <h5 className="text-violet-500 font-bold mb-6 tracking-widest text-[10px] uppercase">Navigation</h5>
          <ul className="space-y-4">
            <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">Privacy Policy</a></li>
            <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">Terms of Service</a></li>
            <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">FAQ</a></li>
            <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">Careers</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-violet-500 font-bold mb-6 tracking-widest text-[10px] uppercase">Experience</h5>
          <ul className="space-y-4">
            <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">Obsidian Lounge</a></li>
            <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">The Spa</a></li>
            <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">Concierge App</a></li>
            <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">Private Events</a></li>
          </ul>
        </div>
        <div className="space-y-6">
          <h5 className="text-violet-500 font-bold mb-6 tracking-widest text-[10px] uppercase">Subscribe</h5>
          <div className="flex">
            <input className="bg-surface-container border-none focus:ring-1 focus:ring-violet-500 rounded-l-md text-on-surface text-sm w-full" placeholder="Email Address" type="email"/>
            <button className="bg-violet-600 px-4 rounded-r-md text-white">
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
          <p className="text-[10px] text-slate-600">© 2024 BlockStay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default All_Rooms;