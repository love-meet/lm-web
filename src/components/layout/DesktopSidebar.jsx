import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Plus, User, Bell, Settings, LogOut, Heart } from 'lucide-react';

const DesktopSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
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
      color: 'var(--accent-pink)'
    },
    {
      id: 'profile',
      name: 'Profile',
      icon: User,
      path: '/profile',
      color: 'var(--primary-purple)'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: Bell,
      path: '/notifications',
      color: 'var(--accent-orange)'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      path: '/settings',
      color: 'var(--primary-indigo)'
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout clicked');
  };

  return (
    <div className="hidden md:flex flex-col fixed right-0 top-0 h-screen w-72 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] border-l border-white/10 backdrop-blur-lg z-40">
      {/* Animated Advertisement Section */}
      <div className="p-6 border-b border-white/10">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-purple)] to-[var(--accent-pink)] p-6 animate-shimmer">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scanLine"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-3">
              <Heart className="text-white animate-float" size={24} />
              <span className="ml-2 text-white font-bold">Love Meet</span>
            </div>
            <p className="text-white/90 text-sm text-center leading-relaxed">
              Find your perfect match! Join thousands of couples who found love here.
            </p>
            <div className="mt-3 flex justify-center">
              <div className="px-3 py-1 bg-white/20 rounded-full">
                <span className="text-white text-xs font-medium">💖 Start Dating</span>
              </div>
            </div>
          </div>
          
          {/* Floating hearts */}
          <div className="absolute top-2 right-2 text-white/30 animate-float">💖</div>
          <div className="absolute bottom-2 left-2 text-white/30 animate-logoGlow">♥</div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 group ${
                    active 
                      ? 'bg-gradient-to-r from-white/20 to-white/10 shadow-lg transform scale-105' 
                      : 'hover:bg-white/10 hover:transform hover:scale-102'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    active ? 'bg-white/20' : 'group-hover:bg-white/10'
                  }`}>
                    <Icon 
                      size={20} 
                      className={`${
                        active ? 'text-white' : 'text-[var(--text-secondary)]'
                      } transition-colors`}
                      style={{
                        filter: active ? `drop-shadow(0 0 12px ${item.color})` : 'none'
                      }}
                    />
                  </div>
                  <span className={`ml-3 font-medium transition-colors ${
                    active ? 'text-white' : 'text-[var(--text-secondary)]'
                  }`}>
                    {item.name}
                  </span>
                  
                  {/* Active indicator */}
                  {active && (
                    <div 
                      className="ml-auto w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section - Profile and Logout */}
      <div className="p-4 border-t border-white/10">
        {/* Profile Section */}
        <div className="flex items-center mb-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--primary-cyan)] flex-shrink-0">
            <img 
              src="/assets/default-profile.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ec4899'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
              }}
            />
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">John Doe</p>
            <p className="text-[var(--text-muted)] text-xs">@johndoe</p>
          </div>
        </div>
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 group"
        >
          <LogOut size={18} className="text-white mr-2 group-hover:animate-bounce" />
          <span className="text-white font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DesktopSidebar;
