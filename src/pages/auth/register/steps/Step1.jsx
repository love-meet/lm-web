import React from 'react';

const Step1 = ({ formData, handleChange, usernameStatus, validationErrors }) => (
  <div className="space-y-4 animate-fadeIn">
    <h2 className="text-2xl font-semibold text-white">💫 Tell Us About You 💫</h2>
    <p className="text-text-muted text-center mb-6">Let's start with the basics - your future soulmate is waiting! 💖</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <input 
          type="text" 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
          placeholder="✨ First Name" 
          className={`input-styled ${validationErrors.firstName ? 'border-red-500' : ''}`} 
        />
        {validationErrors.firstName && <p className="text-red-400 text-sm mt-1">{validationErrors.firstName}</p>}
      </div>
      
      <div>
        <input 
          type="text" 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
          placeholder="✨ Last Name" 
          className={`input-styled ${validationErrors.lastName ? 'border-red-500' : ''}`} 
        />
        {validationErrors.lastName && <p className="text-red-400 text-sm mt-1">{validationErrors.lastName}</p>}
      </div>
    </div>
    
    <div>
        <div className="relative">
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            placeholder="💝 Choose your unique username" 
            className={`input-styled w-full ${validationErrors.username ? 'border-red-500' : usernameStatus === 'available' ? 'border-green-500' : usernameStatus === 'taken' ? 'border-red-500' : ''}`} 
          />
          {usernameStatus === 'checking' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full"></div>
            </div>
          )}
          {usernameStatus === 'available' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400">✓</div>
          )}
          {usernameStatus === 'taken' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400">✗</div>
          )}
        </div>
        {validationErrors.username ? (
          <p className="text-red-400 text-sm mt-1">{validationErrors.username}</p>
        ) : usernameStatus === 'available' ? (
          <p className="text-green-400 text-sm mt-1">Perfect! This username is available 💚</p>
        ) : usernameStatus === 'taken' ? (
          <p className="text-red-400 text-sm mt-1">Sorry, this username is taken. Try another! 💔</p>
        ) : null}
    </div>
  </div>
);

export default Step1;
