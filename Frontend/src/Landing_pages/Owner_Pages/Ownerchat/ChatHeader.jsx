import { Phone, Video, User } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="px-8 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/70 backdrop-blur">
      
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/100"
          className="w-12 h-12 rounded-full object-cover border-2 border-violet-500/30"
        />

        <div>
          <h3 className="font-bold text-white">Elena Vance</h3>
          <div className="flex items-center gap-2 text-xs text-cyan-400">
            <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
            In Residence • Obsidian Suite
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <button className="p-2 border border-slate-700 rounded-lg hover:text-white text-slate-400">
          <Phone size={18} />
        </button>
        <button className="p-2 border border-slate-700 rounded-lg hover:text-white text-slate-400">
          <Video size={18} />
        </button>
        <button className="px-4 py-2 bg-slate-800 rounded-lg text-xs hover:bg-slate-700 flex items-center gap-2">
          <User size={14} /> View Profile
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;