import TopNavBar from "./curatedforyou/TopNavBar";
import SideNavBar from "./curatedforyou/SideNavBar";
import ConciergeHeader from "./curatedforyou/ConciergeHeader";
import ConciergeGrid from "./curatedforyou/ConciergeGrid";
import ConciergeStats from "./curatedforyou/ConciergeStats";
import BottomNavBar from "./curatedforyou/BottomNavBar";

export default function CuratedForYou() {
  return (
    <div className="bg-[#0b1326] text-slate-100 min-h-screen font-body">

      <TopNavBar />
      <SideNavBar />

      <main className="md:ml-64 pt-24 pb-32 px-6 md:px-12 max-w-7xl mx-auto">

        <ConciergeHeader />

        <ConciergeGrid />

        <ConciergeStats />

      </main>

      <BottomNavBar />
    </div>
  );
}