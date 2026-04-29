import { useState } from 'react';
import SupportChatModal from './SupportChatModal';

const MessagesSummary = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 lg:p-8 hover:bg-white/10 transition-colors duration-300 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-600/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-colors duration-500"></div>

        <div className="flex justify-between items-center mb-6 relative z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            Support Inbox
          </h3>
          <span className="bg-cyan-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">Active</span>
        </div>

        <div className="relative z-10 bg-black/30 rounded-xl p-4 border border-white/5 flex gap-4 items-center cursor-pointer hover:bg-black/40 transition-colors" onClick={() => setIsChatOpen(true)}>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" alt="Support Agent" className="w-12 h-12 rounded-full object-cover border-2 border-slate-800" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <p className="text-white text-sm font-semibold truncate">Elena (Concierge)</p>
              <span className="text-slate-500 text-xs">Online</span>
            </div>
            <p className="text-cyan-300 text-xs truncate">Click here to message support...</p>
          </div>
        </div>
        
        <button onClick={() => setIsChatOpen(true)} className="w-full mt-4 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl transition-colors border border-white/10 relative z-10">
          Open Messages
        </button>
      </div>

      <SupportChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default MessagesSummary;
