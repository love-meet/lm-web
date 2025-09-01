import React, { useEffect, useState, Suspense, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaWallet, FaArrowUp, FaLink, FaPencilAlt, FaCheck, FaCopy, FaUsers, FaTachometerAlt, FaMapMarkerAlt, FaVenusMars, FaGlobe } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { planIcons, planColors } from '../../../data/PlansIcons';
import PageLoader from "../../../components/PageLoader"
import api from "../../../api/axios"
import { toast } from 'sonner';

// MK_TEST_XP1BL6NFBL
// CP0JFD31EX3DB8XJXWHGE08NEG92RCNK

const Profile = () => {
  const { user , setUser} = useAuth();
  const navigate = useNavigate();
  const [bio, setBio] = useState('This is a default bio. Click the pencil icon to edit.');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [ loadBioButton, setLoadBioButton ] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPictureViewOpen, setIsPictureViewOpen] = useState(false);
  const fileInputRef = useRef(null);


  const planName = user?.subscriptionPlan?.planName || 'Free';
  const PlanIcon = planIcons[planName] || FaUser;
  const planColor = planColors[planName] || '#9CA3AF';




  async function handleUpdateBio(string){
    setLoadBioButton(true)
    try{
      const response = await api.put('/auth/user/bio',{
        bio
      })
      setUser(response)
      toast.success("Bio updated successfully")
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
    finally{
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

  const handleUpdateProfile = () => {
    fileInputRef.current.click();
    setIsMenuOpen(false);
  }

  const handleUpdateProfilePicture = async(Base64) => {
    try{
      const response = await api.put('/auth/user/picture',{
        picture: Base64
      })
      setUser(response)
      toast.success("Picture updated successfully")
    }
    catch(error){
      console.log(error)
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
  };

  return (
    <Suspense fallback={<PageLoader />}  >
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
          <div className="relative inline-block" >
            <img
              src={user?.picture ||  "/assets/female.jpg"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-[var(--primary-cyan)] object-cover cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            <div className="absolute bottom-0 right-0 bg-[var(--bg-secondary)] p-2 rounded-full">
              <PlanIcon style={{ color: planColor }} className="text-2xl" />
            </div>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center rounded-full">
                <button onClick={() => {setIsPictureViewOpen(true); setIsMenuOpen(false)}} className="text-white py-2">View Picture</button>
                <button onClick={handleUpdateProfile} className="text-white py-2">Update Profile</button>
              </div>
            )}
          </div>
          <h2 className="text-3xl font-bold mt-4">{user?.username}</h2>
          <p className="text-[var(--text-muted)]">{user?.email}</p>
          <div className="mt-2 text-xs text-gray-400">
            <span>Joined on: {user?.dateJoined ? formatDateTime(user.dateJoined) : 'N/A'}</span>
          </div>
          <div className="mt-2 text-sm font-semibold" style={{ color: planColor }}>
            <span>Current Plan: {planName}</span>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[var(--primary-cyan)]">Bio</h3>
            {!isEditingBio ? (
              <button onClick={() => setIsEditingBio(true)}  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <FaPencilAlt className="text-white"/>
              </button>
            ) : (
              <button onClick={handleUpdateBio} disabled={loadBioButton} className="bg-green-500 text-white font-bold py-1 px-3 rounded-full hover:bg-green-600 transition-all duration-300">
                {loadBioButton ? "Loading..." : "Save"}
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
            <p className="text-gray-300">{bio ? bio : " Click the pencil icon to edit." }</p>
          )}
        </div>

        {/* Other Properties */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[var(--primary-cyan)]">User Properties</h3>
          <div className="flex items-center gap-2 pb-4" >
            <FaUser className="text-[var(--accent-pink)]" />
             <h3 > {user?.firstName} {user?.lastName}</h3>
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

          
        {/* Affiliate Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[var(--primary-cyan)]">Affiliate Dashboard</h3>
          <p className="text-[var(--text-muted)] mb-4">Check your affiliate status and earnings.</p>
          <Link to="/affiliate/dashboard" className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-full hover:opacity-80 transition-all duration-300 flex items-center justify-center space-x-2">
            <FaTachometerAlt />
            <span>Go to Dashboard</span>
          </Link>
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
  </Suspense >

  );
};

export default Profile;