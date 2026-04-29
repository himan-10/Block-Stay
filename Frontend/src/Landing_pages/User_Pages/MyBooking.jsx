import BookingHeroCard from "./myBooking/BookingHeroCard";
import BookingCard from "./myBooking/BookingCard";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const { api, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const { data } = await api.get('/bookings/my-bookings');
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    if (user) fetchMyBookings();
  }, [user, api]);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">My Bookings</h1>
        <p className="text-slate-400 mt-2">Manage your upcoming stays and past trips</p>
      </div>

      {bookings.length > 0 ? (
        <>
          <BookingHeroCard booking={bookings[0]} />
          
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Past & Other Bookings</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.slice(1).map((booking) => (
                <BookingCard key={booking._id} booking={booking} setBookings={setBookings} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 border-dashed">
          <svg className="w-16 h-16 text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          <p className="text-slate-300 text-lg font-medium">No active bookings found.</p>
          <Link to="/rooms" className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-colors">Explore Properties</Link>
        </div>
      )}
    </>
  );
}

export default MyBooking;