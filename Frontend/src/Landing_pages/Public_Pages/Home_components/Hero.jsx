import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (guests) params.append('guests', guests);
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <section className="pt-24 min-h-screen flex items-center px-8 md:px-16 relative text-white">
      <img
        src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1600"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        alt="Hero Background"
      />

      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Find Your Perfect Room, <br />
          <span className="text-cyan-400">Anywhere.</span>
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl">Affordable PGs, 1BHKs, and shared spaces for students and working professionals.</p>

        <div className="bg-slate-800/70 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full flex-1 border-b md:border-b-0 md:border-r border-slate-600/50 pb-2 md:pb-0 md:pr-4">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-4 block mb-1">Location</label>
            <select 
              className="bg-transparent outline-none px-4 w-full text-slate-200 cursor-pointer focus:text-cyan-400 transition-colors"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="" className="text-slate-900">Where in Vidisha?</option>
              <option value="Mukherjee Nagar, Vidisha" className="text-slate-900">Mukherjee Nagar</option>
              <option value="Sanchi Road, Vidisha" className="text-slate-900">Sanchi Road</option>
              <option value="Civil Lines, Vidisha" className="text-slate-900">Civil Lines</option>
              <option value="Sherpura, Vidisha" className="text-slate-900">Sherpura</option>
              <option value="Arihant Vihar, Vidisha" className="text-slate-900">Arihant Vihar</option>
              <option value="Old Town, Vidisha" className="text-slate-900">Old Town</option>
              <option value="Station Road, Vidisha" className="text-slate-900">Station Road</option>
              <option value="Kharifatak, Vidisha" className="text-slate-900">Kharifatak</option>
              <option value="Pital Mill Area, Vidisha" className="text-slate-900">Pital Mill Area</option>
              <option value="Durga Nagar, Vidisha" className="text-slate-900">Durga Nagar</option>
            </select>
          </div>

          <div className="w-full flex-1 border-b md:border-b-0 md:border-r border-slate-600/50 pb-2 md:pb-0 md:pr-4">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-4 block mb-1">Check In</label>
            <input 
              type="date"
              className="bg-transparent outline-none px-4 w-full text-slate-200 [color-scheme:dark] cursor-pointer focus:text-cyan-400 transition-colors"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
            />
          </div>

          <div className="w-full flex-1 pb-2 md:pb-0">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-4 block mb-1">Guests</label>
            <select 
              className="bg-transparent outline-none px-4 w-full text-slate-200 cursor-pointer focus:text-cyan-400 transition-colors"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="" className="text-slate-900">Add guests</option>
              <option value="1" className="text-slate-900">1 Guest</option>
              <option value="2" className="text-slate-900">2 Guests</option>
              <option value="3" className="text-slate-900">3 Guests</option>
              <option value="4" className="text-slate-900">4 Guests</option>
              <option value="5" className="text-slate-900">5+ Guests</option>
            </select>
          </div>

          <button 
            onClick={handleSearch}
            className="bg-violet-600 px-8 py-4 rounded-lg hover:bg-violet-500 transition-all duration-300 font-bold w-full md:w-auto shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_rgba(124,58,237,0.7)] hover:-translate-y-0.5"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;