import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaWallet, FaArrowUp, FaLink, FaCheck, FaCopy, FaUsers, FaTachometerAlt, FaMapMarkerAlt, FaVenusMars, FaGlobe, FaFan, FaShare, FaCog, FaUserFriends } from 'react-icons/fa';
import { planIcons, planColors } from '../../data/PlansIcons';
import { toast } from 'sonner';
import ContentLoader from 'react-content-loader';
import { useAuth } from '../../context/AuthContext';

const PublicProfileModal = () => {
  const { getUserById, loadSingleUser, user:basedUser } = useAuth()
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPictureViewOpen, setIsPictureViewOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Profile'); 

  const userId = searchParams.get('userId');
  const modal = searchParams.get('modal');

  if (modal !== 'public-profile' || !userId) {
    return null;
  }

  useEffect(() => {
    async function fetchUser(){
     const response =  await getUserById(userId)
     setUser(response)
    }
    fetchUser()
  }, []);

  const formatDateTime = (e) => {
    const date = new Date(e);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };

  const PlanIcon = planIcons[user?.subscriptionPlan?.planName || 'Free'] || FaUser;
  const planColor = planColors[user?.subscriptionPlan?.planName || 'Free'] || '#9CA3AF';

  const closeModal = () => {
    navigate(-1);
  };

 

  if (loadSingleUser) {
    return (
      <div className="fixed inset-0 bg-[var(--bg-primary)] flex items-center justify-center z-50">
        <ContentLoader
          speed={2}
          width={400}
          height={600}
          viewBox="0 0 400 600"
          backgroundColor="var(--bg-secondary)"
          foregroundColor="var(--bg-tertiary)"
        >
          <rect x="20" y="20" rx="8" ry="8" width="60" height="60" />
          <rect x="100" y="30" rx="4" ry="4" width="200" height="20" />
          <rect x="100" y="60" rx="4" ry="4" width="120" height="16" />
          <rect x="20" y="100" rx="8" ry="8" width="360" height="240" />
          <rect x="20" y="360" rx="4" ry="4" width="360" height="20" />
          <rect x="20" y="400" rx="4" ry="4" width="360" height="60" />
        </ContentLoader>
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] z-50 flex flex-col">
        <div className="relative z-10 bg-[var(--bg-primary)]/90 backdrop-blur-lg border-b border-white/10 p-4 flex items-center justify-between flex-shrink-0">
          <button onClick={closeModal} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <FaArrowLeft className="text-white" />
          </button>
          <h1 className="text-xl font-bold">Profile</h1>
          {basedUser?.userId === user?.userId ? (
           <div className="flex items-center space-x-4">
            <button disabled className="p-2 rounded-full bg-white/10 cursor-not-allowed">
              <FaCog className="text-white opacity-50" />
            </button>
            <button disabled className="p-2 rounded-full bg-white/10 cursor-not-allowed">
              <FaUserFriends className="text-white opacity-50" />
            </button>
          </div>
          ): (
            <div></div>
          )}
     
        </div>


        <div className="overflow-y-auto p-4 pb-20">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <img
                src={user?.picture || "/assets/female.jpg"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-[var(--primary-cyan)] object-cover cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <div className="absolute bottom-0 right-0 bg-[var(--bg-secondary)] p-2 rounded-full">
                <PlanIcon style={{ color: planColor }} className="text-2xl" />
              </div>
              {isMenuOpen && (
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center rounded-full">
                  <button onClick={() => { setIsPictureViewOpen(true); setIsMenuOpen(false); }} className="text-white py-2">View Picture</button>
                </div>
              )}
            </div>
            <h2 className="text-3xl font-bold mt-4">{user?.username}</h2>
            <p className="text-[var(--text-muted)]">{user?.email}</p>
            <div className="mt-2 text-xs text-gray-400">
              <span>Joined on: {user?.dateJoined ? formatDateTime(user.dateJoined) : 'N/A'}</span>
            </div>
            <div className="mt-2 text-sm font-semibold" style={{ color: planColor }}>
              <span>Current Plan: {user?.subscriptionPlan?.planName || 'Free'}</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[var(--primary-cyan)]">Bio</h3>
            </div>
            <p className="text-gray-300">{user?.bio }</p>
          </div>

          
        {/* Tabs for switches */}
        <div className='flex justify-around border-b border-white/10 mb-6'>
            <button 
                className={`flex-1 py-3 text-center text-lg font-medium transition-colors duration-300 ${activeTab === 'Profile' ? 'text-[var(--accent-pink)] border-b-2 border-[var(--accent-pink)]' : 'text-white/70 hover:text-white'}`}
                onClick={() => setActiveTab('Profile')}
            >
                Profile
            </button>
            <button 
                className={`flex-1 py-3 text-center text-lg font-medium transition-colors duration-300 ${activeTab === 'Posts' ? 'text-[var(--accent-pink)] border-b-2 border-[var(--accent-pink)]' : 'text-white/70 hover:text-white'}`}
                onClick={() => setActiveTab('Posts')}
            >
                Posts
            </button>
            <button 
                className={`flex-1 py-3 text-center text-lg font-medium transition-colors duration-300 ${activeTab === 'Rejected' ? 'text-[var(--accent-pink)] border-b-2 border-[var(--accent-pink)]' : 'text-white/70 hover:text-white'}`}
                onClick={() => setActiveTab('Rejected')}
            >
                Rejected
            </button>
        </div>

        {activeTab === 'Profile' && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-[var(--primary-cyan)]">User Properties</h3>
                <div className="flex items-center gap-2 pb-4">
                <FaUser className="text-[var(--accent-pink)]" />
                <h3>{user?.firstName} {user?.lastName}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                    <FaUser className="text-[var(--accent-pink)]" />
                    <span>Age: {user?.age || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FaVenusMars className="text-[var(--accent-pink)]" />
                    <span>Gender: {user?.gender || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-[var(--accent-pink)]" />
                    <span>City: {user?.city || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-[var(--accent-pink)]" />
                    <span>State: {user?.state || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FaGlobe className="text-[var(--accent-pink)]" />
                    <span>Country: {user?.country || 'N/A'}</span>
                </div>
                </div>
            </div>
        )}

        {activeTab === 'Posts' && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-[var(--primary-cyan)]">User Posts</h3>
                <p className="text-gray-300">Posts content will go here.</p>
            </div>
        )}

        {activeTab === 'Rejected' && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-[var(--primary-cyan)]">Rejected Posts</h3>
                <p className="text-gray-300">Rejected posts content will go here.</p>
            </div>
        )}

        </div>

        {isPictureViewOpen && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={() => setIsPictureViewOpen(false)}>
            <button className='absolute top-4 right-4 text-lg z-50' onClick={() => setIsPictureViewOpen(false)}>Close</button>
            <img
              src={user?.picture || "/assets/female.jpg"}
              alt="Profile"
              className="w-screen h-screen object-contain"
            />
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          disabled
        />
      </div>
    </Suspense>
  );
};

export default PublicProfileModal