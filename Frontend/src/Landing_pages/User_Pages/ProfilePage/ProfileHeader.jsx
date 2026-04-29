import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const ProfileHeader = () => {
  const { user } = useContext(AuthContext);
  return (
    <section className="mb-12 relative">
      <div className="relative h-64 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50">
        <img
          src="https://images.unsplash.com/photo-1550565118-3a14e8d0386f?auto=format&fit=crop&q=80"
          className="w-full h-full object-cover"
          alt="Cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-transparent to-black/30"></div>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mt-[-80px] px-8 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-violet-500 rounded-full blur-xl opacity-50"></div>
          <img
            src={user?.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80"}
            className="w-40 h-40 rounded-full border-4 border-[#0b1326] object-cover relative z-10 shadow-lg shadow-black/50"
            alt="User Avatar"
          />
          <button className="absolute bottom-2 right-2 z-20 bg-violet-600 hover:bg-violet-500 text-white p-2 rounded-full border-2 border-[#0b1326] transition-colors shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2-2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </button>
        </div>

        <div className="text-center sm:text-left pb-4">
          <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
            {user?.name || "Guest User"}
          </h1>
          <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-semibold">
              <svg className="w-4 h-4 mr-1 text-violet-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd"></path></svg>
              Elite Member
            </span>
            <span className="text-slate-400 text-sm">Joined 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;