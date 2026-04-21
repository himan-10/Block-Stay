import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  
  if (!room) return null;

  const {
    _id,
    name,
    location,
    pricePerMonth,
    images,
    amenities,
    capacity,
    bedding
  } = room;

  const imageSrc = images && images.length > 0 ? images[0] : '';

  return (
    <div className="group relative flex flex-col bg-surface-container rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0px_20px_40px_rgba(0,0,0,0.4),0px_0px_20px_rgba(124,58,237,0.05)]">
      <div className="relative h-72 overflow-hidden">
        <img 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          src={imageSrc} 
          alt={name || "Room Image"} 
        />
      </div>
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-1">{name}</h2>
            <p className="font-body text-on-surface-variant text-sm">{location}</p>
          </div>
          <div className="text-right">
            <span className="block text-2xl font-black text-primary">₹{pricePerMonth}</span>
            <span className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">per month</span>
          </div>
        </div>
        <div className="flex items-center gap-6 pt-4 border-t border-outline-variant/10">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-lg">king_bed</span>
            <span className="text-xs">{bedding}</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-lg">person</span>
            <span className="text-xs">Up to {capacity} Guests</span>
          </div>
        </div>
        <button 
          onClick={() => navigate(`/rooms/${_id}`)}
          className="w-full py-4 bg-transparent border border-outline-variant text-on-surface font-bold rounded-md group-hover:bg-primary-container group-hover:border-primary-container group-hover:text-on-primary-container transition-all cursor-pointer hover:shadow-md"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
