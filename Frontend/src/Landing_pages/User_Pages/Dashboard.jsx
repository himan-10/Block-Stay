import MembershipCard from "./Dashboard_Com/MembershipCard";
import BookingsSummary from "./Dashboard_Com/BookingsSummary";
import WishlistSummary from "./Dashboard_Com/WishlistSummary";
import NotificationsSummary from "./Dashboard_Com/NotificationsSummary";
import MessagesSummary from "./Dashboard_Com/MessagesSummary";
import DashboardStats from "./Dashboard_Com/DashboardStats";

const Dashboard = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Overview</h1>
        <p className="text-slate-400 mt-2">Welcome back to your personalized dashboard</p>
      </div>

      <DashboardStats />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BookingsSummary />
          <WishlistSummary />
        </div>
        
        <div className="space-y-6">
          <MembershipCard />
          <NotificationsSummary />
          <MessagesSummary />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
