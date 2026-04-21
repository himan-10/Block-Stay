import { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="pt-6 pb-4">
      <div className="bg-surface-container-highest rounded-2xl p-2 border">
        <div className="flex items-end gap-2">
          
          <button className="p-3">
            <span className="material-symbols-outlined">attach_file</span>
          </button>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Request something extraordinary..."
            className="flex-1 bg-transparent resize-none outline-none text-sm"
          />

          <button onClick={handleSend} className="bg-primary p-3 rounded-xl">
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;