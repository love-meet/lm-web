import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Save } from 'lucide-react';

export default function AgeRange() {
  const navigate = useNavigate();
  const [ageRange, setAgeRange] = useState({ min: 18, max: 35 });

  const handleSave = () => {
    // TODO: Implement API call to save age range preferences
    console.log('Saving age range:', ageRange);
    navigate('/settings');
  };

  const handleRangeChange = (type, value) => {
    setAgeRange(prev => ({
      ...prev,
      [type]: parseInt(value)
    }));
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)]">
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
          <h1 className="text-white font-semibold text-lg">Age Range</h1>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-[var(--accent-pink)] hover:bg-[var(--accent-pink)]/80 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Save size={16} />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        <div className="bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-6">
          <div className="text-center">
            <Heart size={48} className="text-[var(--accent-pink)] mx-auto mb-4" />
            <h2 className="text-white font-semibold text-xl mb-2">Set Your Age Preference</h2>
            <p className="text-[var(--text-secondary)]">Choose the age range of people you'd like to meet</p>
          </div>

          <div className="space-y-6">
            {/* Current Range Display */}
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--accent-pink)] mb-2">
                {ageRange.min} - {ageRange.max}
              </div>
              <p className="text-[var(--text-secondary)]">years old</p>
            </div>

            {/* Min Age Slider */}
            <div className="space-y-3">
              <label className="block text-white font-medium">Minimum Age: {ageRange.min}</label>
              <input
                type="range"
                min="18"
                max="80"
                value={ageRange.min}
                onChange={(e) => handleRangeChange('min', e.target.value)}
                className="w-full h-2 bg-[var(--bg-tertiary)] rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, var(--accent-pink) 0%, var(--accent-pink) ${((ageRange.min - 18) / (80 - 18)) * 100}%, var(--bg-tertiary) ${((ageRange.min - 18) / (80 - 18)) * 100}%, var(--bg-tertiary) 100%)`
                }}
              />
              <div className="flex justify-between text-[var(--text-muted)] text-sm">
                <span>18</span>
                <span>80</span>
              </div>
            </div>

            {/* Max Age Slider */}
            <div className="space-y-3">
              <label className="block text-white font-medium">Maximum Age: {ageRange.max}</label>
              <input
                type="range"
                min="18"
                max="80"
                value={ageRange.max}
                onChange={(e) => handleRangeChange('max', e.target.value)}
                className="w-full h-2 bg-[var(--bg-tertiary)] rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, var(--accent-pink) 0%, var(--accent-pink) ${((ageRange.max - 18) / (80 - 18)) * 100}%, var(--bg-tertiary) ${((ageRange.max - 18) / (80 - 18)) * 100}%, var(--bg-tertiary) 100%)`
                }}
              />
              <div className="flex justify-between text-[var(--text-muted)] text-sm">
                <span>18</span>
                <span>80</span>
              </div>
            </div>

            {/* Info */}
            <div className="bg-[var(--accent-pink)]/10 border border-[var(--accent-pink)]/20 rounded-lg p-4">
              <p className="text-[var(--text-secondary)] text-sm">
                💡 Tip: A wider age range increases your chances of finding compatible matches, 
                but you can always adjust this later in your settings.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--accent-pink);
          cursor: pointer;
          border: 2px solid var(--bg-primary);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--accent-pink);
          cursor: pointer;
          border: 2px solid var(--bg-primary);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}