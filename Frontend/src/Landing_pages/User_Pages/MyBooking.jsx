import Navbar from "./myBooking/Navbar";
import Sidebar from "./myBooking/Sidebar";
import BookingHeroCard from "./myBooking/BookingHeroCard";
import BookingCard from "./myBooking/BookingCard";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

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
      <Navbar />
      <Sidebar />

      <main className="md:pl-64 pt-24 p-6 space-y-6">
        {bookings.length > 0 ? (
          <>
            <BookingHeroCard booking={bookings[0]} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.slice(1).map((booking) => (
                <BookingCard key={booking._id} booking={booking} setBookings={setBookings} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-slate-400">No active bookings found.</p>
        )}
      </main>
    </>
  );
}

export default MyBooking;