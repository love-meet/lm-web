import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaUser, 
  FaEnvelope, 
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCheck,
  FaSpinner
} from 'react-icons/fa';

const CreateAffiliate = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    occupation: '',
    motivation: '',
    bankName: '',
    accountNumber: '',
    accountName: '',
    agreedToTerms: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    if (!formData.motivation) newErrors.motivation = 'Motivation is required';
    if (!formData.bankName) newErrors.bankName = 'Bank name is required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!formData.accountName) newErrors.accountName = 'Account name is required';
    if (!formData.agreedToTerms) newErrors.agreedToTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Affiliate application submitted successfully! You will receive an email confirmation within 24 hours.');
      navigate('/affiliate/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] text-white z-50 flex flex-col">
      {/* Header */}
      <div className="relative z-10 bg-[var(--bg-primary)]/90 backdrop-blur-lg border-b border-white/10 p-4 flex items-center flex-shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <FaArrowLeft className="text-white" />
        </button>
        <h1 className="text-xl font-bold ml-4">Become an Affiliate</h1>
      </div>

      {/* Scrollable Body */}
      <div className="overflow-y-auto p-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-6">
              
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[var(--primary-cyan)]">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-gray-800 border ${errors.firstName ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:border-[var(--primary-cyan)] focus:outline-none`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-gray-800 border ${errors.lastName ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:border-[var(--primary-cyan)] focus:outline-none`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:border-[var(--primary-cyan)] focus:outline-none`}
                      placeholder="Enter email address"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-gray-800 border ${errors.phone ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:border-[var(--primary-cyan)] focus:outline-none`}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>
              
              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[var(--primary-cyan)]">Address</h3>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-gray-800 border ${errors.address ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:border-[var(--primary-cyan)] focus:outline-none`}
                    placeholder="Enter street address"
                  />
                  {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-gray-800 border ${errors.city ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:border-[var(--primary-cyan)] focus:outline-none`}
                      placeholder="City"
                    />
                    {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 border border-white/20 rounded-lg text-white focus:border-[var(--primary-cyan)] focus:outline-none"
                      placeholder="State"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 border border-white/20 rounded-lg text-white focus:border-[var(--primary-cyan)] focus:outline-none"
                    >
                      <option value="">Select Country</option>
                      <option value="NG">Nigeria</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Professional Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[var(--primary-cyan)]">Professional Information</h3>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Occupation *</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-gray-800 border ${errors.occupation ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:border-[var(--primary-cyan)] focus:outline-none`}
                    placeholder="e.g., Marketing Specialist, Student, Entrepreneur"
                  />
                  {errors.occupation && <p className="text-red-400 text-sm mt-1">{errors.occupation}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Why do you want to become an affiliate? *</label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-gray-800 border ${errors.motivation ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:border-[var(--primary-cyan)] focus:outline-none resize-none`}
                    rows="4"
                    placeholder="Tell us about your motivation..."
                  />
                  {errors.motivation && <p className="text-red-400 text-sm mt-1">{errors.motivation}</p>}
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[var(--primary-cyan)]">Payment Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Bank Name *</label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-gray-800 border ${errors.bankName ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:border-[var(--primary-cyan)] focus:outline-none`}
                      placeholder="Enter bank name"
                    />
                    {errors.bankName && <p className="text-red-400 text-sm mt-1">{errors.bankName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Account Name *</label>
                    <input
                      type="text"
                      name="accountName"
                      value={formData.accountName}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-gray-800 border ${errors.accountName ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:border-[var(--primary-cyan)] focus:outline-none`}
                      placeholder="Account holder name"
                    />
                    {errors.accountName && <p className="text-red-400 text-sm mt-1">{errors.accountName}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Account Number *</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-gray-800 border ${errors.accountNumber ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:border-[var(--primary-cyan)] focus:outline-none`}
                    placeholder="Enter account number"
                  />
                  {errors.accountNumber && <p className="text-red-400 text-sm mt-1">{errors.accountNumber}</p>}
                </div>
              </div>
              
              {/* Agreement */}
              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleInputChange}
                    className={`mt-1 text-[var(--primary-cyan)] focus:ring-[var(--primary-cyan)] ${errors.agreedToTerms ? 'border-red-500' : ''}`}
                  />
                  <span className="text-sm">
                    I agree to the <a href="/terms" className="text-[var(--primary-cyan)] hover:underline" target="_blank">Terms and Conditions</a> of the affiliate program *
                  </span>
                </label>
                {errors.agreedToTerms && <p className="text-red-400 text-sm">{errors.agreedToTerms}</p>}
              </div>
              
              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--accent-pink)] text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      <span>Submit Affiliate Application</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-400">
                <p>Your application will be reviewed within 24-48 hours.</p>
                <p>You'll receive an email notification once approved.</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAffiliate;