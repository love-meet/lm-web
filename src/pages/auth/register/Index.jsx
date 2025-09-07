import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from "../../../api/axios";
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import { useAuth } from '../../../context/AuthContext';


// Main Register Component
export default function Register() {
  const { user, setUser } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    bio: '',
    hobbies: [],
    interests: [],
    showOnlineStatus: true,
    showDistance: true,
    ageRange: { start: 18, end: 35 },
  });
  const [loadSubmit, setLoadSubmit] = useState(false)
  const [usernameStatus, setUsernameStatus] = useState(null); // null, 'checking', 'available', 'taken'
  const [validationErrors, setValidationErrors] = useState({});

  const totalSteps = 5;

  const checkUsername = async (username) => {
    if (!username.trim()) {
      setUsernameStatus(null);
      return;
    }

    setUsernameStatus('checking');
    try {
      const response = await api.get(`/auth/user/check-username/${username}`);
      setUsernameStatus(response?.status);
    } catch (error) {
        console.error('Username check failed:', error);
        setUsernameStatus(null); 
    }
  };


  const getValidationErrors = (currentStep) => {
    const errors = {};
    switch (currentStep) {
      case 1:
        if (!formData.firstName.trim()) errors.firstName = 'First name is required 💕';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required 💕';
        if (!formData.username.trim()) errors.username = 'Username is required 💕';
        if (usernameStatus === 'taken') {
          errors.username = 'This username is already taken 💔';
        } else if (usernameStatus === 'checking') {
          errors.username = 'Please wait while we check the username ⏳';
        } else if (usernameStatus !== 'available') {
          errors.username = 'Please choose an available username 💚';
        }
        break;
      case 2:
        if (!formData.country) errors.location = 'Please select your country 🌍';
        if (!formData.state) errors.location = 'Please select your state 🌍';
        if (!formData.city) errors.location = 'Please select your city 🌍';
        break;
      case 3:
        if (!formData.gender) errors.gender = 'Please select your gender 💫';
        if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) {
          errors.dob = 'Please enter your complete date of birth 🎂';
        } else {
          const age = new Date().getFullYear() - parseInt(formData.dobYear);
          if (age < 18) errors.dob = 'You must be at least 18 years old 🔞';
          if (age > 50) errors.dob = 'Age must be 50 or under 💝';
        }
        break;
      case 4:
        if (!formData.bio.trim()) errors.bio = 'Tell us about yourself! 📝';
        if (formData.hobbies.length < 3) errors.hobbies = 'Add at least 3 hobbies to help find your match! 🎯';
        if (formData.interests.length < 1) errors.interests = 'Add at least 3 interests to connect with like-minded people! 💖';
        break;
      case 5:
        // No validation needed for preferences
        break;
    }
    return errors;
  };

  const validateStep = (currentStep) => {
    const errors = getValidationErrors(currentStep);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isStepValid = (currentStep) => {
    const errors = getValidationErrors(currentStep);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast.error('Please complete all required fields before continuing 💝');
    }
  };
  
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'username') {
      setUsernameStatus(null);
    }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    const username = formData.username.trim();
    if (username.length > 2) {
      const timeoutId = setTimeout(() => checkUsername(username), 500);
      return () => clearTimeout(timeoutId);
    } else {
      setUsernameStatus(null);
    }
  }, [formData.username]);

  const handleRegister = async() => {
    setLoadSubmit(true)
    try{
      const response = await api.post('/auth/register', formData);
      if(response.status){
        setUser(response?.user)
        toast.success(response?.message)
      }
    }
    catch(error){
      console.error('Registration failed:', error);
      toast.error(`${error?.message} 💔`);
    }
    finally{
      setLoadSubmit(false)
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const renderStep = () => {
    const steps = [
      <Step1 key="step1" formData={formData} handleChange={handleChange} usernameStatus={usernameStatus} validationErrors={validationErrors} />,
      <Step2 key="step2" formData={formData} setFormData={setFormData} />,
      <Step3 key="step3" formData={formData} setFormData={setFormData} handleChange={handleChange} validationErrors={validationErrors} />,
      <Step4 key="step4" formData={formData} setFormData={setFormData} validationErrors={validationErrors} />,
      <Step5 key="step5" formData={formData} setFormData={setFormData} handleChange={handleChange} />
    ];
    return steps[step - 1] || <Step1 formData={formData} handleChange={handleChange} />;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center fixed top-0 left-0 right-0 z-9989  inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] overflow-hidden ">
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="bg-black/30 backdrop-blur-xl w-screen h-screen rounded-2xl shadow-2xl p-4 border border-white/10">
          <h1 className="text-3xl font-bold text-center mb-2 text-gradient-accent">💕 Join Love Meet 💕</h1>
          <p className="text-center text-text-muted mb-6">✨ Create your magical profile and let love find you! ✨</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-8">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          </div>

          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={handleBack} 
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-2 rounded-full text-white bg-white/10 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-white/20"
            >
              <FaChevronLeft /> Back
            </button>
            {step < totalSteps ? (
              <button onClick={handleNext} className="flex items-center gap-2 px-6 py-2 rounded-full text-white button-primary">
                Next <FaChevronRight />
              </button>
            ) : (
              <button 
                onClick={handleRegister} 
                disabled={!isStepValid(5)}
                className="px-2 py-4 rounded-full text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                💕 Find My Soulmate 💕
              </button>
            )}
            
            {/* Validation Errors */}
            {Object.keys(validationErrors).length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <div className="text-red-300 text-sm space-y-1">
                  {Object.values(validationErrors).map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}




