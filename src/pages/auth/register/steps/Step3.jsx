import React from 'react';

const Step3 = ({ formData, setFormData, handleChange, validationErrors }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 33 }, (_, i) => currentYear - 18 - i);

  // This function automatically creates dateOfBirth when all fields are selected
  const handleDobChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Construct dateOfBirth in YYYY-MM-DD format
      if (updated.dobDay && updated.dobMonth && updated.dobYear) {
        const dateOfBirth = `${updated.dobYear}-${String(updated.dobMonth).padStart(2, '0')}-${String(updated.dobDay).padStart(2, '0')}`;
        return { ...updated, dateOfBirth };
      }
      
      return updated;
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-white">💫 Personal Details 💫</h2>
      <p className="text-text-muted text-center mb-6">Help us understand you better so we can find your perfect match! 🎯</p>
      
      <div>
        <label className="block mb-2 text-text-secondary">🌟 Gender</label>
        <div className="flex gap-4">
          {[
            { value: 'Man', emoji: '🙋‍♂️' }, 
            { value: 'Woman', emoji: '🙋‍♀️' }, 
            { value: 'Other', emoji: '🌈' }
          ].map(({ value, emoji }) => (
            <button 
              key={value} 
              onClick={() => handleChange({ target: { name: 'gender', value }})} 
              className={`px-6 py-2 rounded-full transition flex items-center gap-2 ${formData.gender === value ? 'button-primary' : 'bg-white/10 hover:bg-white/20'}`}
            >
              {emoji} {value}
            </button>
          ))}
        </div>
        {validationErrors.gender && <p className="text-red-400 text-sm mt-1">{validationErrors.gender}</p>}
      </div>
      
      <div>
        <label className="block mb-2 text-text-secondary">🎂 Date of Birth (Ages 18-50)</label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <select 
              name="dobDay" 
              value={formData.dobDay} 
              onChange={(e) => handleDobChange('dobDay', e.target.value)}
              className={`input-styled ${(validationErrors.dob || validationErrors.dateOfBirth) ? 'border-red-500' : ''}`}
            >
              <option value="">Day</option>
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select 
              name="dobMonth" 
              value={formData.dobMonth} 
              onChange={(e) => handleDobChange('dobMonth', e.target.value)}
              className={`input-styled ${(validationErrors.dob || validationErrors.dateOfBirth) ? 'border-red-500' : ''}`}
            >
              <option value="">Month</option>
              {months.map((month, index) => (
                <option key={month} value={index + 1}>{month}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select 
              name="dobYear" 
              value={formData.dobYear} 
              onChange={(e) => handleDobChange('dobYear', e.target.value)}
              className={`input-styled ${(validationErrors.dob || validationErrors.dateOfBirth) ? 'border-red-500' : ''}`}
            >
              <option value="">Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        {(validationErrors.dob || validationErrors.dateOfBirth) && (
          <p className="text-red-400 text-sm mt-1">
            {validationErrors.dob || validationErrors.dateOfBirth}
          </p>
        )}
      </div>
    </div>
  );
};

export default Step3;