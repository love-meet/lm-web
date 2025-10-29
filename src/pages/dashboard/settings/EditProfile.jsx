import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaCamera,
  FaSignOutAlt,
  FaHeadset,
  FaGem,
  FaChevronDown
} from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

export default function Settings({ onClose }) {
  const { user, handleLogOut } = useAuth();
  const navigate = useNavigate();
  const handleClose = onClose || (() => navigate(-1));

  const [formData, setFormData] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
    ageMin: 18,
    ageMax: 35,
    lookingFor: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = () => {
    console.log('Updating profile:', formData);
    // Add API call here
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-[#020418] text-white z-50 flex flex-col">
      {/* Header */}
      <div className="relative z-10 bg-[#020418] p-4 flex items-center justify-start flex-shrink-0 border-b border-white/10">
        <button onClick={handleClose} className="p-2 rounded-full hover:bg-[#252b4a] transition-colors mr-4">
          <FaArrowLeft className="text-white text-xl" />
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="overflow-y-auto p-6 pb-24">
        {/* Profile Picture with Camera Button */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#1a1f3a]">
              <img 
                src={user?.picture || "/assets/female.jpg"} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 w-14 h-14 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center border-4 border-[#020418]">
              <FaCamera className="text-white text-xl" />
            </button>
          </div>
        </div>

        {/* Username Field */}
        <div className="mb-6">
          <label className="text-white text-base mb-3 block">Username</label>
          <div className="bg-[#12152b] rounded-2xl p-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full bg-transparent text-white text-lg outline-none"
              placeholder="Enter username"
            />
          </div>
        </div>

        {/* Bio Field */}
        <div className="mb-6">
          <label className="text-white text-base mb-3 block">Bio</label>
          <div className="bg-[#12152b] rounded-2xl p-4">
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
              className="w-full bg-transparent text-gray-400 text-base outline-none resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        {/* Age Range */}
        <div className="mb-6">
          <label className="text-white text-base mb-3 block">Age Range</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#12152b] rounded-2xl p-4">
              <input
                type="number"
                name="ageMin"
                value={formData.ageMin}
                onChange={handleInputChange}
                className="w-full bg-transparent text-white text-lg outline-none"
              />
            </div>
            <div className="bg-[#12152b] rounded-2xl p-4">
              <input
                type="number"
                name="ageMax"
                value={formData.ageMax}
                onChange={handleInputChange}
                className="w-full bg-transparent text-white text-lg outline-none"
              />
            </div>
          </div>
        </div>

        {/* I'm looking for */}
        <div className="mb-8">
          <label className="text-white text-base mb-3 block">I'm looking for...</label>
          <div className="bg-[#12152b] rounded-2xl p-4 relative">
            <select
              name="lookingFor"
              value={formData.lookingFor}
              onChange={handleInputChange}
              className="w-full bg-transparent text-gray-400 text-base outline-none appearance-none pr-8"
            >
              <option value="">Select your interest</option>
              <option value="friendship">Friendship</option>
              <option value="dating">Dating</option>
              <option value="relationship">Serious Relationship</option>
              <option value="marriage">Marriage</option>
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Update Profile Button */}
        <button 
          onClick={handleUpdateProfile}
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-2xl p-4 mb-4 text-lg font-semibold transition-all"
        >
          Update Profile
        </button>

        {/* Cancel Button */}
        <button 
          onClick={handleCancel}
          className="w-full bg-transparent border-2 border-[#2a2f4a] text-white hover:bg-[#1a1f3a] rounded-2xl p-4 mb-8 text-lg font-semibold transition-all"
        >
          Cancel
        </button>

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
        <div className="text-center text-gray-400 mt-4">
          <p className="text-sm">Love-Meet v1.0.0</p>
        </div>
      </div>
    </div>
  );
}