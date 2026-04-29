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
      // Price Filter
      if (room.pricePerMonth > priceRange) return false;

      // Room Type Filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(room.type)) {
        return false;
      }

      // Amenities Filter (Room must have ALL selected amenities)
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(amenity => 
          room.amenities && room.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

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
      <main className="pb-20 px-6 lg:px-12 max-w-[1600px] mx-auto min-h-screen">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-4">Explore Available Rooms & PGs</h1>
          <p className="font-body text-on-surface-variant max-w-2xl text-lg leading-relaxed">Find the perfect PG, flat, or shared room tailored for students and working professionals.</p>
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
                    min="5000"
                    max="50000"
                    step="1000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-xs font-medium text-on-surface-variant">
                    <span>₹5,000</span>
                    <span>₹{priceRange === 50000 ? '50,000+' : priceRange.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Room Types */}
              <div className="space-y-4">
                <label className="block font-label text-[10px] tracking-[0.1em] text-on-surface-variant font-bold uppercase">Room Type</label>
                <div className="space-y-3">
                  {['1BHK', '2BHK', '1RK', 'Single Room', 'Shared Room'].map(typeBlock => (
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
                  {['Hot Water', 'WiFi', 'Cooled Water', 'AC', 'Non AC', 'Meals Included', 'Washing Machine', 'Study Desk'].map(amBlock => {
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
          </aside>

          {/* Room Grid */}
          <section className="lg:col-span-9">
            {loading ? (
              <div className="w-full py-20 flex justify-center text-primary">Loading rooms...</div>
            ) : filteredRooms.length === 0 ? (
              <div className="w-full py-20 flex flex-col items-center justify-center text-on-surface-variant border-2 border-dashed border-outline-variant/50 rounded-xl">
                <span className="material-symbols-outlined text-4xl mb-4">search_off</span>
                <p className="font-body text-lg font-medium">No rooms match your filters.</p>
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
    </div>
  );
};

export default All_Rooms;