export default function BottomNav() {
  return (
    <div className="fixed bottom-0 w-full flex justify-around py-4 bg-black">
      
      <div className="text-gray-400 text-center">
        <span className="material-symbols-outlined">bedtime</span>
        <p className="text-xs">Discover</p>
      </div>

      <div className="text-gray-400 text-center">
        <span className="material-symbols-outlined">book</span>
        <p className="text-xs">Bookings</p>
      </div>

      <div className="text-gray-400 text-center">
        <span className="material-symbols-outlined">room_service</span>
        <p className="text-xs">Concierge</p>
      </div>

      <div className="text-purple-400 text-center">
        <span className="material-symbols-outlined">person</span>
        <p className="text-xs">Profile</p>
      </div>

    </div>
  );
}