import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCrown, FaUserPlus, FaComment, FaHeart, FaLink } from 'react-icons/fa';

const notificationIcons = {
  'plan_upgrade': FaCrown,
  'account_signup': FaUserPlus,
  'comment_on_post': FaComment,
  'reaction_to_post': FaHeart,
  'affiliate_usage': FaLink,
};

const NotificationModal = ({ onClose }) => {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, type: 'plan_upgrade', message: 'Your plan has been upgraded to Blossom!', timestamp: '2023-10-26T10:00:00Z', link: '/profile' },
    { id: 2, type: 'account_signup', message: 'Welcome to LoveMeet! Your account is ready.', timestamp: '2023-10-25T15:30:00Z', link: '/settings' },
    { id: 3, type: 'comment_on_post', message: 'John commented on your post: "Great photo!" ', timestamp: '2023-10-26T11:15:00Z', link: '/post/3' },
    { id: 4, type: 'reaction_to_post', message: 'Sarah reacted to your post with a ❤️', timestamp: '2023-10-26T11:10:00Z', link: '/post/2' },
    { id: 5, type: 'affiliate_usage', message: 'Someone used your affiliate link! You earned ₦500.', timestamp: '2023-10-26T09:45:00Z', link: '/affiliate/dashboard' },
  ];

  const handleNotificationClick = (notification) => {
    onClose(); // Close the modal
    navigate(notification.link);
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return `${Math.floor(diffInMinutes / 10080)}w ago`;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] text-white z-50 flex flex-col">
      {/* Header */}
      <div className="relative z-10 bg-[var(--bg-primary)]/90 backdrop-blur-lg border-b border-white/10 p-4 flex items-center flex-shrink-0">
        <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <FaArrowLeft className="text-white" />
        </button>
        <h1 className="text-xl font-bold ml-4">Notifications</h1>
      </div>

      {/* Notification List */}
      <div className="overflow-y-auto p-4">
        {notifications.length === 0 ? (
          <p className="text-center text-[var(--text-muted)] mt-8">No new notifications.</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => {
              const IconComponent = notificationIcons[notification.type];
              return (
                <div 
                  key={notification.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-colors flex items-center space-x-3"
                  onClick={() => handleNotificationClick(notification)}
                >
                  {IconComponent && <IconComponent className="text-[var(--primary-cyan)] text-xl flex-shrink-0" />}
                  <div>
                    <p className="text-sm font-semibold">{notification.message}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{getTimeAgo(notification.timestamp)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;