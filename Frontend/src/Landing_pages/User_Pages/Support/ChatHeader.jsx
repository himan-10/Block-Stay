const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between py-6 border-b border-outline-variant/20 mb-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsEmM-CYltCx1se0JQHS5jg4MKgDjYXB5iMRSE83hoacqs6M5AjMn69S6jULIKAnKmUWTSktXEDRGYdDDZp3q_8ksOcxREeXNNiwz92mUiwB0PrvULJoJKSVuV9-sRp6iR6vhKNYtBsEwJua4_JFcas9oq3aBztrJvNV11r-xd9JWxbPTjMTbjVcfhil2VnuGJxop8znjezJiPe8_gNgryTxRVkRY0Zgv9aIZVpxHPS46WNrod_Mo6pvvHQ9y020SabkjZTBNINJWm"
            className="w-12 h-12 rounded-full border-2 border-primary"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-background"></span>
        </div>

        <div>
          <h1 className="text-xl font-bold">Julian, Your Concierge</h1>
          <p className="text-xs text-secondary uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>
            Online
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="p-2 bg-surface-container rounded-full">
          <span className="material-symbols-outlined">call</span>
        </button>
        <button className="p-2 bg-surface-container rounded-full">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;