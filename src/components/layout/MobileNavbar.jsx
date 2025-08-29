import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import NotificationModal from '../notifications/NotificationModal';
import { useAuth } from '../../context/AuthContext';


const MobileNavbar = () => {
  const { user } = useAuth(); 
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const openNotifications = () => setIsNotificationsOpen(true);
  const closeNotifications = () => setIsNotificationsOpen(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
      
  //     // Always show navbar at the top
  //     if (currentScrollY < 10) {
  //       setIsVisible(true);
  //     } else {
  //       // Show when scrolling up, hide when scrolling down
  //       setIsVisible(currentScrollY < lastScrollY);
  //     }
      
  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [lastScrollY]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 md:hidden bg-gradient-to-r from-[var(--bg-primary)] to-[var(--bg-secondary)] backdrop-blur-lg border-b border-white/10 transition-transform duration-300 ${
          isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-2">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img 
                src="/assets/lm-logo.png" 
                alt="Love Meet Logo" 
                className="h-5 w-auto animate-logoGlow"
              />
            </Link>
          </div>
          
          {/* Right side - Notification and Profile */}
          <div className="flex items-center space-x-3">
            {/* Notification Bell */}
            <button 
              onClick={openNotifications}
              className="relative p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <Bell size={17} className="text-[var(--text-primary)]" />
              {/* Notification dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--accent-pink)] rounded-full border-2 border-[var(--bg-primary)] animate-pulse"></div>
            </button>
            
            {/* Profile Picture */}
            <Link 
              to="/profile"
              className="w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--primary-cyan)] hover:border-[var(--accent-pink)] transition-colors"
            >
              <img 
                src={user?.picture || "/assets/default-profile.jpg" }
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ec4899'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                }}
              />
            </Link>
          </div>
        </div>
      </nav>

      {isNotificationsOpen && <NotificationModal onClose={closeNotifications} />}
    </>
  );
};

export default MobileNavbar;
