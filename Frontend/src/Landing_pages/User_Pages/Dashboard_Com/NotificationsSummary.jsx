const NotificationsSummary = () => {
  const notifications = [
    { id: 1, text: "Your booking for Obsidian Cliff Villa was confirmed.", time: "2h ago", unread: true },
    { id: 2, text: "Price drop on 'Mountain Cabin' in your wishlist!", time: "5h ago", unread: true },
    { id: 3, text: "Welcome to BlockStay! Complete your profile.", time: "1d ago", unread: false }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 lg:p-8 hover:bg-white/10 transition-colors duration-300 relative overflow-hidden group">
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          Alerts
        </h3>
        <button className="text-slate-400 hover:text-white text-xs font-medium transition-colors">Mark all read</button>
      </div>

      <div className="space-y-4 relative z-10">
        {notifications.map(notif => (
          <div key={notif.id} className="flex gap-3 items-start p-3 rounded-xl bg-black/20 hover:bg-white/5 transition-colors cursor-pointer border border-white/5 hover:border-white/10">
            <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${notif.unread ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'bg-slate-600'}`}></div>
            <div>
              <p className={`text-sm ${notif.unread ? 'text-white font-medium' : 'text-slate-400'}`}>{notif.text}</p>
              <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSummary;
