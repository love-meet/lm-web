import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Shield, 
  Bell, 
  Heart, 
  Lock, 
  LogOut,
  ChevronRight,
  Mail,
  MapPin,
  Eye,
  UserX,
  HelpCircle,
  MessageCircle,
  MessageSquare,
  Info
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function Settings() {
  const { handleLogOut } = useAuth();
  const navigate = useNavigate();
  
  const [privacy, setPrivacy] = useState({
    showOnline: true,
    showDistance: true,
    showAge: true
  });
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    matches: true
  });

  const settingsSections = [
    {
      title: "Profile",
      icon: User,
      color: "var(--primary-blue)",
      items: [
        { id: "edit-profile", label: "Edit Profile", icon: User, action: () => navigate('/settings/edit-profile') },
        { id: "verification", label: "Profile Verification", icon: Shield, badge: "New", action: () => console.log("Verification") }
      ]
    },
    {
      title: "Matching Preferences",
      icon: Heart,
      color: "var(--accent-pink)",
      items: [
        { id: "age-range", label: "Age Range", icon: Heart, subtitle: "18 - 35", action: () => navigate('/settings/age-range') },
        { id: "distance", label: "Location & Distance", icon: MapPin, subtitle: "50 km", action: () => navigate('/settings/max-distance') },
        { id: "interests", label: "Interests & Hobbies", icon: Heart, action: () => navigate('/settings/interests') }
      ]
    },
    {
      title: "Privacy & Safety",
      icon: Shield,
      color: "var(--primary-purple)",
      items: [
        { 
          id: "show-online", 
          label: "Show Online Status", 
          icon: Eye, 
          toggle: true, 
          value: privacy.showOnline,
          onChange: (val) => setPrivacy(prev => ({...prev, showOnline: val}))
        },
        { 
          id: "show-distance", 
          label: "Show Distance", 
          icon: MapPin, 
          toggle: true, 
          value: privacy.showDistance,
          onChange: (val) => setPrivacy(prev => ({...prev, showDistance: val}))
        },
        { id: "blocked-users", label: "Blocked Users", icon: UserX, action: () => navigate('/settings/blocked-users') }
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      color: "var(--accent-orange)",
      items: [
        { 
          id: "push-notifications", 
          label: "Push Notifications", 
          icon: Bell, 
          toggle: true, 
          value: notifications.push,
          onChange: (val) => setNotifications(prev => ({...prev, push: val}))
        },
        { 
          id: "email-notifications", 
          label: "Email Notifications", 
          icon: Mail, 
          toggle: true, 
          value: notifications.email,
          onChange: (val) => setNotifications(prev => ({...prev, email: val}))
        },
        { 
          id: "match-alerts", 
          label: "New Match Alerts", 
          icon: Heart, 
          toggle: true, 
          value: notifications.matches,
          onChange: (val) => setNotifications(prev => ({...prev, matches: val}))
        }
      ]
    },
    {
      title: "Account",
      icon: Lock,
      color: "var(--primary-indigo)",
      items: [
        { id: "change-email", label: "Change Email", icon: Mail, subtitle: "your@email.com", action: () => navigate('/settings/change-email') },
        { id: "change-password", label: "Change Password", icon: Lock, action: () => navigate('/settings/change-password') }
      ]
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      color: "var(--accent-pink)",
      items: [
        { id: "help-center", label: "Help Center", icon: HelpCircle, action: () => console.log("Help Center") },
        { id: "contact-support", label: "Contact Support", icon: MessageCircle, action: () => console.log("Contact Support") },
        { id: "feedback", label: "Send Feedback", icon: MessageSquare, action: () => console.log("Send Feedback") },
        { id: "about", label: "About Love Meet", icon: Info, action: () => console.log("About Love Meet") }
      ]
    }
  ];

  const ToggleSwitch = ({ value, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange(!value)}
      disabled={disabled}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 focus:outline-none ${
        value 
          ? 'bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--primary-blue)]' 
          : 'bg-[var(--bg-tertiary)]'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block w-4 h-4 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
          value ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const SettingItem = ({ item, sectionColor }) => {
    const IconComponent = item.icon;
    
    if (item.toggle) {
      return (
        <div className="flex items-center justify-between p-4 bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-[var(--bg-secondary)]/80 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${sectionColor}20` }}
            >
              <IconComponent 
                size={18} 
                style={{ color: sectionColor }}
              />
            </div>
            <div>
              <span className="text-white font-medium text-sm">{item.label}</span>
              {item.subtitle && (
                <p className="text-[var(--text-muted)] text-xs">{item.subtitle}</p>
              )}
            </div>
          </div>
          <ToggleSwitch value={item.value} onChange={item.onChange} />
        </div>
      );
    }

    return (
      <button
        onClick={item.action}
        className="w-full flex items-center justify-between p-4 bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-[var(--bg-secondary)]/80 transition-all duration-300 hover:scale-105 group"
      >
        <div className="flex items-center space-x-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${sectionColor}20` }}
          >
            <IconComponent 
              size={18} 
              style={{ color: sectionColor }}
            />
          </div>
          <div className="text-left">
            <div className="flex items-center space-x-2">
              <span className="text-white font-medium text-sm">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 bg-[var(--accent-pink)] text-white text-xs rounded-full font-medium">
                  {item.badge}
                </span>
              )}
            </div>
            {item.subtitle && (
              <p className="text-[var(--text-muted)] text-xs">{item.subtitle}</p>
            )}
          </div>
        </div>
        <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:text-white transition-colors" />
      </button>
    );
  };


  return (
    <div className="relative min-h-screen">
      {/* Streaming Animation Background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[var(--primary-cyan)] rounded-full opacity-15"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatParticles ${6 + Math.random() * 4}s infinite ${Math.random() * 3}s`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
        
        {/* Floating love icons */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute text-[var(--accent-pink)] opacity-10"
              style={{
                left: `${Math.random() * 95}%`,
                top: `${Math.random() * 95}%`,
                fontSize: `${6 + Math.random() * 4}px`,
                animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 3}s`
              }}
            >
              💖
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 space-y-6">
 

        {/* Profile Summary Card */}
        <div className="bg-gradient-to-r from-[var(--bg-secondary)]/80 to-[var(--bg-tertiary)]/80 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6 ">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-[var(--primary-cyan)]">
                <img 
                  src="/assets/default-profile.jpg" 
                  alt="Your Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[var(--accent-green)] border-2 border-[var(--bg-primary)] rounded-full animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg">John Doe</h3>
              
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full"></div>
                <span className="text-[var(--accent-green)] text-xs font-medium">Active now</span>
              </div>
            </div>
            <div className="text-center">
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => {
            const SectionIcon = section.icon;
            return (
              <div 
                key={section.title}
                className="opacity-0 animate-fadeIn"
                style={{
                  animationDelay: `${sectionIndex * 0.1}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {/* Section Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div 
                    className="p-2 rounded-xl"
                    style={{ backgroundColor: `${section.color}20` }}
                  >
                    <SectionIcon 
                      size={20} 
                      style={{ color: section.color }}
                    />
                  </div>
                  <h2 className="text-white font-semibold text-lg">{section.title}</h2>
                </div>

                {/* Section Items */}
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className="opacity-0 animate-fadeIn"
                      style={{
                        animationDelay: `${(sectionIndex * 0.1) + (itemIndex * 0.05)}s`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      <SettingItem item={item} sectionColor={section.color} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Logout Section */}
        <div className="mt-12 pt-6 border-t border-white/20">
          <button
            onClick={handleLogOut}
            className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-600 hover:to-red-700 rounded-2xl transition-all duration-300 transform hover:scale-105 group backdrop-blur-sm border border-red-500/30"
          >
            <LogOut size={20} className="text-white group-hover:animate-bounce" />
            <span className="text-white font-semibold text-lg">Logout</span>
          </button>
          
          {/* App Info */}
          <div className="text-center mt-6 text-[var(--text-muted)]">
            <p className="text-xs">Love Meet v1.0.0</p>
            <p className="text-xs">Made with 💖 for finding true love</p>
          </div>
        </div>

      </div>
    </div>
  );
}
