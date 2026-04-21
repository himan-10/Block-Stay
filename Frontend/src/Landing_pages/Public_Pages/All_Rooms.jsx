import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import RoomCard from '../../Components/Reusable/RoomCard';

const All_Rooms = () => {
  const [priceRange, setPriceRange] = useState(2500);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Mock data extended with properties needed for accurate filtering
  const allRooms = [
    {
      id: 1,
      variant: 'default',
      type: 'Obsidian Suite',
      filterAmenities: ['Midnight Spa', 'Smart Control'],
      imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxpimUKPWLU0joccAu1kXTJrbMMWBJ2VObQ6RDyg01KUvMtst89_XBlfku1Ph-JVA3ZlOnoRi942ZXisY6RRDDeIAjiXXlF0jZ3ZMNZtqBZBOmHYu0HGaPQj_qS-FFg5UVjoFVdbMFRqb1G_NZeyC4a43BPubzyy28ayW5Mcxon8KS-w89N9uzn2mKOMsGuueJ7zcVp7eTFWWbJoEbqYL-N0Ak-lRlYdnDIlKLNEdOgSBHuN9Mq4fuEgdDj7kzKq1-QRk6rPrPMKny',
      imageAlt: 'luxurious dark modern hotel bedroom',
      title: 'The Shadow Wing Suite',
      subtitle: 'East Tower · 85 sqm',
      price: 850,
      badge: {
        text: 'POPULAR',
        icon: 'bolt',
        position: 'right-4',
        bgClass: 'bg-surface-container-highest/80 backdrop-blur-md',
        textClass: 'text-secondary'
      },
      amenities: [
        { icon: 'king_bed', text: 'King' },
        { icon: 'bathtub', text: 'Spa Tub' },
        { icon: 'wine_bar', text: 'Mini Bar' }
      ]
    },
    {
      id: 2,
      variant: 'default',
      type: 'Luminous Studio',
      filterAmenities: ['Private Balcony', 'Smart Control'],
      imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-YcLbRJ2zpKv659RQRa5HsW4pMIYDgPB9FABElWStfyrXGUcC9P2xeHWv2XqHLfNEBTrz--1tknWPApKQGsNKuEa-PKHBS8-pWv_Sf1Oc29scq5452MtpHtSr6oSUqsEPuyLTIBTJPzNixa3usbYAYo6RQUf6vyDq9prPnVdgPIDIVEl-U-v-07eCZDUhuoEo_uylWIe8AmsIAMwR_oBzEiPgynY2i34yLQhNYQk5NFqcJkt0agSV5Ll6WhwfwlJZ9Kt6B9odbULv',
      imageAlt: 'minimalist luxury penthouse suite',
      title: 'Cyan Horizon Loft',
      subtitle: 'Level 42 · 110 sqm',
      price: 1200,
      badge: {
        text: 'TOP RATED',
        position: 'left-4',
        bgClass: 'bg-primary-container',
        textClass: 'text-on-primary-container'
      },
      amenities: [
        { icon: 'visibility', text: 'City View' },
        { icon: 'ac_unit', text: 'Climate' },
        { icon: 'restaurant', text: 'Kitchenette' }
      ]
    },
    {
      id: 3,
      variant: 'featured',
      type: 'Eclipse Penthouse',
      filterAmenities: ['Private Balcony', 'Butler Service', 'Midnight Spa', 'Smart Control'],
      imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyfXTkVywAPWP0k8Pl_qLT6RLcw5RcuFnG33cmgFr6yG_OM4LNKzBtBb0pKc8thgpchBWLV58St1Qzv-UBZUzGkzfXrfb_ZpOMiHa8F7CeoHqZkgq0jECLEYMwEtAgyOxT014jDz5EsNtK-WZx-TFfqFuSz4eO06RvJCODJs9G-lk3yBcbVaud3ojPHWRAaEB5OVVjQpFWw4KM4gSWtHahZ9Lcygy2gkHPLksrW3FllQbVIpa1X2LYbaGHNmLEF1iIv1zBF8GEigIe',
      imageAlt: 'expansive master suite',
      featuredLabel: 'The Crown Jewel',
      title: 'Midnight Presidential Penthouse',
      subtitle: 'Experience total sensory immersion. 240 square meters of pure architectural artistry, including a private heated plunge pool overlooking the nocturnal skyline.',
      price: 2450,
      amenities: [
        { icon: 'pool', text: 'Private Pool' },
        { icon: 'concierge', text: 'Butler' }
      ]
    },
    {
      id: 4,
      variant: 'default',
      type: 'Luminous Studio',
      filterAmenities: ['Smart Control'],
      imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-4q7OZznwa_CooOPWhYSXi5KUqpLUrE3Z5NH98patyR6Nz59HsuFjeeHHuyRGoiUh8JXXv_da2mbZ-LTUWs-kvuqI08tM2cUL1HD7pFkuHPFaosReyf1T4N3soCLyz9cmu9NgDC4RLnS_o3ejI_YqKBKdbQd3G01JVhwuQbfOOxxuakQZRck3MBOXnCs6BtPhNfPc9sPRItBnKcobG5woTEtt3ZOcwxlXwe6rZvo6pYZd4y3EALi4ei44SyOdU7Ac0BSds2ScdFyR',
      imageAlt: 'cozy but dark luxury hotel room',
      title: 'Acoustic Studio',
      subtitle: 'North Wing · 65 sqm',
      price: 550,
      amenities: [
        { icon: 'speaker', text: 'Hi-Fi Audio' },
        { icon: 'local_cafe', text: 'Craft Coffee' }
      ]
    },
    {
      id: 5,
      variant: 'default',
      type: 'Obsidian Suite',
      filterAmenities: ['Midnight Spa'],
      imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBndgMXM_QCKEy6RI26F6w83acIPyNSHeUj9z-lUvNKVJB_-Tpee4zw-LyImFsq16HGrA4SpAcYNpMzBpci3it0j1Ou6o6vUxIq3oXPLY_7vLKYJXlzUu3kjUXYjwVytLEFgrbKkoKJRlFmaG72818WZimu0ADuDZUo3jd0mBspVKh5JmixbsWHlO_BYi4u_o4omh_bTrKEL5Q4AX97AqcBp1NrsqYNilrEX_aRnmavqOX3R0If2mpEzkrFZPQLZZyTu9eHLs-UljZO',
      imageAlt: 'modern bathroom with black marble vanity',
      title: 'Obsidian Spa Chamber',
      subtitle: 'East Tower · 78 sqm',
      price: 720,
      amenities: [
        { icon: 'hot_tub', text: 'Steam Room' },
        { icon: 'spa', text: 'Therapy' }
      ]
    }
  ];

  // Filtering Logic
  const filteredRooms = useMemo(() => {
    return allRooms.filter(room => {
      if (room.price > priceRange) return false;

      if (selectedTypes.length > 0 && !selectedTypes.includes(room.type)) return false;

      if (selectedAmenities.length > 0) {
        const hasAllSelected = selectedAmenities.every(a => room.filterAmenities.includes(a));
        if (!hasAllSelected) return false;
      }

      return true;
    });
  }, [priceRange, selectedTypes, selectedAmenities]);

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
    setPriceRange(2500);
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
        <div className="text-xl font-bold tracking-tighter text-slate-100 uppercase">Blockstay</div>
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
                    min="400"
                    max="2500"
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-xs font-medium text-on-surface-variant">
                    <span>$400</span>
                    <span>${priceRange === 2500 ? '2,500+' : priceRange}</span>
                  </div>
                </div>
              </div>

              {/* Room Types */}
              <div className="space-y-4">
                <label className="block font-label text-[10px] tracking-[0.1em] text-on-surface-variant font-bold uppercase">Room Type</label>
                <div className="space-y-3">
                  {['Obsidian Suite', 'Luminous Studio', 'Eclipse Penthouse'].map(typeBlock => (
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
                  {['Midnight Spa', 'Private Balcony', 'Smart Control', 'Butler Service'].map(amBlock => {
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
            {filteredRooms.length === 0 ? (
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
                  <RoomCard key={room.id} {...room} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredRooms.length > 0 && (
              <div className="mt-16 flex justify-center items-center gap-4">
                <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <div className="flex gap-2">
                  <button className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container font-bold">1</button>
                  <button className="w-12 h-12 rounded-full border border-outline-variant text-on-surface-variant font-bold hover:border-primary hover:text-primary transition-all">2</button>
                </div>
                <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all">
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
          <div className="text-lg font-black text-slate-200 uppercase tracking-tighter">BlockStay</div>
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