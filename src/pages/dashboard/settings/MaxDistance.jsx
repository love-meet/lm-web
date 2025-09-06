import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Save } from 'lucide-react';

export default function MaxDistance() {
  const navigate = useNavigate();
  const [distance, setDistance] = useState(50);
  const [unit, setUnit] = useState('km');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleSave = () => {
    // TODO: Implement API call to save distance and location preferences
    console.log('Saving preferences:', { distance, unit, location, city, country });
    navigate('/settings');
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
          <h1 className="text-white font-semibold text-lg">Location & Distance</h1>
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
        {/* Location Section */}
        <div className="bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-6">
          <div className="text-center">
            <MapPin size={48} className="text-[var(--accent-pink)] mx-auto mb-4" />
            <h2 className="text-white font-semibold text-xl mb-2">Your Location</h2>
            <p className="text-[var(--text-secondary)]">Let others know where you're located</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Current Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[var(--bg-tertiary)] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--accent-pink)] focus:outline-none transition-colors"
                placeholder="Enter your current location"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[var(--bg-tertiary)] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--accent-pink)] focus:outline-none transition-colors"
                  placeholder="Your city"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-[var(--bg-tertiary)] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--accent-pink)] focus:outline-none transition-colors"
                  placeholder="Your country"
                />
              </div>
            </div>

            <div className="bg-[var(--accent-pink)]/10 border border-[var(--accent-pink)]/20 rounded-lg p-4">
              <p className="text-[var(--text-secondary)] text-sm">
                📍 Your location helps us show you better matches in your area and helps others find you.
              </p>
            </div>
          </div>
        </div>

        {/* Distance Section */}
        <div className="bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-6">
          <div className="text-center">
            <MapPin size={48} className="text-[var(--primary-blue)] mx-auto mb-4" />
            <h2 className="text-white font-semibold text-xl mb-2">Maximum Distance Preference</h2>
            <p className="text-[var(--text-secondary)]">Choose how far you're willing to travel for a date</p>
          </div>

          <div className="space-y-6">
            {/* Current Distance Display */}
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--primary-blue)] mb-2">
                {distance} {unit}
              </div>
              <p className="text-[var(--text-secondary)]">maximum distance</p>
            </div>

            {/* Distance Slider */}
            <div className="space-y-3">
              <label className="block text-white font-medium">Distance: {distance} {unit}</label>
              <input
                type="range"
                min="1"
                max="500"
                value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value))}
                className="w-full h-2 bg-[var(--bg-tertiary)] rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, var(--primary-blue) 0%, var(--primary-blue) ${(distance / 500) * 100}%, var(--bg-tertiary) ${(distance / 500) * 100}%, var(--bg-tertiary) 100%)`
                }}
              />
              <div className="flex justify-between text-[var(--text-muted)] text-sm">
                <span>1 {unit}</span>
                <span>500 {unit}</span>
              </div>
            </div>

            {/* Unit Selection */}
            <div className="space-y-3">
              <label className="block text-white font-medium">Unit</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setUnit('km')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    unit === 'km'
                      ? 'bg-[var(--primary-blue)] text-white'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                >
                  Kilometers
                </button>
                <button
                  onClick={() => setUnit('miles')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    unit === 'miles'
                      ? 'bg-[var(--primary-blue)] text-white'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                >
                  Miles
                </button>
              </div>
            </div>

            {/* Preset Distances */}
            <div className="space-y-3">
              <label className="block text-white font-medium">Quick Select</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[10, 25, 50, 100].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setDistance(preset)}
                    className={`p-3 rounded-lg text-center transition-colors ${
                      distance === preset
                        ? 'bg-[var(--primary-blue)] text-white'
                        : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    {preset} {unit}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="bg-[var(--primary-blue)]/10 border border-[var(--primary-blue)]/20 rounded-lg p-4">
              <p className="text-[var(--text-secondary)] text-sm">
                🌍 Note: A larger distance range gives you more potential matches, 
                but remember to consider practical travel time for meetups.
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
          background: var(--primary-blue);
          cursor: pointer;
          border: 2px solid var(--bg-primary);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--primary-blue);
          cursor: pointer;
          border: 2px solid var(--bg-primary);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}