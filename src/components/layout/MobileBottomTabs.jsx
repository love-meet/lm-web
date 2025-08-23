import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Plus, Settings } from 'lucide-react';

const MobileBottomTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      special: true // Special styling for post button
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      path: '/settings',
      color: 'var(--primary-purple)'
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Background with blur */}
      <div className="bg-gradient-to-r from-[var(--bg-primary)] to-[var(--bg-secondary)] backdrop-blur-lg border-t border-white/10">
        <div className="flex justify-between items-center py-0 px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.path);
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.path)}
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
  );
};

export default MobileBottomTabs;
