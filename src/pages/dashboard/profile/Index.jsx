import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaWallet, FaArrowUp, FaLink, FaPencilAlt, FaCheck, FaCopy, FaUsers, FaTachometerAlt, FaMapMarkerAlt, FaVenusMars, FaGlobe, FaFan, FaShare, FaCog, FaUserFriends, FaImages } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { planIcons, planColors } from '../../../data/PlansIcons';
import PageLoader from "../../../components/PageLoader"
import api from "../../../api/axios"
import { toast } from 'sonner';
import { useAffiliate } from '../../../context/AffiliateContext';
import { generateReferralLink } from '../../../utils/affiliate';
import Settings from '../settings/Index';
import AffiliateDashboard from '../affiliate/Index';

const Profile = ({ onClose }) => {
  const { user , setUser, fetchUserData } = useAuth();
  const navigate = useNavigate();
  const [bio, setBio] = useState('This is a default bio. Click the pencil icon to edit.');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [loadBioButton, setLoadBioButton] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPictureViewOpen, setIsPictureViewOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({ name: 'Blossom', icon: FaFan });
  const { isUserAffiliate } = useAffiliate();
  const fileInputRef = useRef(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);

  const planName = user?.subscriptionPlan?.planName || 'Free';
  const PlanIcon = planIcons[planName] || FaUser;
  const planColor = planColors[planName] || '#9CA3AF';

  async function handleUpdateBio() {
    setLoadBioButton(true)
    try {
      const response = await api.put('/auth/user/bio', { bio })
      setUser(response)
      toast.success("Bio updated successfully")
    } catch(error) {
      toast.error(error.message)
    } finally {
      setLoadBioButton(false)
      setIsEditingBio(false)
    }
  }

  useEffect(() => {
    if (user?.bio) {
      setBio(user.bio);
    }
  }, [user]);

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

  useEffect(()=>{
    fetchUserData()
  },[])

  const handleUpdateProfile = () => {
    fileInputRef.current.click();
    setIsMenuOpen(false);
  }

  const handleUpdateProfilePicture = async(Base64) => {
    try {
      const response = await api.put('/auth/user/picture', { picture: Base64 })
      setUser(response)
      toast.success("Picture updated successfully")
    } catch(error) {
      toast.error(error.message)
    }
  }

  const handlePictureChange = async(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 200;
          const MAX_HEIGHT = 200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const resizedBase64 = canvas.toDataURL('image/jpeg');
          handleUpdateProfilePicture(resizedBase64)
          setUser(prevUser => ({...prevUser, picture: resizedBase64}));
        };
      };
      reader.readAsDataURL(file);
    }
  }

  const affiliateLink = generateReferralLink(user?._id, 'https://love-meet.com');

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setIsCopied(true);
    toast.success("Referral code copied!");
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <div className="fixed inset-0 bg-[#020418] z-50 flex flex-col">
          {/* Header */}
         <div className="relative z-10 bg-[#020418] p-4 flex items-center justify-between flex-shrink-0">
  <button onClick={onClose} className="p-2 rounded-full bg-[rgba(26,31,58,0.56)] hover:bg-[#252b4a] transition-colors">
    <FaArrowLeft className="text-white text-xl" />
  </button>
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsSettingsModalOpen(true)} className="p-2 rounded-full bg-[rgba(26,31,58,0.56)] hover:bg-[#252b4a] transition-colors">
                <FaCog className="text-white text-xl" />
              </button>
              <button onClick={() => setIsAffiliateModalOpen(true)} className="p-2 rounded-full  bg-[rgba(26,31,58,0.56)] hover:bg-[#252b4a] transition-colors">
                <FaUserFriends className="text-white text-xl" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto p-6 pb-24">
            {/* Profile Section */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
                <div className="bg-cyan-500 rounded-full p-1">
                  <FaCheck className="text-white text-xs" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">{user?.email}</p>
              <p className="text-gray-400 text-sm mb-3">Current plan: <span className="font-semibold" style={{ color: planColor }}>{planName}</span></p>
              
              {/* Ref Code Box */}
              <div className="inline-flex items-center space-x-2 bg-[#12152b] rounded-lg px-4 py-2">
                <span className="text-white-bold-300 text-sm">Ref code: <span className="font-mono">{user?.referralCode || 'mgf1z4nlifj2o'}</span></span>
                <button onClick={handleCopy} className="text-gray-400 hover:text-white">
                  {isCopied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                </button>
              </div>
            </div>

            {/* Gallery Button */}
            <button className="w-full bg-[#1a1f3a] hover:bg-[#252b4a] text-white rounded-2xl p-4 mb-4 flex items-center space-x-3 transition-colors border-1 border-gray-700" onClick={() => setIsPictureViewOpen(true)}>
              <FaImages className="text-xl" />
              <span className="text-lg font-medium">Gallery</span>
            </button>

            {/* Wallet Button */}
            <button className="w-full bg-[#1a1f3a] hover:bg-[#252b4a] text-white rounded-2xl p-4 mb-6 flex items-center space-x-3 transition-colors border-1 border-gray-700">
              <FaWallet className="text-xl" />
              <span className="text-lg font-medium">Wallet</span>
            </button>

            {/* User Details Card */}
            <div className="bg-[#1a1f3a] rounded-2xl p-6 border-1 border-gray-700">
              <div className="mb-6">
                <h3 className="text-gray-400 text-sm mb-2">Full Name</h3>
                <p className="text-white text-lg">{user?.firstName} {user?.lastName}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-gray-400 text-sm mb-2">Location</h3>
                <p className="text-white text-lg">{user?.country}, {user?.state}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-gray-400 text-sm mb-2">Age</h3>
                <p className="text-white text-lg">{user?.age || 'N/A'}</p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm mb-2">Gender</h3>
                <p className="text-white text-lg">{user?.gender || 'N/A'}</p>
              </div>

                <div>
                <h3 className="text-gray-400 text-sm mb-2">Looking For</h3>
                <p className="text-white text-lg">{user?.looking || 'N/A'}</p>
              </div>

                <div>
                <h3 className="text-gray-400 text-sm mb-2">Age Preference </h3>
                <p className="text-white text-lg">{user?.agePreference || 'N/A'}</p>
              </div>

                <div>
                <h3 className="text-gray-400 text-sm mb-2">Bio</h3>
                <p className="text-white text-lg">{user?.bio || 'N/A'}</p>
              </div>

                <div>
                <h3 className="text-gray-400 text-sm mb-2">Hobbies</h3>
                <p className="text-white text-lg">{user?.hobbies || 'N/A'}</p>
              </div>

            </div>
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
            onChange={handlePictureChange}
            className="hidden"
            accept="image/*"
          />
        </div>
      </Suspense>
      {isSettingsModalOpen && <Settings onClose={() => setIsSettingsModalOpen(false)} />}
      {isAffiliateModalOpen && <AffiliateDashboard onClose={() => setIsAffiliateModalOpen(false)} />}
    </>
  );
};

export default Profile;