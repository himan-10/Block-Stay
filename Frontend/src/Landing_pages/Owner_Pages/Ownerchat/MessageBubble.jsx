import { motion } from "framer-motion";

const MessageBubble = ({ message, isOwn }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 max-w-2xl ${
        isOwn ? "ml-auto flex-row-reverse" : ""
      }`}
    >
      {/* Avatar */}
      <img
        src="https://i.pravatar.cc/40"
        className="w-8 h-8 rounded-full object-cover mt-1"
      />

      {/* Bubble */}
      <div className={`${isOwn ? "text-right" : ""}`}>
        <div
          className={`p-4 rounded-xl shadow-lg text-sm ${
            isOwn
              ? "bg-violet-600 text-white rounded-tr-none"
              : "bg-slate-800 text-slate-300 rounded-tl-none"
          }`}
        >
          {message}
        </div>

        <span className="text-[10px] text-slate-500 mt-1 block">
          10:45 AM
        </span>
      </div>
    </motion.div>
  );
};

export default MessageBubble;