const ThreadItem = ({ active, name, message, time }) => {
  return (
    <div
      className={`p-4 cursor-pointer transition ${
        active
          ? "bg-violet-500/10 border-l-4 border-violet-500"
          : "hover:bg-slate-800/40"
      }`}
    >
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/50"
          className="w-10 h-10 rounded-full"
        />

        <div className="flex-1">
          <div className="flex justify-between">
            <span className="text-sm font-semibold text-white">
              {name}
            </span>
            <span className="text-xs text-slate-500">{time}</span>
          </div>

          <p className="text-xs text-slate-500 truncate">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThreadItem;