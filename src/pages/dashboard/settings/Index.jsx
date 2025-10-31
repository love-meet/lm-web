import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaShieldAlt,
  FaBell,
  FaHeart,
  FaLock,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChevronRight,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEye,
  FaUserSecret,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
  FaComments,
  FaCamera,
  FaPencilAlt,
  FaHeadset,
  FaGem
} from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

export default function Settings({ onClose }) {
  const { user, handleLogOut, preferences, updatePreferences } = useAuth();
  const navigate = useNavigate();
  const handleClose = onClose || (() => navigate(-1));

  return (
    <div className="fixed inset-0 bg-[#020418] text-white z-50 flex flex-col">
      {/* Header */}
      <div className="relative z-10 bg-[#020418] p-4 flex items-center justify-between flex-shrink-0 border-b border-white/10">
        <button onClick={handleClose} className="p-2 rounded-full bg-[rgba(26,31,58,0.56)] hover:bg-[#252b4a] transition-colors">
          <FaTimes className="text-white text-xl" />
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
        <div className="w-10"></div>
      </div>

      <div className="overflow-y-auto p-6 pb-24">
        {/* Profile Picture with Camera Button */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#1a1f3a]">
              <img 
                src={user?.picture || "/assets/female.jpg"} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center border-4 border-[#020418]">
              <FaCamera className="text-white text-lg" />
            </button>
          </div>
          
          {/* Edit Profile Button */}
          <button className="flex items-center space-x-2 text-pink-500 font-semibold">
            <FaPencilAlt />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Username Field */}
        <div className="mb-6">
          <label className="text-white text-sm mb-2 block">Username</label>
          <div className="bg-[#12152b] rounded-2xl p-4">
            <span className="text-white text-lg">{user?.username || 'highscoretech'}</span>
          </div>
        </div>

        {/* Bio Field */}
        <div className="mb-6">
          <label className="text-white text-sm mb-2 block">Bio</label>
          <div className="bg-[#12152b] rounded-2xl p-4">
            <span className="text-gray-400 text-lg">{user?.bio || 'No bio set.'}</span>
          </div>
        </div>

        {/* Age Range Preference */}
        <div className="mb-6">
          <label className="text-white text-sm mb-2 block">Age Range Preference</label>
          <div className="bg-[#12152b] rounded-2xl p-4">
            <span className="text-white text-lg">{user?.agePreference || '18 - 35'}</span>
          </div>
        </div>

        {/* Interests */}
        <div className="mb-6">
          <label className="text-white text-sm mb-2 block">Intrests</label>
          <div className="bg-[#12152b] rounded-2xl p-4">
            <span className="text-gray-400 text-lg">{user?.interests || 'Not set'}</span>
          </div>
        </div>

        {/* Live Support Chat Button */}
        <button 
          onClick={() => navigate('/support')}
          className="w-full bg-[#1a1f3a] hover:bg-[#252b4a] text-white rounded-2xl p-4 mb-4 flex items-center justify-center space-x-3 transition-colors border border-[#2a2f4a]"
        >
          <FaHeadset className="text-xl" />
          <span className="text-lg font-medium">Live Support Chat</span>
        </button>

        {/* Change Subscription Plan Button */}
        <button 
          onClick={() => navigate('/subscription/plans')}
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-2xl p-4 mb-4 flex items-center justify-center space-x-3 transition-all"
        >
          <FaGem className="text-xl" />
          <span className="text-lg font-medium">Change Subscription Plan</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogOut}
          className="w-full bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-500/10 rounded-2xl p-4 mb-6 flex items-center justify-center space-x-3 transition-all"
        >
          <FaSignOutAlt className="text-xl" />
          <span className="text-lg font-medium">Logout</span>
        </button>

        {/* Footer */}
        <div className="text-center text-gray-400">
          <p className="text-sm">Love-Meet v1.0.0</p>
        </div>
      </div>
    </div>
  );
}