import TopBar from "./ProfilePage/TopBar";
import SideNav from "./ProfilePage/SideNav";
import ProfileHeader from "./ProfilePage/ProfileHeader";
import MembershipCard from "./ProfilePage/MembershipCard";
import StatsCard from "./ProfilePage/StatsCard";
import Preferences from "./ProfilePage/Preferences";
import Settings from "./ProfilePage/Settings";
import BottomNav from "./ProfilePage/BottomNav";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <div className="bg-[#0b1326] text-white">
      <TopBar />
      <SideNav />

      <main className="lg:ml-64 pt-24 px-6 space-y-10">
        <ProfileHeader />

        <div className="grid md:grid-cols-3 gap-6">
          <MembershipCard />
          <StatsCard />
          <Preferences />
          <Settings />
        </div>

        <button onClick={handleLogout} className="text-red-400 mt-10">
          Sign Out
        </button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;