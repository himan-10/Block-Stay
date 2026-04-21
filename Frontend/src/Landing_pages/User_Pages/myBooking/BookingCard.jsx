import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const BookingCard = ({ booking, setBookings }) => {
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
    <div className="bg-surface-container rounded-xl p-6">
      <img src={booking?.room?.images?.[0] || "/room.jpg"} className="h-40 w-full object-cover rounded-lg" />

      <div className="flex justify-between items-start mt-4">
        <div>
          <h4 className="text-xl text-white">{booking?.room?.name}</h4>
          <p className="text-slate-400 text-sm">{booking?.room?.location}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${booking?.status === 'cancelled' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
          {booking?.status}
        </span>
      </div>

      <p className="text-white font-bold mt-4">${booking?.totalPrice}</p>

      <div className="flex gap-4 mt-4">
        <button className="flex-1 text-violet-400">Details</button>
        {booking?.status !== 'cancelled' && (
          <button onClick={handleCancel} className="flex-1 text-red-400">Cancel</button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;