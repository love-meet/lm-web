import React from 'react';
import InterestsSelector from './InterestsSelector';

const Step4 = ({ formData, setFormData, validationErrors }) => (
  <div className="space-y-6 animate-fadeIn flex-1 relative z-10 overflow-y-auto scrollbar-hide h-[60vh] pb-10">
    <div className="sticky top-0 bg-[var(--bg-primary)] pb-4 pt-2">
      <h2 className="text-2xl font-semibold text-white">✨ Show Your Personality ✨</h2>
      <p className="text-text-muted">Let your future match see the real you 🌟</p>
    </div>
    
    <div className="space-y-6">
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
      
      <InterestsSelector
        label="🎨 Hobbies & Interests"
        selectedItems={formData.hobbies}
        onSelect={(newHobbies) => setFormData(prev => ({...prev, hobbies: newHobbies}))}
        minRequired={3}
        error={validationErrors.hobbies}
      />
      
      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg p-4 border border-pink-500/20">
        <p className="text-sm text-text-muted">
          💡 <strong>Tip:</strong> Be genuine and specific! Instead of just "music", try "indie rock concerts" or "piano playing"
        </p>
      </div>
    </div>
  </div>
);

export default Step4;
