import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCrown, FaUser, FaWallet, FaArrowUp, FaLink, FaPencilAlt, FaCheck, FaCopy, FaUsers, FaTachometerAlt, FaMapMarkerAlt, FaVenusMars, FaGlobe, FaFan } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const [bio, setBio] = useState('This is a default bio. Click the pencil icon to edit.');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({ name: 'Blossom', icon: FaFan });

  const affiliateLink = 'https://love-meet.com/ref/user12345678901234567890';

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] z-50 flex flex-col">
      {/* Header */}
      <div className="relative z-10 bg-[var(--bg-primary)]/90 backdrop-blur-lg border-b border-white/10 p-4 flex items-center flex-shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <FaArrowLeft className="text-white" />
        </button>
        <h1 className="text-xl font-bold ml-4">Profile</h1>
      </div>

      {/* Scrollable Body */}
      <div className="overflow-y-auto p-4 pb-20">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <img
              src="/assets/default-profile.jpg" // Replace with actual profile image
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-[var(--primary-cyan)]"
            />
            <div className="absolute bottom-0 right-0 bg-[var(--accent-pink)] p-2 rounded-full">
              <currentPlan.icon className="text-yellow-300 text-2xl" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mt-4">User Name</h2>
          <p className="text-[var(--text-muted)]">user.name@example.com</p>
          <div className="mt-2 text-xs text-gray-400">
            <span>Subscribed on: 2023-10-26</span>
          </div>
          <div className="mt-2 text-sm font-semibold text-[var(--primary-cyan)]">
            <span>Current Plan: {currentPlan.name}</span>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[var(--primary-cyan)]">Bio</h3>
            {!isEditingBio ? (
              <button onClick={() => setIsEditingBio(true)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <FaPencilAlt className="text-white"/>
              </button>
            ) : (
              <button onClick={() => setIsEditingBio(false)} className="bg-green-500 text-white font-bold py-1 px-3 rounded-full hover:bg-green-600 transition-all duration-300">
                Save
              </button>
            )}
          </div>
          {isEditingBio ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 bg-black/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-cyan)] transition-all duration-300"
              rows="4"
            ></textarea>
          ) : (
            <p className="text-gray-300">{bio}</p>
          )}
        </div>

        {/* Other Properties */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[var(--primary-cyan)]">User Properties</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <FaUser className="text-[var(--accent-pink)]" />
              <span>Age: 28</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaVenusMars className="text-[var(--accent-pink)]" />
              <span>Gender: Male</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-[var(--accent-pink)]" />
              <span>City: New York</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-[var(--accent-pink)]" />
              <span>State: NY</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaGlobe className="text-[var(--accent-pink)]" />
              <span>Country: USA</span>
            </div>
          </div>
        </div>

        {/* Affiliate Section */}
        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[var(--primary-cyan)]">Affiliate Program</h3>
            <Link to="/affiliate/dashboard" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <FaTachometerAlt className="text-white" />
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--text-muted)]">Your affiliate link:</p>
              <div className="flex items-center space-x-2 mt-2">
                <FaLink className="text-[var(--accent-pink)] flex-shrink-0" />
                <span className="text-white font-mono truncate w-48">{affiliateLink}</span>
              </div>
            </div>
            <button 
              onClick={handleCopy}
              className={`p-2 rounded-full transition-all duration-300 ${isCopied ? 'bg-green-500' : 'bg-white/10 hover:bg-white/20'}`}>
              {isCopied ? <FaCheck className="text-white" /> : <FaCopy className="text-white" />}
            </button>
          </div>
          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <FaUsers className="text-[var(--accent-pink)]" />
                    <span>123 Referrals</span>
                </div>
                <div className="text-right">
                    <h4 className="text-lg font-semibold">Earnings</h4>
                    <div className="flex items-center space-x-2 mt-1">
                        <FaWallet className="text-[var(--accent-pink)]" />
                        <span className="text-2xl font-bold">₦1,234.56</span>
                    </div>
                </div>
            </div>
            <button className="w-full mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition-all duration-300">
                Withdraw
            </button>
          </div>
        </div>

        {/* Upgrade Plan Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-[var(--primary-cyan)]">Upgrade Your Plan</h3>
          <p className="text-[var(--text-muted)] mb-4">Unlock more features and increase your earnings potential.</p>
          <Link to="/subscription/plans" className="w-full bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--accent-pink)] text-white font-bold py-3 px-6 rounded-full hover:opacity-80 transition-all duration-300 flex items-center justify-center space-x-2">
            <FaArrowUp />
            <span>Upgrade Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
