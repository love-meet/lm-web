import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Save, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { sendEmailResetOtp, resetEmailWithOtp } from '../../../api/admin';

export default function ChangeEmail() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  const [formData, setFormData] = useState({
    currentEmail: '',
    newEmail: '',
    confirmEmail: '',
    password: ''
  });

  // Update form data when user data is available
  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        currentEmail: user.email
      }));
    }
  }, [user]);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});
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
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.newEmail) {
      newErrors.newEmail = 'New email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.newEmail)) {
      newErrors.newEmail = 'Please enter a valid email address';
    }
    
    if (!formData.confirmEmail) {
      newErrors.confirmEmail = 'Please confirm your new email';
    } else if (formData.newEmail !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Email addresses do not match';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required to change email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (step === 1) {
      if (validateForm()) {
        setIsLoading(true);
        try {
          // Call admin API to send email reset OTP
          console.log('Sending OTP to:', formData.newEmail);
          const response = await sendEmailResetOtp(formData.currentEmail, formData.newEmail);
          console.log('Email reset OTP sent successfully:', response);
          
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
      // Verify OTP and change email
      const otpString = otp.join('');
      if (otpString.length === 6) {
        setIsLoading(true);
        try {
          // Call admin API to reset email with OTP
          console.log('Verifying OTP and changing email:', { currentEmail: formData.currentEmail, newEmail: formData.newEmail, otp: '***' });
          const response = await resetEmailWithOtp(formData.currentEmail, formData.newEmail, otpString);
          console.log('Email reset successfully:', response);
          
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
      // Call admin API to resend email reset OTP
      console.log('Resending OTP to:', formData.newEmail);
      const response = await sendEmailResetOtp(formData.currentEmail, formData.newEmail);
      console.log('Email reset OTP resent successfully:', response);
      
      setTimer(300);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--bg-primary)] overflow-y-auto">
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
            {step === 1 ? 'Change Email' : 'Verify Email'}
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
          // Step 1: Email Form
          <div className="bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-6">
          <div className="text-center">
            <Mail size={48} className="text-[var(--primary-indigo)] mx-auto mb-4" />
            <h2 className="text-white font-semibold text-xl mb-2">Change Your Email Address</h2>
            <p className="text-[var(--text-secondary)]">Update your email address for account notifications</p>
          </div>

          <div className="space-y-4">
            {/* Current Email */}
            <div>
              <label className="block text-[var(--text-secondary)] text-sm mb-2">Current Email</label>
              <input
                type="email"
                value={formData.currentEmail}
                disabled
                className="w-full bg-[var(--bg-tertiary)]/50 border border-white/10 rounded-lg px-4 py-3 text-[var(--text-muted)] cursor-not-allowed"
              />
            </div>

            {/* New Email */}
            <div>
              <label className="block text-[var(--text-secondary)] text-sm mb-2">New Email Address</label>
              <input
                type="email"
                name="newEmail"
                value={formData.newEmail}
                onChange={handleInputChange}
                className={`w-full bg-[var(--bg-tertiary)] border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                  errors.newEmail 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-white/10 focus:border-[var(--primary-indigo)]'
                }`}
                placeholder="Enter your new email address"
              />
              {errors.newEmail && (
                <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                  <AlertCircle size={14} />
                  <span>{errors.newEmail}</span>
                </p>
              )}
            </div>

            {/* Confirm Email */}
            <div>
              <label className="block text-[var(--text-secondary)] text-sm mb-2">Confirm New Email</label>
              <input
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleInputChange}
                className={`w-full bg-[var(--bg-tertiary)] border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                  errors.confirmEmail 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-white/10 focus:border-[var(--primary-indigo)]'
                }`}
                placeholder="Confirm your new email address"
              />
              {errors.confirmEmail && (
                <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                  <AlertCircle size={14} />
                  <span>{errors.confirmEmail}</span>
                </p>
              )}
            </div>

            {/* Password Confirmation */}
            <div>
              <label className="block text-[var(--text-secondary)] text-sm mb-2">Current Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full bg-[var(--bg-tertiary)] border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                  errors.password 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-white/10 focus:border-[var(--primary-indigo)]'
                }`}
                placeholder="Enter your current password"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                  <AlertCircle size={14} />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>
          </div>

          {/* Warning */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle size={20} className="text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-yellow-400 font-medium mb-1">Important Notice</h4>
                <p className="text-[var(--text-secondary)] text-sm">
                  After changing your email address, you'll need to verify the new email before you can use it for login. 
                  Make sure you have access to the new email address.
                </p>
              </div>
            </div>
          </div>
          </div>
        ) : (
          // Step 2: OTP Verification
          <div className="bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-6">
            <div className="text-center">
              <Shield size={48} className="text-[var(--primary-indigo)] mx-auto mb-4" />
              <h2 className="text-white font-semibold text-xl mb-2">Verify Your Email</h2>
              <p className="text-[var(--text-secondary)] mb-4">
                We've sent a 6-digit verification code to
              </p>
              <p className="text-[var(--primary-indigo)] font-medium">{formData.newEmail}</p>
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
                  ← Change email address
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="bg-[var(--primary-indigo)]/10 border border-[var(--primary-indigo)]/20 rounded-lg p-4">
              <p className="text-[var(--text-secondary)] text-sm text-center">
                🔐 Enter the verification code to confirm your new email address
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}