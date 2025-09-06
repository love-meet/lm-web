import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Plus, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import NotificationModal from '../notifications/NotificationModal';
import Profile from '../../pages/dashboard/profile/Index';

const MobileBottomTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const tabs = [
    {
      id: 'feeds',
      name: 'Feeds',
      icon: Home,
      path: '/feeds',
      color: 'var(--primary-blue)'
    },
    {
      id: 'chats',
      name: 'Chats',
      icon: MessageCircle,
      path: '/chats',
      color: 'var(--primary-cyan)'
    },
    {
      id: 'post',
      name: 'Post',
      icon: Plus,
      path: '/post',
      color: 'var(--accent-pink)',
      special: true
    },
    {
      id: 'notification',
      name: 'Notification',
      icon: Bell,
      color: 'var(--primary-purple)'
    },
    {
      id: 'profile',
      name: 'Profile',
      color: 'var(--primary-purple)'
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleTabClick = (tab) => {
    if (tab.id === 'notification') {
      setIsNotificationModalOpen(true);
    } else if (tab.id === 'profile') {
      setIsProfileModalOpen(true);
    } else {
      navigate(tab.path);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-gradient-to-r pb-3 pt-1 from-[var(--bg-primary)] to-[var(--bg-secondary)] backdrop-blur-lg border-t border-white/10">
          <div className="flex justify-between items-center py-1 px-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = isActive(tab.path);
              
              if (tab.id === 'profile') {
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab)}
                    className={`flex flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-300 ${
                      active
                        ? 'bg-white/20 transform scale-105'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div className={`p-0.5 rounded-full ${
                      active 
                        ? `bg-[${tab.color}]/20` 
                        : ''
                    }`}>
                      <img 
                        src={user?.picture || '/assets/male.jpg'} 
                        alt="profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                  </button>
                )
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`flex flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-300 ${
                    tab.special 
                      ? active
                        ? 'bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-orange)] transform scale-110'
                        : 'bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-orange)] hover:scale-105'
                      : active
                        ? 'bg-white/20 transform scale-105'
                        : 'hover:bg-white/10'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    tab.special 
                      ? 'bg-white/20' 
                      : active 
                        ? `bg-[${tab.color}]/20` 
                        : ''
                  }`}>
                    <Icon 
                      size={tab.special ? 22 : 17} 
                      className={`${
                        active || tab.special
                          ? 'text-white' 
                          : 'text-[var(--text-muted)]'
                      } transition-colors`}
                      style={{
                        filter: active && !tab.special ? `drop-shadow(0 0 8px ${tab.color})` : 'none'
                      }}
                    />
                  </div>
    
                  
                  {/* Active indicator */}
                  {active && !tab.special && (
                    <div 
                      className="absolute -top-1 w-1 h-1 rounded-full animate-pulse"
                      style={{ backgroundColor: tab.color }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Bottom safe area for devices with home indicator */}
          <div className="h-safe-area-inset-bottom bg-gradient-to-r from-[var(--bg-primary)] to-[var(--bg-secondary)]"></div>
        </div>
      </div>
      {isNotificationModalOpen && <NotificationModal onClose={() => setIsNotificationModalOpen(false)} />}
      {isProfileModalOpen && <Profile onClose={() => setIsProfileModalOpen(false)} />}
    </>
  );
};

export default MobileBottomTabs;
