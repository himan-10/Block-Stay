import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const MembershipCard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-slate-800 rounded-3xl p-8">
      <h4 className="text-xl text-white font-bold">
        {user?.name || "Premium Member"}
      </h4>
      <p className="text-slate-400 mt-2">
        {user?.email || "128,450 Points"}
      </p>
    </div>
  );
};

export default MembershipCard;