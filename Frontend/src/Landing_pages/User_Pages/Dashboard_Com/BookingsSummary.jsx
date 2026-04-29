import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';

const BookingsSummary = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const { api, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/bookings/my-bookings');
        if (data && data.length > 0) {
          setBooking(data[0]); // get the most recent/upcoming booking
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchBookings();
  }, [api, user]);

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 lg:p-8 hover:bg-white/10 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          Latest Booking
        </h3>
        <Link to="/user/bookings" className="text-violet-400 hover:text-violet-300 text-sm font-semibold transition-colors">View All</Link>
      </div>

      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-xl bg-slate-700 h-24 w-24"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ) : booking ? (
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <img 
            src={booking.room?.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"} 
            alt={booking.room?.name} 
            className="w-full sm:w-32 h-32 object-cover rounded-2xl shadow-lg border border-white/10"
          />
          <div className="flex-1 w-full">
            <h4 className="text-lg font-bold text-white mb-1">{booking.room?.name || "Luxury Stay"}</h4>
            <p className="text-slate-400 text-sm mb-3 flex items-center">
              <svg className="w-4 h-4 mr-1 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path></svg>
              {booking.room?.location || "Vidisha, MP"}
            </p>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                 <p className="text-slate-500 text-xs mb-1">Check In</p>
                 <p className="text-white font-medium text-sm">{new Date(booking.checkIn).toLocaleDateString()}</p>
               </div>
               <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                 <p className="text-slate-500 text-xs mb-1">Check Out</p>
                 <p className="text-white font-medium text-sm">{new Date(booking.checkOut).toLocaleDateString()}</p>
               </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 bg-black/20 rounded-2xl border border-white/5 border-dashed">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
             <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          </div>
          <p className="text-slate-400 mb-4">You have no active bookings.</p>
          <Link to="/rooms" className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-colors font-medium">Explore Properties</Link>
        </div>
      )}
    </div>
  );
};

export default BookingsSummary;
