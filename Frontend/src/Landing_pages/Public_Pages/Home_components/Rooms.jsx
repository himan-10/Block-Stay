import { Link } from 'react-router-dom';

const Rooms = ({ rooms = [], loading = false }) => {
  // Fallback placeholder data just in case the backend returns empty or fails
  const displayRooms = rooms.length > 0 ? rooms : [
    { _id: '1', name: "Executive Penthouse", location: "Downtown", pricePerNight: 450, images: ["https://picsum.photos/400/300"] },
    { _id: '2', name: "Premium Studio", location: "Midtown", pricePerNight: 200, images: ["https://picsum.photos/400/300"] },
    { _id: '3', name: "Downtown Apartment", location: "City Center", pricePerNight: 300, images: ["https://picsum.photos/400/300"] }
  ];

  return (
    <section className="py-20 px-8 md:px-16 text-white">
      <h2 className="text-4xl font-bold mb-10">Discover Our Premium Properties</h2>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((skeleton) => (
            <div key={skeleton} className="bg-slate-800 rounded-lg h-72 animate-pulse border border-slate-700"></div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {displayRooms.map((room) => (
            <Link to={`/rooms/${room._id}`} key={room._id} className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-violet-500 transition-colors cursor-pointer group">
              <div className="relative overflow-hidden h-48">
                <img 
                  src={(room.images && room.images.length > 0) ? room.images[0] : "https://picsum.photos/400/300"} 
                  alt={room.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-violet-300">
                  ${room.pricePerNight}<span className="text-xs text-gray-400 font-normal">/night</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-xl truncate">{room.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-400 text-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {room.location || 'Verified Property'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Rooms;