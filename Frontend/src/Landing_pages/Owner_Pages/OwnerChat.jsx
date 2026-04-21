import { useEffect, useState } from "react";
import socket from "../services/socket";

const OwnerChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const roomId = "room1";      // dynamic bana sakta hai
    const userId = "user123";    // auth se aayega

    // ✅ POINT 9 (RECEIVE + JOIN)
    useEffect(() => {
        socket.emit("joinRoom", { roomId, userId });

        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    // ✅ POINT 10 (SEND MESSAGE)
    const handleSend = () => {
        if (!input.trim()) return;

        const msg = {
            sender: userId,
            roomId,
            text: input
        };

        socket.emit("sendMessage", {
            roomId,
            message: msg
        });

        setMessages((prev) => [...prev, msg]);
        setInput("");
    };

    return (
        <div className="p-4">
            <div className="h-[400px] overflow-y-auto border p-2 mb-4">
                {messages.map((msg, i) => (
                    <div key={i}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border p-2 flex-1"
                    placeholder="Type message..."
                />
                <button onClick={handleSend} className="bg-blue-500 text-white px-4">
                    Send
                </button>
            </div>
        </div>
    );
};

export default OwnerChat;