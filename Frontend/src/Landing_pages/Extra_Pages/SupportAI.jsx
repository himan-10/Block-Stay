import TopNavBar from "./supportAI/TopNavBar";
import SideNavBar from "./supportAI/SideNavBar";
import ChatList from "./supportAI/ChatList";
import ChatMessages from "./supportAI/ChatMessages";
import MessageInput from "./supportAI/MessageInput";
import AIProfilePanel from "./supportAI/AIProfilePanel";
import MobileBottomNav from "./supportAI/MobileBottomNav";

export default function SupportAI() {
  return (
    <div className="bg-[#0b1326] text-slate-100 min-h-screen font-body flex flex-col">

      {/* Top Navigation */}
      <TopNavBar />

      {/* Main Layout */}
      <div className="flex flex-1 pt-20 overflow-hidden">

        {/* Sidebar */}
        <SideNavBar />

        {/* Content Area */}
        <main className="flex flex-1 overflow-hidden">

          {/* LEFT - Chat List */}
          <aside className="hidden md:flex w-80 border-r border-slate-800 bg-slate-900/20 overflow-y-auto">
            <ChatList />
          </aside>

          {/* CENTER - Chat */}
          <section className="flex flex-col flex-1 relative overflow-hidden">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
              <ChatMessages />
            </div>

            {/* Input */}
            <div className="shrink-0">
              <MessageInput />
            </div>

          </section>

          {/* RIGHT - AI Panel */}
          <aside className="hidden lg:flex w-80 border-l border-slate-800 overflow-y-auto">
            <AIProfilePanel />
          </aside>

        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />
    </div>
  );
}