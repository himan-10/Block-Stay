import Sidebar from "./Dashboard_Com/Sidebar";
import HeroSection from "./Dashboard_Com/HeroSection";
import MembershipCard from "./Dashboard_Com/MembershipCard";
import Recommended from "./Dashboard_Com/Recommended";

const Dashboard = () => {
  return (
    <div className="bg-[#0b1326] text-white">
      <Sidebar />
      
      <main className="md:ml-64 pt-16 px-6 space-y-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            <HeroSection />
            <MembershipCard />
          </div>

          <Recommended />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
