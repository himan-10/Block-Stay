import { useState } from "react";
import { Send, Smile, Paperclip, Plus } from "lucide-react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-6 border-t border-slate-800 bg-slate-900/50">
      
      <div className="relative bg-slate-800 rounded-2xl p-2 flex items-center gap-2 border border-slate-700">
        
        <button className="p-2 text-slate-400 hover:text-violet-400">
          <Plus size={18} />
        </button>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Draft your message..."
          className="flex-1 bg-transparent text-sm text-white outline-none"
        />

        <button className="p-2 text-slate-400 hover:text-violet-400">
          <Smile size={18} />
        </button>

        <button className="p-2 text-slate-400 hover:text-violet-400">
          <Paperclip size={18} />
        </button>

        <button
          onClick={handleSend}
          className="ml-2 w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center hover:scale-105 transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;