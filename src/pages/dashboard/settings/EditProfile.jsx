import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Camera, Save, MapPin, Heart } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'
import { editUserProfile, getUserById } from '../../../api/admin'

export default function EditProfile() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bio: user?.bio || '',
    age: user?.age || '',
    education: user?.education || '',
    height: user?.height || '',
    relationshipGoals: user?.relationshipGoals || ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    try {
      console.log('Saving profile:', formData)
      
      // Get user ID for API call
      const userId = user?.userId || user?.id || user?._id
      if (!userId) {
        console.error('No user ID found for profile update')
        return
      }
      
      // Call admin API to edit user profile
      const response = await editUserProfile(userId, formData)
      console.log('Profile updated successfully:', response)
      
      navigate('/settings')
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--bg-primary)] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--bg-secondary)]/80 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-white font-semibold text-lg">Edit Profile</h1>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/80 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Save size={16} />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Profile Photo Section */}
        <div className="bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--primary-cyan)]">
                <img
                  src="/assets/default-profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[var(--primary-blue)] rounded-full flex items-center justify-center border-2 border-[var(--bg-primary)]">
                <Camera size={16} className="text-white" />
              </button>
            </div>
            <button className="text-[var(--primary-blue)] hover:text-[var(--primary-cyan)] transition-colors">
              Change Profile Photo
            </button>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="text-white font-semibold text-lg flex items-center space-x-2">
            <User size={20} className="text-[var(--primary-blue)]" />
            <span>Basic Information</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[var(--text-secondary)] text-sm mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full bg-[var(--bg-tertiary)] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--primary-blue)] focus:outline-none transition-colors"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label className="block text-[var(--text-secondary)] text-sm mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full bg-[var(--bg-tertiary)] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--primary-blue)] focus:outline-none transition-colors"
                placeholder="Enter your last name"
              />
            </div>

            <div>
              <label className="block text-[var(--text-secondary)] text-sm mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full bg-[var(--bg-tertiary)] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--primary-blue)] focus:outline-none transition-colors"
                placeholder="Enter your age"
              />
            </div>

            <div>
              <label className="block text-[var(--text-secondary)] text-sm mb-2">Height</label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full bg-[var(--bg-tertiary)] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--primary-blue)] focus:outline-none transition-colors"
                placeholder="e.g., 5 ft 8 in"
              />
            </div>
          </div>

          <div>
            <label className="block text-[var(--text-secondary)] text-sm mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-[var(--bg-tertiary)] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--primary-blue)] focus:outline-none transition-colors resize-none"
              placeholder="Tell others about yourself..."
            />
          </div>
        </div>

        {/* Relationship Goals */}
        <div className="bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="text-white font-semibold text-lg flex items-center space-x-2">
            <Heart size={20} className="text-[var(--accent-pink)]" />
            <span>Relationship Goals</span>
          </h3>

          <div>
            <label className="block text-[var(--text-secondary)] text-sm mb-2">What are you looking for?</label>
            <select
              name="relationshipGoals"
              value={formData.relationshipGoals}
              onChange={handleInputChange}
              className="w-full bg-[var(--bg-tertiary)] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--primary-blue)] focus:outline-none transition-colors"
            >
              <option value="">Select your relationship goal</option>
              <option value="serious">Serious Relationship</option>
              <option value="casual">Casual Dating</option>
              <option value="friends">Friends First</option>
              <option value="marriage">Marriage</option>
              <option value="undecided">Not Sure Yet</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
