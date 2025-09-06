import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Save, Plus, X } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { updateHobbies } from '../../../api/admin';

export default function Interests() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [customInterest, setCustomInterest] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load user interests on component mount
  useEffect(() => {
    if (user?.interests && Array.isArray(user.interests)) {
      setSelectedInterests(user.interests);
    } else if (user?.hobbies && Array.isArray(user.hobbies)) {
      // Fallback to hobbies if interests field doesn't exist
      setSelectedInterests(user.hobbies);
    } else if (typeof user?.interests === 'string') {
      // Handle case where interests might be stored as a comma-separated string
      setSelectedInterests(user.interests.split(',').map(item => item.trim()).filter(Boolean));
    } else {
      // Default interests if none found
      setSelectedInterests(['Travel', 'Music', 'Movies', 'Reading']);
    }
  }, [user]);

  const predefinedInterests = [
    'Travel', 'Music', 'Movies', 'Reading', 'Sports', 'Cooking', 'Dancing', 'Art',
    'Photography', 'Gaming', 'Fitness', 'Yoga', 'Hiking', 'Swimming', 'Running',
    'Cycling', 'Food & Dining', 'Wine Tasting', 'Coffee', 'Books', 'Writing',
    'Meditation', 'Fashion', 'Technology', 'Science', 'History', 'Politics',
    'Volunteering', 'Animals', 'Nature', 'Concerts', 'Theater', 'Stand-up Comedy',
    'Board Games', 'Video Games', 'Puzzles', 'Gardening', 'DIY Projects'
  ];

  const handleInterestToggle = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(item => item !== interest)
        : [...prev, interest]
    );
  };

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests(prev => [...prev, customInterest.trim()]);
      setCustomInterest('');
    }
  };

  const handleRemoveInterest = (interest) => {
    setSelectedInterests(prev => prev.filter(item => item !== interest));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Get user ID for API call
      const userId = user?.userId || user?.id || user?._id;
      if (!userId) {
        console.error('No user ID found for interests update');
        return;
      }
      
      // Call admin API to update hobbies/interests
      console.log('Saving interests:', selectedInterests);
      const response = await updateHobbies(userId, selectedInterests);
      console.log('Interests updated successfully:', response);
      
      navigate('/settings');
    } catch (error) {
      console.error('Failed to save interests:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <h1 className="text-white font-semibold text-lg">Interests & Hobbies</h1>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-[var(--accent-pink)] hover:bg-[var(--accent-pink)]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Save size={16} />
            <span>{isLoading ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Selected Interests */}
        <div className="bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center space-x-2">
            <Heart size={20} className="text-[var(--accent-pink)]" />
            <span>Your Interests ({selectedInterests.length})</span>
          </h3>
          
          {selectedInterests.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-[var(--accent-pink)]/20 border border-[var(--accent-pink)]/30 rounded-full px-3 py-2"
                >
                  <span className="text-white text-sm">{interest}</span>
                  <button
                    onClick={() => handleRemoveInterest(interest)}
                    className="text-[var(--text-muted)] hover:text-red-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[var(--text-muted)] text-center py-8">
              No interests selected yet. Choose from the options below!
            </p>
          )}
        </div>

        {/* Add Custom Interest */}
        <div className="bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Add Custom Interest</h3>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCustomInterest()}
              className="flex-1 bg-[var(--bg-tertiary)] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--accent-pink)] focus:outline-none transition-colors"
              placeholder="Type your interest..."
            />
            <button
              onClick={handleAddCustomInterest}
              className="bg-[var(--accent-pink)] hover:bg-[var(--accent-pink)]/80 text-white px-4 py-3 rounded-lg transition-colors flex items-center"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Predefined Interests */}
        <div className="bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Popular Interests</h3>
          
          <div className="flex flex-wrap gap-2">
            {predefinedInterests.map((interest, index) => (
              <button
                key={index}
                onClick={() => handleInterestToggle(interest)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedInterests.includes(interest)
                    ? 'bg-[var(--accent-pink)] text-white border border-[var(--accent-pink)]'
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-white/10 hover:border-[var(--accent-pink)]/50 hover:text-white'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-[var(--accent-pink)]/10 border border-[var(--accent-pink)]/20 rounded-lg p-4">
          <p className="text-[var(--text-secondary)] text-sm">
            💖 Your interests help us find better matches for you. Select at least 3-5 interests 
            that truly represent your personality and hobbies.
          </p>
        </div>
      </div>
    </div>
  );
}