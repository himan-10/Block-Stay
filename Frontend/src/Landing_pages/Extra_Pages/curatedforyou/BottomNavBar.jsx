export default function BottomNavBar() {
  return (
    <nav className="md:hidden fixed bottom-0 w-full flex justify-around bg-slate-900 p-3">

      <button>Chat</button>
      <button className="text-violet-400">Explore</button>
      <button>Hotels</button>
      <button>Profile</button>

    </nav>
  );
}