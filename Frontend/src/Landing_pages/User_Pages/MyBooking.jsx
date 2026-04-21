import Navbar from "./myBooking/Navbar";
import Sidebar from "./myBooking/Sidebar";
import BookingHeroCard from "./myBooking/BookingHeroCard";
import BookingCard from "./myBooking/BookingCard";

function MyBooking() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <main className="md:pl-64 pt-24 p-6">
        <BookingHeroCard />
        <BookingCard />
      </main>
    </>
  );
}

export default MyBooking;