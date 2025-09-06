import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Save, Eye, EyeOff, AlertCircle, Check, Shield } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function ChangePassword() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  // Timer effect for OTP expiration
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => {
          if (timer <= 1) {
            setCanResend(true);
            return 0;
          }
          return timer - 1;
        });
      }, 1000);
    } else if (step === 1) {
      setCanResend(false);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // OTP input handlers
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
    
    // Clear error when user starts typing
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: '' }));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const passwordRequirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /[A-Z]/, text: 'One uppercase letter' },
    { regex: /[a-z]/, text: 'One lowercase letter' },
    { regex: /\d/, text: 'One number' },
    { regex: /[^\w\s]/, text: 'One special character' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Calculate password strength for new password
    if (name === 'newPassword') {
      const strength = passwordRequirements.reduce((acc, req) => {
        return acc + (req.regex.test(value) ? 1 : 0);
      }, 0);
      setPasswordStrength(strength);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordStrength < 5) {
      newErrors.newPassword = 'Password does not meet all requirements';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (step === 1) {
      if (validateForm()) {
        setIsLoading(true);
        try {
          // TODO: Implement API call to send OTP to user's email
          console.log('Sending OTP to:', user?.email);
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          setStep(2);
          setTimer(300);
          setCanResend(false);
        } catch (error) {
          console.error('Failed to send OTP:', error);
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      // Verify OTP and change password
      const otpString = otp.join('');
      if (otpString.length === 6) {
        setIsLoading(true);
        try {
          // TODO: Implement API call to verify OTP and change password
          console.log('Verifying OTP and changing password:', { ...formData, otp: otpString });
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          navigate('/settings');
        } catch (error) {
          console.error('Failed to verify OTP:', error);
          setErrors({ otp: 'Invalid OTP. Please try again.' });
        } finally {
          setIsLoading(false);
        }
      } else {
        setErrors({ otp: 'Please enter the complete 6-digit OTP' });
      }
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to resend OTP
      console.log('Resending OTP to:', user?.email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTimer(300);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength < 2) return 'bg-red-500';
    if (passwordStrength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength < 2) return 'Weak';
    if (passwordStrength < 4) return 'Medium';
    return 'Strong';
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
          <h1 className="text-white font-semibold text-lg">
            {step === 1 ? 'Change Password' : 'Verify Identity'}
          </h1>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-[var(--primary-indigo)] hover:bg-[var(--primary-indigo)]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Save size={16} />
            <span>{isLoading ? 'Processing...' : (step === 1 ? 'Send OTP' : 'Verify')}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {step === 1 ? (
          // Step 1: Password Form
          <div className="bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-6">
          <div className="text-center">
            <Lock size={48} className="text-[var(--primary-indigo)] mx-auto mb-4" />
            <h2 className="text-white font-semibold text-xl mb-2">Change Your Password</h2>
            <p className="text-[var(--text-secondary)]">Keep your account secure with a strong password</p>
          </div>

          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-[var(--text-secondary)] text-sm mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className={`w-full bg-[var(--bg-tertiary)] border rounded-lg px-4 py-3 pr-12 text-white focus:outline-none transition-colors ${
                    errors.currentPassword 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-white/10 focus:border-[var(--primary-indigo)]'
                  }`}
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] hover:text-white transition-colors"
                >
                  {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                  <AlertCircle size={14} />
                  <span>{errors.currentPassword}</span>
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-[var(--text-secondary)] text-sm mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={`w-full bg-[var(--bg-tertiary)] border rounded-lg px-4 py-3 pr-12 text-white focus:outline-none transition-colors ${
                    errors.newPassword 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-white/10 focus:border-[var(--primary-indigo)]'
                  }`}
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] hover:text-white transition-colors"
                >
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password Strength */}
              {formData.newPassword && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[var(--text-secondary)] text-sm">Password Strength</span>
                    <span className={`text-sm font-medium ${
                      passwordStrength < 2 ? 'text-red-400' :
                      passwordStrength < 4 ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-[var(--bg-tertiary)] rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              
              {errors.newPassword && (
                <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                  <AlertCircle size={14} />
                  <span>{errors.newPassword}</span>
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[var(--text-secondary)] text-sm mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full bg-[var(--bg-tertiary)] border rounded-lg px-4 py-3 pr-12 text-white focus:outline-none transition-colors ${
                    errors.confirmPassword 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-white/10 focus:border-[var(--primary-indigo)]'
                  }`}
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] hover:text-white transition-colors"
                >
                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                  <AlertCircle size={14} />
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-[var(--bg-tertiary)]/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Password Requirements</h4>
            <div className="space-y-2">
              {passwordRequirements.map((requirement, index) => {
                const isMet = requirement.regex.test(formData.newPassword);
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      isMet ? 'bg-green-500' : 'bg-[var(--bg-secondary)] border border-white/20'
                    }`}>
                      {isMet && <Check size={10} className="text-white" />}
                    </div>
                    <span className={`text-sm ${
                      isMet ? 'text-green-400' : 'text-[var(--text-muted)]'
                    }`}>
                      {requirement.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          </div>
        ) : (
          // Step 2: OTP Verification
          <div className="bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-6">
            <div className="text-center">
              <Shield size={48} className="text-[var(--primary-indigo)] mx-auto mb-4" />
              <h2 className="text-white font-semibold text-xl mb-2">Verify Your Identity</h2>
              <p className="text-[var(--text-secondary)] mb-4">
                We've sent a 6-digit verification code to
              </p>
              <p className="text-[var(--primary-indigo)] font-medium">{user?.email}</p>
            </div>

            <div className="space-y-6">
              {/* OTP Input */}
              <div>
                <label className="block text-[var(--text-secondary)] text-sm mb-4 text-center">
                  Enter the 6-digit verification code
                </label>
                <div className="flex justify-center space-x-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-bold bg-[var(--bg-tertiary)] border border-white/10 rounded-lg text-white focus:border-[var(--primary-indigo)] focus:outline-none transition-colors"
                      maxLength={1}
                    />
                  ))}
                </div>
                {errors.otp && (
                  <p className="text-red-400 text-sm mt-2 text-center flex items-center justify-center space-x-1">
                    <AlertCircle size={14} />
                    <span>{errors.otp}</span>
                  </p>
                )}
              </div>

              {/* Timer and Resend */}
              <div className="text-center space-y-3">
                {timer > 0 ? (
                  <p className="text-[var(--text-secondary)] text-sm">
                    Code expires in <span className="text-[var(--primary-indigo)] font-medium">{formatTime(timer)}</span>
                  </p>
                ) : (
                  <p className="text-red-400 text-sm">Code has expired</p>
                )}
                
                <button
                  onClick={handleResendOtp}
                  disabled={!canResend || isLoading}
                  className="text-[var(--primary-indigo)] hover:text-[var(--primary-cyan)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm underline"
                >
                  {isLoading ? 'Sending...' : 'Resend Code'}
                </button>
              </div>

              {/* Back to Form */}
              <div className="text-center">
                <button
                  onClick={() => setStep(1)}
                  className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm"
                >
                  ← Back to password form
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="bg-[var(--primary-indigo)]/10 border border-[var(--primary-indigo)]/20 rounded-lg p-4">
              <p className="text-[var(--text-secondary)] text-sm text-center">
                🔒 For security, we need to verify your identity before changing your password
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}