import ProfileHeader from "./ProfilePage/ProfileHeader";
import MembershipCard from "./ProfilePage/MembershipCard";
import StatsCard from "./ProfilePage/StatsCard";
import Preferences from "./ProfilePage/Preferences";
import Settings from "./ProfilePage/Settings";

const Profile = () => {

  return (
    <>
      <ProfileHeader />

      <div className="grid md:grid-cols-3 gap-6">
        <MembershipCard />
        <StatsCard />
        <Preferences />
        <Settings />
      </div>
    </>
  );
};

export default Profile;