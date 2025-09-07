import React from 'react';
import { Slider } from '@mui/material';

const Step5 = ({ formData, setFormData, handleChange }) => (
  <div className="space-y-6 animate-fadeIn flex-1 relative z-10 overflow-y-auto scrollbar-hiden h-[50vh] ">
    <h2 className="text-2xl font-semibold text-white">🎯 Your Love Preferences 🎯</h2>
    <p className="text-text-muted text-center mb-6">Almost there! Set your preferences to find the perfect match 💕</p>
    
    <div>
      <label className="block mb-4 text-text-secondary">💘 Preferred Age Range</label>
      <div className="px-2">
        <Slider
            value={[formData.ageRange.start, formData.ageRange.end]}
            onChange={(event, newValue) => setFormData(prev => ({...prev, ageRange: { start: newValue[0], end: newValue[1] }}))}
            min={18}
            max={50}
            valueLabelDisplay="auto"
            sx={{
              color: 'var(--primary-pink)', // Custom color for the slider
              '& .MuiSlider-thumb': {
                backgroundColor: 'var(--primary-pink)', // Thumb color
              },
              '& .MuiSlider-track': {
                backgroundColor: 'var(--primary-pink)', // Track color
              },
              '& .MuiSlider-rail': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)', // Rail color
              },
            }}
        />
        <div className="flex justify-between text-sm text-text-muted mt-2">
            <span></span>
            <span className="text-pink-400 font-semibold">{formData.ageRange.start} - {formData.ageRange.end} years</span>
            <span></span>
        </div>
      </div>
    </div>
    
    <div className="space-y-4">
        <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg p-4 border border-pink-500/20">
          <h3 className="text-lg font-semibold text-white mb-4">🔮 Privacy & Visibility</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-text-secondary group-hover:text-white transition">💚 Show my online status</span>
                <input type="checkbox" name="showOnlineStatus" checked={formData.showOnlineStatus} onChange={handleChange} className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-text-secondary group-hover:text-white transition">📍 Show my distance to others</span>
                <input type="checkbox" name="showDistance" checked={formData.showDistance} onChange={handleChange} className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>
    </div>
    
    <div className="text-center">
      <p className="text-text-muted text-sm">🎉 You're all set! Ready to meet your soulmate? 🎉</p>
    </div>
  </div>
);

export default Step5;
