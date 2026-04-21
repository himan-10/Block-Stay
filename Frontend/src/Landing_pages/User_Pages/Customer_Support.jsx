import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ChatHeader from "./Support/ChatHeader";
import MessageBubble from "./Support/MessageBubble";
import MessageInput from "./Support/MessageInput";
import TypingIndicator from "./Support/TypingIndicator";
import BottomNav from "./BottomNav";

const Customer_Support = () => {
  const messages = [
    { type: "incoming", text: "Reservation confirmed for 1:30 AM." },
    { type: "outgoing", text: "Arrange a private car please." },
    { type: "incoming", text: "Chauffeur will arrive at 1:15 AM." },
  ];

  return (
    <>
      <Navbar />
      <Sidebar />

      <main className="md:ml-64 pt-20 px-4 md:px-8 min-h-screen flex flex-col">
        <div className="max-w-5xl mx-auto w-full flex flex-col flex-1">

          <ChatHeader />

          <div className="flex-1 overflow-y-auto space-y-6">
            {messages.map((msg, i) => (
              <MessageBubble
                key={i}
                type={msg.type}
                message={msg.text}
              />
            ))}

            <TypingIndicator />
          </div>

          <MessageInput onSend={(msg) => console.log(msg)} />
        </div>
      </main>

      <BottomNav />
    </>
  );
};

export default Customer_Support;