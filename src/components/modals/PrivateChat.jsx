import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { X, ArrowLeft, Video, Phone, Gamepad2, Send, Check, CheckCheck, Clock, MoreVertical } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PrivateChat = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [messages, setMessages] = useState( [
        { id: 1, senderId: 'user123', text: 'Hey there!', timestamp: new Date(Date.now() - 600000), status: 'read' },
        { id: 2, senderId: currentUser.userId, text: 'Hi! How are you?', timestamp: new Date(Date.now() - 540000), status: 'read' },
        { id: 3, senderId: 'user123', text: "I'm good, thanks! Just wanted to chat.", timestamp: new Date(Date.now() - 480000), status: 'delivered' },
        { id: 4, senderId: currentUser.userId, text: "Sure, what's up?", timestamp: new Date(Date.now() - 420000), status: 'sent' },
        { id: 5, senderId: 'user123', text: 'Not much, just chilling. What about you?', timestamp: new Date(Date.now() - 360000), status: 'pending' },
        { id: 6, senderId: currentUser.userId, text: 'Same here. Working on some stuff.', timestamp: new Date(Date.now() - 300000), status: 'pending' },
        { id: 7, senderId: 'user123', text: 'Cool! What kind of stuff?', timestamp: new Date(Date.now() - 240000), status: 'pending' },
      ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const userId = searchParams.get('userId');
  const modal = searchParams.get('modal');


//   useEffect(() => {
//     if (userId && currentUser) {
//       const dummyMessages = [
//         { id: 1, senderId: 'user123', text: 'Hey there!', timestamp: new Date(Date.now() - 600000), status: 'read' },
//         { id: 2, senderId: currentUser.userId, text: 'Hi! How are you?', timestamp: new Date(Date.now() - 540000), status: 'read' },
//         { id: 3, senderId: 'user123', text: "I'm good, thanks! Just wanted to chat.", timestamp: new Date(Date.now() - 480000), status: 'delivered' },
//         { id: 4, senderId: currentUser.userId, text: "Sure, what's up?", timestamp: new Date(Date.now() - 420000), status: 'sent' },
//         { id: 5, senderId: 'user123', text: 'Not much, just chilling. What about you?', timestamp: new Date(Date.now() - 360000), status: 'pending' },
//         { id: 6, senderId: currentUser.userId, text: 'Same here. Working on some stuff.', timestamp: new Date(Date.now() - 300000), status: 'pending' },
//         { id: 7, senderId: 'user123', text: 'Cool! What kind of stuff?', timestamp: new Date(Date.now() - 240000), status: 'pending' },
//       ];
//       setMessages(dummyMessages);
//     }
//   }, [userId, currentUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const closeModal = () => {
    navigate(-1);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages(prev => [...prev, { 
        id: prev.length + 1, 
        senderId: currentUser?.userId, 
        text: newMessage.trim(), 
        timestamp: new Date(), 
        status: 'pending' 
      }]);
      setNewMessage('');
      // In a real app, you'd send this to the server via socket
      // and update status to 'sent', 'delivered', 'read' based on server response
    }
  };

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'read':
        return <CheckCheck size={14} className="text-blue-500" />;
      case 'delivered':
        return <CheckCheck size={14} className="text-gray-400" />;
      case 'sent':
        return <Check size={14} className="text-gray-400" />;
      case 'pending':
      default:
        return <Clock size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] z-50 flex flex-col">
      {/* Chat Header */}
      <div className="relative z-10 bg-[var(--bg-primary)]/90 backdrop-blur-lg border-b border-white/10 p-2 py-4 flex items-center justify-between flex-shrink-0">
        {/* Go-back icon */}
        <button onClick={closeModal} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <ArrowLeft size={18} className="text-white" />
        </button>

        {/* Username and status */}
        <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2">
          <span className="text-white text-lg font-semibold">King Man</span>
          <div className="flex items-center space-x-1">
              <span className="text-white/70 text-sm">Last seen 5m ago</span> 
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <img src={currentUser?.picture} alt={currentUser?.username} className="w-8 h-8 rounded-full object-cover" />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar ">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === currentUser?.userId ? 'justify-end' : 'justify-start'}`}
          >
       
            <div
              className={`max-w-[70%] rounded-lg p-3 ${message.senderId === currentUser?.userId
                ? 'bg-[var(--primary-cyan)] text-white rounded-br-none'
                : 'bg-white/10 text-white rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div className="flex items-center justify-end text-xs mt-1 space-x-1">
                <span className="text-white/70">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {message.senderId === currentUser?.userId && (
                  <span>{getMessageStatusIcon(message.status)}</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendMessage} className="flex-shrink-0 bg-[var(--bg-primary)]/90 backdrop-blur-lg border-t border-white/10 p-4 flex items-center space-x-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow bg-white/10 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary-cyan)]"
        />
        <button
          type="submit"
          className="p-2 rounded-full bg-[var(--primary-cyan)] text-white hover:bg-[var(--primary-cyan)]/80 transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default PrivateChat;