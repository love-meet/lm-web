import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Clock, AlertCircle, Wifi, WifiOff, XCircle } from 'lucide-react';
import { io } from 'socket.io-client';
import { useAuth } from '../../../context/AuthContext';
import ChatBubble from '../../../components/chat/ChatBubble';
import ChatInput from '../../../components/chat/ChatInput';
import { backendUrl } from '../../../api/axios';

const SOCKET_URL = backendUrl().replace('/lovemeet', '');
const socket = io(SOCKET_URL, {
  withCredentials: true
});

export default function SupportChat() {
  const { user, appLoad } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [issueCategories, setIssueCategories] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [socketError, setSocketError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleConnect = () => {
      console.log('Socket connected');
      setSocketConnected(true);
      setSocketError(null);
      setRetryCount(0);
      socket.emit('get-issue-categories');
    };

    const handleDisconnect = (reason) => {
      console.log('Socket disconnected:', reason);
      setSocketConnected(false);

      if (reason === 'io server disconnect' || reason === 'io client disconnect') {
        return;
      }

      const delay = Math.min(1000 * Math.pow(2, retryCount), 30000);
      setRetryCount(prev => prev + 1);

      reconnectTimeoutRef.current = setTimeout(() => {
        console.log(`Attempting to reconnect... (${retryCount + 1})`);
        socket.connect();
      }, delay);
    };

    const handleConnectError = (error) => {
      console.error('Socket connection error:', error);
      setSocketConnected(false);
      setSocketError('Failed to connect to support server');
    };

    const handleReconnectAttempt = (attemptNumber) => {
      console.log(`Reconnection attempt ${attemptNumber}`);
    };

    const handleReconnectFailed = () => {
      console.error('Failed to reconnect after maximum attempts');
      setSocketError('Unable to reconnect to support server. Please refresh the page.');
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);
    socket.on('reconnect_attempt', handleReconnectAttempt);
    socket.on('reconnect_failed', handleReconnectFailed);

    socket.on('issue-categories', (data) => {
      console.log('Received issue categories:', data.categories);
      setIssueCategories(data.categories);
      setSocketError(null);
    });

    if (!socket.connected) {
      socket.connect();
    } else {
      handleConnect();
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      socket.off('reconnect_attempt', handleReconnectAttempt);
      socket.off('reconnect_failed', handleReconnectFailed);
      socket.off('issue-categories');

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [retryCount]);

  useEffect(() => {
    socket.on('ticket-created', (data) => {
      console.log('Ticket created:', data);
      setTicket(data.ticket);
      setMessages(data.ticket.messages || []);
      setEstimatedWaitTime(data.estimatedWaitTime);
    });

    socket.on('new-message', (message) => {
      console.log('New message received:', message);
      const formattedMessage = {
        id: message.id || Date.now(),
        ticketId: message.ticketId,
        sender: message.sender || (message.role === 'admin' ? 'Admin' : 'User'),
        role: message.role || 'user',
        message: message.message || message.text || '',
        timestamp: message.timestamp || message.at || new Date().toISOString(),
        time: message.time || new Date(message.timestamp || message.at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, formattedMessage]);
    });

    socket.on('admin-connected', (data) => {
      console.log('Admin connected:', data);
      // Update ticket status to in-progress
      setTicket(prev => prev ? { ...prev, status: 'in-progress' } : prev);
    });

    socket.on('user-typing', (data) => {
      console.log('User typing:', data);
      setIsTyping(data.isTyping);
    });

    // **FIX: Handle ticket closed event**
    socket.on('ticket-closed', (data) => {
      console.log('Ticket closed:', data);
      setTicket(data.ticket);
      
      // Add a system message to inform user
      const closedMessage = {
        id: Date.now(),
        ticketId: data.ticket?.ticketId,
        sender: 'System',
        role: 'system',
        message: `This ticket has been closed. ${data.ticket?.closeReason || 'Issue resolved'}`,
        timestamp: new Date().toISOString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, closedMessage]);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error.message);
      setSocketError(error.message || 'An error occurred with the support chat');
    });

    return () => {
      socket.off('ticket-created');
      socket.off('new-message');
      socket.off('admin-connected');
      socket.off('user-typing');
      socket.off('ticket-closed');
      socket.off('error');
    };
  }, []);

  useEffect(() => {
    if (!user?.userId) return;
    setSelectedIssue(null);
  }, [user?.userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleIssueSelect = (issue) => {
    let currentUser = user;
    if (!currentUser) {
      currentUser = {
        userId: 'temp-user-' + Date.now(),
        id: 'temp-user-' + Date.now(),
        name: 'Temporary User',
        username: 'tempuser',
        email: 'temp@example.com'
      };
      console.warn('No user found, using temporary mock user for testing');
    }

    if (!socketConnected) {
      setSocketError('Not connected to support server. Please check your connection and try again.');
      return;
    }

    setSelectedIssue(issue);
    setSocketError(null);

    socket.emit('create-ticket', {
      userId: currentUser.userId || currentUser.id,
      userName: currentUser.name || currentUser.username || 'Anonymous User',
      email: currentUser.email || '',
      issueType: issue.id,
      description: issue.description
    });
  };

  const handleSendMessage = (content) => {
    if (!ticket) return;

    // **FIX: Prevent sending messages if ticket is closed**
    if (ticket.status === 'closed') {
      setSocketError('This ticket has been closed. You cannot send new messages.');
      return;
    }

    if (!socketConnected) {
      setSocketError('Connection lost. Please check your internet connection.');
      return;
    }

    let currentUser = user;
    if (!currentUser) {
      currentUser = {
        userId: 'temp-user-' + Date.now(),
        id: 'temp-user-' + Date.now(),
        name: 'Temporary User',
        username: 'tempuser',
        email: 'temp@example.com'
      };
    }

    socket.emit('send-message', {
      ticketId: ticket.ticketId,
      message: content,
      role: 'user'
    });
  };

  const handleTyping = (isTyping) => {
    // **FIX: Don't send typing events if ticket is closed**
    if (ticket && ticket.status !== 'closed') {
      let currentUser = user;
      if (!currentUser) {
        currentUser = {
          userId: 'temp-user-' + Date.now(),
          id: 'temp-user-' + Date.now(),
          name: 'Temporary User',
          username: 'tempuser',
          email: 'temp@example.com'
        };
      }

      socket.emit('typing', {
        ticketId: ticket.ticketId,
        userName: currentUser.name || currentUser.username || 'Anonymous User',
        isTyping
      });
    }
  };

  if (appLoad) {
    return (
      <div className="fixed inset-0 bg-[var(--bg-primary)] flex items-center justify-center z-50">
        <div className="text-center">
          <MessageCircle size={48} className="mx-auto text-[var(--text-muted)] mb-4" />
          <p className="text-[var(--text-muted)]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!selectedIssue) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] z-50 flex flex-col">
        <div className="relative z-10 bg-[var(--bg-primary)]/90 backdrop-blur-lg border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/chats")}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
              <h2 className="text-white font-semibold text-lg">Support Chat</h2>
            </div>
            <div className="flex items-center space-x-2">
              {socketConnected ? (
                <Wifi size={16} className="text-green-400" />
              ) : (
                <WifiOff size={16} className="text-red-400" />
              )}
            </div>
          </div>
          {socketError && (
            <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{socketError}</p>
            </div>
          )}
        </div>

        <div className="flex-1 relative z-10 overflow-y-auto scrollbar-hide p-4">
          {!user && (
            <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-400 text-sm">
                Note: You're not logged in. A temporary user session will be created for testing purposes.
              </p>
            </div>
          )}
          <div className="space-y-4">
            <p className="text-[var(--text-secondary)] text-center mb-6">Please select the issue you're facing:</p>
            {issueCategories.length > 0 ? (
              issueCategories.map((issue) => (
                <button
                  key={issue.id}
                  onClick={() => handleIssueSelect(issue)}
                  className="w-full p-4 bg-gradient-to-r from-[var(--bg-secondary)]/60 to-[var(--bg-tertiary)]/60 backdrop-blur-sm border border-white/10 rounded-2xl text-left hover:bg-gradient-to-r hover:from-[var(--bg-secondary)]/80 hover:to-[var(--bg-tertiary)]/80 transition-all duration-300"
                >
                  <div>
                    <h3 className="text-white font-semibold">{issue.label}</h3>
                    <p className="text-[var(--text-muted)] text-sm">{issue.description}</p>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8">
                {!socketConnected ? (
                  <>
                    <WifiOff size={48} className="mx-auto text-red-400 mb-4" />
                    <p className="text-red-400">Connection Failed</p>
                    <p className="text-[var(--text-muted)] text-sm mt-2">
                      Unable to connect to support server. Please check your internet connection.
                    </p>
                    <button
                      onClick={() => {
                        setSocketError(null);
                        setRetryCount(0);
                        socket.connect();
                      }}
                      className="mt-4 px-4 py-2 bg-[var(--primary-cyan)] text-white rounded-lg hover:bg-[var(--primary-cyan)]/80 transition-colors"
                    >
                      Retry Connection
                    </button>
                  </>
                ) : (
                  <>
                    <MessageCircle size={48} className="mx-auto text-[var(--text-muted)] mb-4" />
                    <p className="text-[var(--text-muted)]">Loading issue categories...</p>
                    <p className="text-[var(--text-muted)] text-sm mt-2">Please wait while we fetch the available options</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="fixed inset-0 bg-[var(--bg-primary)] flex items-center justify-center z-50">
        <div className="text-center">
          <MessageCircle size={48} className="mx-auto text-[var(--text-muted)] mb-4" />
          <p className="text-[var(--text-muted)]">Creating support ticket...</p>
          <p className="text-[var(--text-muted)] text-sm mt-2">Please wait while we connect you to support</p>
          {estimatedWaitTime && (
            <div className="flex items-center justify-center mt-4 text-[var(--text-muted)] text-sm">
              <Clock size={16} className="mr-2" />
              Estimated wait time: {estimatedWaitTime}
            </div>
          )}
        </div>
      </div>
    );
  }

  // **FIX: Check if ticket is closed**
  const isTicketClosed = ticket.status === 'closed';

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] z-50 flex flex-col">
      <div className="relative z-10 bg-[var(--bg-primary)]/90 backdrop-blur-lg border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedIssue(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--primary-blue)] flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Support</h2>
                <p className="text-[var(--text-muted)] text-xs">
                  {ticket.status === 'open' ? 'Waiting for admin' :
                   ticket.status === 'in-progress' ? 'Admin connected' :
                   'Ticket closed'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-[var(--text-muted)] text-xs">Ticket #{ticket.ticketId}</p>
              <p className="text-[var(--text-muted)] text-xs">{selectedIssue.label}</p>
            </div>
            <div className="flex items-center space-x-2">
              {socketConnected ? (
                <Wifi size={16} className="text-green-400" />
              ) : (
                <WifiOff size={16} className="text-red-400" />
              )}
            </div>
          </div>
        </div>
        {socketError && (
          <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
            <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{socketError}</p>
          </div>
        )}
        {/* **FIX: Show ticket closed banner** */}
        {isTicketClosed && (
          <div className="mt-2 p-3 bg-gray-500/20 border border-gray-500/30 rounded-lg flex items-center space-x-2">
            <XCircle size={16} className="text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-sm font-semibold">This ticket has been closed</p>
              <p className="text-gray-500 text-xs">{ticket.closeReason || 'Issue resolved'}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 relative z-10 overflow-y-auto scrollbar-hide">
        <div className="p-4 space-y-2">
          {messages.map((message, index) => (
            <ChatBubble
              key={message.id || index}
              message={message}
              isLast={index === messages.length - 1}
            />
          ))}
          {isTyping && !isTicketClosed && (
            <div className="flex items-center space-x-2 text-[var(--text-muted)] text-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span>Admin is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* **FIX: Conditionally render ChatInput or closed message** */}
      <div className="relative z-10">
        {isTicketClosed ? (
          <div className="p-4 bg-[var(--bg-secondary)]/50 border-t border-white/10">
            <div className="text-center text-[var(--text-muted)] text-sm">
              <XCircle size={20} className="inline-block mr-2" />
              This ticket is closed. Create a new ticket if you need further assistance.
            </div>
          </div>
        ) : (
          <ChatInput onSendMessage={handleSendMessage} onTyping={handleTyping} />
        )}
      </div>
    </div>
  );
}