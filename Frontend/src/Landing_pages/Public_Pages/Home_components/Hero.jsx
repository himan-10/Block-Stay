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
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfBiJklBE7AIPJZ3ckRWUway8Mj6XrP1lhB1vqMaqwVXZSpK0U_khaILtN3K68dJWS4Szlk72azTZP61xj6IvDUAuWWyPuaBYHCi0zyabOiq3LQLg3G1wj6RvGEpNZPa5ivh2SVmA63Z98VCu77iKMHKQFMOVsBGMVMKCglt_POL-NFXgp32SMoV3gcwvkdxmZAD_uoAExc9rlc94RDFgia1nS6-Yes5C6R2tD1Qw80F1ju2Mal1THo1Y1m0K-_PdSKzHbdsP6giTe"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        alt=""
      />

      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Find Your Perfect Stay, <br />
          <span className="text-cyan-400">Anywhere.</span>
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl">Curated rooms, premium spaces, and trusted apartments for the modern traveler.</p>

        <div className="bg-slate-800/70 p-4 rounded-xl flex flex-col md:flex-row gap-4">
          <input 
            placeholder="Location" 
            className="bg-transparent outline-none px-4 py-2 w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input 
            placeholder="Dates" 
            className="bg-transparent outline-none px-4 py-2 w-full"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
          />
          <input 
            placeholder="Guests" 
            className="bg-transparent outline-none px-4 py-2 w-full"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
          <button 
            onClick={handleSearch}
            className="bg-violet-600 px-8 py-2 rounded-md hover:bg-violet-500 transition-colors font-bold"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;