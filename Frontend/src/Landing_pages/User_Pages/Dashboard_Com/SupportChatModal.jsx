import { useState, useEffect, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import { AuthContext } from '../../../context/AuthContext';
import { io } from 'socket.io-client';

export default function SupportChatModal({ isOpen, onClose }) {
  const { user, api } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isOpen || !user) return;

    // Create a fresh session every time the modal opens
    const newRoomId = `support_${user._id}_${Date.now()}`;
    setRoomId(newRoomId);
    setMessages([]);
    setBotState({ step: 'INITIAL', data: {} });
    setLoading(true);

    // Initialize Socket
    const apiUrl = import.meta.env.VITE_API_URL;
    const socketUrl = apiUrl.replace('/api', '');
    
    const newSocket = io(socketUrl, {
      withCredentials: true,
    });
    
    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('joinRoom', { roomId: newRoomId, userId: user._id });
    });

    newSocket.on('receiveMessage', (message) => {
      setMessages((prev) => {
        if (prev.some(m => m._id === message._id)) return prev;
        return [...prev, message];
      });
      scrollToBottom();
    });

    // Auto-greet the user when the chat opens fresh
    setTimeout(async () => {
      const greeting = `👋 Welcome to BlockStay!
How can I help you today?

1️⃣ Find a property
2️⃣ My bookings
3️⃣ Support
4️⃣ My account`;

      const botMessageData = {
        sender: "support_agent",
        roomId: newRoomId,
        text: greeting
      };

      try {
        const { data: botData } = await api.post('/chat', botMessageData);
        newSocket.emit('sendMessage', { roomId: newRoomId, message: botData });
        setBotState({ step: 'MAIN_MENU', data: {} });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => {
      newSocket.disconnect();
    };
  }, [isOpen, user, api]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🤖 Elena Chatbot Logic State
  const [botState, setBotState] = useState({ step: 'INITIAL', data: {} });

  const handleSendMessage = async (e, directText = null) => {
    if (e) e.preventDefault();
    
    const textToSend = directText || newMessage;
    if (!textToSend.trim()) return;

    const userText = textToSend;
    const messageData = {
      sender: user._id,
      roomId,
      text: userText
    };

    // Optimistically update UI
    const optimisticMessage = { ...messageData, _id: Date.now().toString(), createdAt: new Date().toISOString() };
    setMessages(prev => [...prev, optimisticMessage]);
    if (!directText) setNewMessage('');

    try {
      const { data } = await api.post('/chat', messageData);
      socket?.emit('sendMessage', { roomId, message: data });
      
      // Update the optimistic ID with the real ID
      setMessages(prev => prev.map(m => m._id === optimisticMessage._id ? data : m));

      // 🤖 Elena Chatbot Logic Implementation
      setTimeout(async () => {
        let botReply = "";
        let nextStep = botState.step;
        let nextData = { ...botState.data };
        const lowerText = userText.toLowerCase().trim();

        // Flow 1: GREETING & MAIN MENU
        if (lowerText.includes("hi") || lowerText.includes("hello") || lowerText.includes("hey") || lowerText === "menu") {
          botReply = `👋 Welcome to BlockStay!
How can I help you today?

1️⃣ Find a property
2️⃣ My bookings
3️⃣ Support
4️⃣ My account`;
          nextStep = 'MAIN_MENU';
        }
        // Handle numbered choices from Main Menu
        else if (botState.step === 'MAIN_MENU' || botState.step === 'INITIAL') {
          if (lowerText === "1" || lowerText.includes("find") || lowerText.includes("search") || lowerText.includes("property")) {
            botReply = "📍 Which city are you looking for?";
            nextStep = 'SEARCH_CITY';
          } else if (lowerText === "2" || lowerText.includes("booking")) {
            try {
              const { data: bookings } = await api.get('/bookings/my-bookings');
              if (bookings && bookings.length > 0) {
                const recentBookings = bookings.slice(0, 3);
                botReply = `📦 Here are your recent bookings. Which one do you need help with?\n\n` + 
                  recentBookings.map((b, i) => `${i + 1}️⃣ ${b.room?.name || 'Stay'} - ${new Date(b.checkIn).toLocaleDateString()}`).join('\n');
                nextData.bookings = recentBookings;
                nextStep = 'SELECT_BOOKING';
              } else {
                botReply = `You don't have any active bookings right now.
                
1️⃣ Find a property
3️⃣ Support menu`;
                nextStep = 'MAIN_MENU';
              }
            } catch (err) {
              botReply = "📦 Please enter your booking ID";
              nextStep = 'BOOKING_ID';
            }
          } else if (lowerText === "3" || lowerText.includes("support") || lowerText.includes("problem") || lowerText.includes("help") || lowerText.includes("issue")) {
            botReply = `🛠️ What issue are you facing?

1️⃣ Payment issue
2️⃣ Booking issue
3️⃣ Refund status
4️⃣ Other`;
            nextStep = 'SUPPORT_MENU';
          } else if (lowerText === "4" || lowerText.includes("account")) {
            botReply = `👤 Account Help:

1️⃣ Update profile
2️⃣ Change password
3️⃣ Logout`;
            nextStep = 'ACCOUNT_MENU';
          } else {
             botReply = `🤖 Sorry, I didn't understand.
Please choose an option:

1️⃣ Find property
2️⃣ My booking
3️⃣ Support`;
          }
        }
        // Flow 2: PROPERTY SEARCH FLOW
        else if (botState.step === 'SEARCH_CITY') {
          nextData.city = userText;
          botReply = "📅 What are your check-in and check-out dates?";
          nextStep = 'SEARCH_DATES';
        } else if (botState.step === 'SEARCH_DATES') {
          nextData.dates = userText;
          botReply = "💰 What is your budget per month?";
          nextStep = 'SEARCH_BUDGET';
        } else if (botState.step === 'SEARCH_BUDGET') {
          botReply = `🔍 Showing best properties in ${nextData.city} based on your preferences... (Please check the 'Rooms' tab on the left to see your filtered results!)`;
          nextStep = 'MAIN_MENU'; // reset
        }
        // Flow 3: BOOKING FLOW (Selection)
        else if (botState.step === 'SELECT_BOOKING') {
          const selectedIdx = parseInt(lowerText) - 1;
          const selectedBooking = nextData.bookings?.[selectedIdx];
          
          if (selectedBooking) {
            botReply = `Here are the details for your booking:
Hotel: ${selectedBooking.room?.name || 'Luxury Stay'}
Location: ${selectedBooking.room?.location || 'Unknown'}
Status: ${selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}

Do you want to:
1️⃣ Cancel
2️⃣ Modify
3️⃣ Contact support`;
            nextStep = 'BOOKING_ACTION';
          } else {
            botReply = `Here are the details for Booking ID: ${userText.toUpperCase()}
Status: Confirmed

Do you want to:
1️⃣ Cancel
2️⃣ Modify
3️⃣ Contact support`;
            nextStep = 'BOOKING_ACTION';
          }
        }
        // Fallback for manual booking ID entry
        else if (botState.step === 'BOOKING_ID') {
          botReply = `Here are the details for Booking ID: ${userText.toUpperCase()}
Hotel: Blockstay Premium
Location: Vidisha, MP
Status: Confirmed

Do you want to:
1️⃣ Cancel
2️⃣ Modify
3️⃣ Contact support`;
          nextStep = 'BOOKING_ACTION';
        } else if (botState.step === 'BOOKING_ACTION') {
          if (lowerText === "1" || lowerText.includes("cancel")) {
             botReply = "Your cancellation request has been initiated. Refunds usually take 5-7 business days.";
          } else if (lowerText === "2" || lowerText.includes("modify")) {
             botReply = "To modify your dates, please visit your 'My Bookings' dashboard page and select 'Edit Booking'.";
          } else {
             botReply = "I am connecting you to a human agent. Please wait...";
          }
          nextStep = 'MAIN_MENU'; // reset
        }
        // Flow 4: SUPPORT FLOW
        else if (botState.step === 'SUPPORT_MENU') {
          if (lowerText === "1" || lowerText.includes("payment")) botReply = "For payment issues, please ensure your card is active. Our payment gateway (Razorpay) handles transactions securely.";
          else if (lowerText === "2" || lowerText.includes("booking")) botReply = "If you have a booking issue, please ensure you check the 'My Bookings' tab to verify the status.";
          else if (lowerText === "3" || lowerText.includes("refund")) botReply = "Refunds are processed to the original payment method within 5-7 business days of cancellation.";
          else botReply = "Please describe your issue, and an agent will review it shortly.";
          nextStep = 'MAIN_MENU'; // reset
        }
        // Flow 5: ACCOUNT FLOW
        else if (botState.step === 'ACCOUNT_MENU') {
          if (lowerText === "1" || lowerText.includes("profile")) botReply = "You can update your profile directly in the 'Profile' section of your dashboard.";
          else if (lowerText === "2" || lowerText.includes("password")) botReply = "To change your password, please go to your profile settings.";
          else if (lowerText === "3" || lowerText.includes("logout")) botReply = "You can log out using the 'Sign Out' button in the bottom left of your sidebar.";
          else botReply = "I can help with other account settings from the dashboard.";
          nextStep = 'MAIN_MENU'; // reset
        }
        // FALLBACK
        else {
          botReply = `🤖 Sorry, I didn't understand.
Please choose an option:

1️⃣ Find property
2️⃣ My booking
3️⃣ Support`;
          nextStep = 'MAIN_MENU';
        }

        // Update bot state
        setBotState({ step: nextStep, data: nextData });

        const botMessageData = {
          sender: "support_agent",
          roomId,
          text: botReply
        };

        try {
          const { data: botData } = await api.post('/chat', botMessageData);
          socket?.emit('sendMessage', { roomId, message: botData });
        } catch (botErr) {
          console.error("Bot failed to reply", botErr);
        }
      }, 1500); // 1.5 seconds delay

    } catch (error) {
      console.error("Error sending message:", error);
      // Remove optimistic message on failure
      setMessages(prev => prev.filter(m => m._id !== optimisticMessage._id));
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0f172a] w-full max-w-lg h-[600px] max-h-[90vh] rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-white/10 bg-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" alt="Support Agent" className="w-10 h-10 rounded-full object-cover border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-slate-900 rounded-full"></div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Elena (Concierge)
              </h2>
              <p className="text-cyan-400 text-xs font-medium">Online</p>
            </div>
          </div>
          
          <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-slate-300 hover:text-white transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar bg-gradient-to-b from-transparent to-cyan-900/10">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <svg className="w-8 h-8 animate-spin text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
              <span className="material-symbols-outlined text-4xl text-cyan-400 mb-2">forum</span>
              <p className="text-white text-sm">Send a message to start the conversation.</p>
            </div>
          ) : (
            messages.map((msg, idx) => {
              const isMe = msg.sender === user._id;
              
              // Parse message for options (e.g., "1️⃣ Option")
              const lines = msg.text.split('\n');
              const mainTextLines = [];
              const optionLines = [];
              
              lines.forEach(line => {
                if (line.match(/^[1-9]️⃣/)) {
                  optionLines.push(line);
                } else {
                  mainTextLines.push(line);
                }
              });

              return (
                <div key={msg._id || idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'} flex-col gap-2`}>
                  <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      isMe 
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-sm shadow-[0_4px_15px_rgba(6,182,212,0.3)]' 
                        : 'bg-white/10 text-slate-200 rounded-bl-sm border border-white/10 shadow-md backdrop-blur-md'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{mainTextLines.join('\n').trim()}</p>
                      <span className={`text-[10px] mt-1.5 block ${isMe ? 'text-cyan-200 text-right' : 'text-slate-400'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  
                  {/* Modern Interactive Options */}
                  {!isMe && optionLines.length > 0 && idx === messages.length - 1 && (
                    <div className="flex flex-col gap-2 mt-1 ml-2 max-w-[85%]">
                      {optionLines.map((opt, i) => {
                        const optNumber = opt.substring(0, 2); // gets the "1️⃣"
                        const optText = opt.substring(3).trim();
                        return (
                          <button 
                            key={i}
                            onClick={() => handleSendMessage(null, optNumber[0])}
                            className="text-left bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-sm transition-all shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-3 group"
                          >
                            <span className="text-lg group-hover:scale-110 transition-transform">{optNumber}</span>
                            <span className="font-medium">{optText}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-[#0f172a] shrink-0">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-500"
            />
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 text-white p-3 rounded-xl transition-colors shadow-[0_4px_15px_rgba(6,182,212,0.4)] flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
