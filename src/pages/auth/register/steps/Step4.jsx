import React from 'react';
import TagInput from './TagInput';

const Step4 = ({ formData, setFormData, validationErrors }) => (
  <div className="space-y-6 animate-fadeIn flex-1 relative z-10 overflow-y-auto scrollbar-hiden h-[50vh]">
    <h2 className="text-2xl font-semibold text-white">✨ Show Your Personality ✨</h2>
    <p className="text-text-muted text-center mb-6">This is where you shine! Let your future match see the real you 🌟</p>
    
    <div>
      <label className="block mb-2 text-text-secondary">📝 About Me</label>
      <textarea 
        name="bio" 
        value={formData.bio} 
        onChange={(e) => setFormData(prev => ({...prev, bio: e.target.value}))} 
        placeholder="Share your story, dreams, and what makes you unique... 💫" 
        rows="4" 
        className={`input-styled w-full ${validationErrors.bio ? 'border-red-500' : ''}`}
      />
      {validationErrors.bio && <p className="text-red-400 text-sm mt-1">{validationErrors.bio}</p>}
    </div>
    
    <TagInput 
      label="🎨 Hobbies (What do you love doing?)" 
      tags={formData.hobbies} 
      setTags={(newHobbies) => setFormData(prev => ({...prev, hobbies: newHobbies}))} 
      error={validationErrors.hobbies}
      minRequired={3}
    />
    
    <TagInput 
      label="💖 Relationship Interests (What are you looking for?)" 
      tags={formData.interests} 
      setTags={(newInterests) => setFormData(prev => ({...prev, interests: newInterests}))} 
      error={validationErrors.interests}
      minRequired={3}
    />
    
    <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg p-4 border border-pink-500/20">
      <p className="text-sm text-text-muted text-center">
        💡 <strong>Tip:</strong> Be genuine and specific! Instead of just "music", try "indie rock concerts" or "piano playing"
      </p>
    </div>
  </div>
);

export default Step4;
