import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import ReceiptModal from './ReceiptModal';

const BookingCard = ({ booking, setBookings }) => {
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const { api } = useContext(AuthContext);

  const handleCancel = async () => {
    try {
      await api.put(`/bookings/${booking._id}/cancel`);
      setBookings(prev => prev.map(b => b._id === booking._id ? { ...b, status: 'cancelled' } : b));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors duration-300 group">
      <div className="relative h-48 mb-5 overflow-hidden rounded-xl">
        <img src={booking?.room?.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Room" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border backdrop-blur-md shadow-lg uppercase tracking-wider ${booking?.status === 'cancelled' ? 'bg-red-500/30 border-red-500/50 text-white' : 'bg-emerald-500/30 border-emerald-500/50 text-white'}`}>
            {booking?.status || 'Confirmed'}
          </span>
          <p className="text-white font-extrabold text-lg drop-shadow-md">₹{booking?.totalPrice}</p>
        </div>
      </div>

      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 block">ID: {booking._id.slice(-8)}</p>
        <h4 className="text-lg font-bold text-white mb-1 truncate group-hover:text-violet-300 transition-colors">{booking?.room?.name || "Premium Room"}</h4>
        <p className="text-slate-400 text-sm flex items-center mb-4">
          <svg className="w-3.5 h-3.5 mr-1 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path></svg>
          {booking?.room?.location || "Location not specified"}
        </p>

        <div className="flex gap-3">
          <button 
            onClick={() => setIsReceiptOpen(true)}
            className="flex-1 bg-white/5 hover:bg-white/10 text-white text-sm font-medium py-2 rounded-lg border border-white/10 transition-colors"
          >
            Receipt
          </button>
          {booking?.status !== 'cancelled' && (
            <button onClick={handleCancel} className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-sm font-medium py-2 rounded-lg transition-colors">
              Cancel
            </button>
          )}
        </div>
      </div>

      <ReceiptModal 
        isOpen={isReceiptOpen} 
        onClose={() => setIsReceiptOpen(false)} 
        booking={booking} 
      />
    </div>
  );
};

export default BookingCard;