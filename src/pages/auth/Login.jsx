import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import ForgotOtpModal from './login/ForgotOtpModal';
import ForgetPassword from './login/ForgetPassword';
import ResetPassword from './login/resetPasswordModal';
import OtpModal from './login/OtpModal';
import SignUp from './login/SignUp';
import AuthToggle from './login/AuthToggle';
import Google from './login/Google';
import api from "../../api/axios"

import Cookies from 'js-cookie';

export default function Login() {
    const { fetchWithGoogle, setUser } = useAuth();
    const navigate = useNavigate();
    
    const [authMode, setAuthMode] = useState('login'); // 'login', 'signup'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [] });
    
    // Modal states
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [otp, setOtp] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [isNewAccount, setIsNewAccount] = useState(false);
    const [showForgotOtpModal, setShowForgotOtpModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

 



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Check password strength when password changes
        if (name === 'password') {
            checkPasswordStrength(value);
        }
    };

    const checkPasswordStrength = (password) => {
        const feedback = [];
        let score = 0;

        if (password.length >= 8) score++;
        else feedback.push('At least 8 characters');

        if (/[A-Z]/.test(password)) score++;
        else feedback.push('One uppercase letter');

        if (/[a-z]/.test(password)) score++;
        else feedback.push('One lowercase letter');

        if (/\d/.test(password)) score++;
        else feedback.push('One number');

        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score++;
        else feedback.push('One special character');

        setPasswordStrength({ score, feedback });
    };

    const handleSignUp = async () => {
        if (!formData.email || !formData.password) {
            toast.error('Please enter both email and password 💝');
            return;
        }

        if (authMode === 'signup' && formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match 💔');
            return;
        }

        if (authMode === 'signup' && passwordStrength.score < 4) {
            toast.error('Please create a stronger password 🔐');
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post('/auth/signup', {
                email: formData.email,
                password: formData.password
            });
            if (response.status) {
                 // New account
                setIsNewAccount(true);
                setShowOTPModal(true);
                toast.success('Welcome! Let\'s verify your email 📧');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            toast.error(`${error?.message} 💔`);
        } finally {
            setIsLoading(false);
        }
    };

    const verifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP 🔢');
            return;
        }
             setIsLoading(true);
        try {
            const response = await api.post('/auth/verify-otp', {
                email: formData.email,
                password: formData.password,
                otp: otp
            });

            if(response){
                setUser(response?.user)
                Cookies.set('token', response.token);
                window.location.href = '/feeds';
            }
        } catch (error) {
            console.error('OTP verification failed:', error);
           toast.error(`${error?.message} 💔`);
        }
        finally {
            setIsLoading(false);
        }
    };


      const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            toast.error('Please enter both email and password 💝');
            return;
        }
        setIsLoading(true);
        try {
            const response = await api.post('/auth/login', {
                email: formData.email,
                password: formData.password
            });
              if(response){
                setUser(response?.user)
                Cookies.set('token', response.token);
                window.location.href = '/feeds';
            }
        } catch (error) {
            console.error('OTP verification failed:', error);
            toast.error(`${error?.message} 💔`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        console.log("Resend OTP clicked");   
        if (!resetEmail) {
            toast.error('Please enter your email address 📧');
            return;
        }

        try {
            // const response = await fetch('/auth/forgot-password', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email: resetEmail })
            // });

            

            // const data = await response.json();

            // Starex fetched His first API
            const response = await api.post("/forgot-password", {
                email: resetEmail
            })
            console.log("Forgot password response:", response);

            if (response.status) {
            toast.success(response.message || 'OTP sent! 📧');
            setShowForgotPasswordModal(false);
            setShowForgotOtpModal(true);
        } else {
            toast.error(response.message || 'Email not found 💔');
        }
        } catch (error) {
            console.error('Forgot password failed:', error);
            toast.error('Failed to send reset email. Please try again 💔');
        }
    };

    // const handleVerifyForgotOtp = async () => {
    // if (!otp || otp.length !== 6) {
    //     toast.error('Please enter a valid 6-digit OTP 🔢');
    //     return;
    // }

    // setIsLoading(true);
    // try {
    //     const response = await api.post('/verify-forgot-password-otp', {
    //         email: resetEmail,
    //         otp
    //     });

    //     if (response.status) {
    //         toast.success(response.message || 'OTP verified! You can now reset your password 🔐');
    //         setShowForgotOtpModal(false);
    //         // You can now open another modal or navigate to a "Reset Password" page
    //     } else {
    //         toast.error(response.message || 'Invalid OTP 💔');
    //     }
    // } catch (error) {
    //     console.error('OTP verification failed:', error);

    //     if (response.status) {
    //         toast.success(response.message || 'OTP verified! You can now reset your password 🔐');
    //         setShowForgotOtpModal(false);
    //         // You can now open another modal or navigate to a "Reset Password" page
    //     } else {
    //         toast.error(response.message || 'Invalid OTP 💔');
    //     }
    // } catch (error) {
    //     console.error('OTP verification failed:', error);
    //     toast.error('Failed to verify OTP 💔');
    // } finally {
    //     setIsLoading(false);
    // }
    // };

    const handleVerifyForgotOtp = async () => {
    if (!otp || otp.length !== 6) {
        toast.error('Please enter a valid 6-digit OTP 🔢');
        return;
    }

    setIsLoading(true);
    try {
        // ✅ Send OTP verification request
        const response = await api.post('/verify-forgot-password-otp', {
            email: resetEmail,
            otp
        });

        // ✅ Check the right flag (backend might use success or status)
        if (response.status) {
            toast.success(response.message || 'OTP verified! You can now reset your password 🔐');
            setShowForgotOtpModal(false);
            setShowResetPasswordModal(true);
            // TODO: You can now open your Reset Password modal or navigate to reset page
        } else {
            toast.error(response.message || 'Invalid OTP 💔');
        }

    } catch (error) {
        console.error('OTP verification failed:', error);

        // ✅ Show more descriptive error if backend returns one
        toast.error(error?.response?.data?.message || 'Failed to verify OTP 💔');

    } finally {
        setIsLoading(false);
    }
};

// const fetchReferralCode = async () => {
//     try {
//         const response = await api.get(`/auth/user/${userId}/ref-code`);
//         if (response.status) {
//             setFormData((prevData) => ({
//                 ...prevData,
//                 referralCode: response.data.code || '',
//             }));
//         } else {
//             toast.error(response.message || 'Failed to fetch referral code 💔');
//         }
//     } catch (error) {
//         console.error('Failed to fetch referral code:', error);
//         toast.error('Failed to fetch referral code 💔');
//     }
// };

    const getPasswordStrengthColor = () => {
        if (passwordStrength.score <= 1) return 'text-red-400';
        if (passwordStrength.score <= 3) return 'text-yellow-400';
        return 'text-green-400';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength.score <= 1) return 'Weak 😟';
        if (passwordStrength.score <= 3) return 'Medium 😐';
        return 'Strong 😊';
    };

    const handleResetPassword = async (newPassword, confirmPassword) => {
        if (!newPassword || !confirmPassword) {
            toast.error("Please fill in both fields ⚠️");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match 💔");
            return;
        }

        setIsResetting(true);
        try {
            const response = await api.post("/reset-password", {
            email: resetEmail,
            newPassword,
            });

            if (response.status) {
                toast.success(response.message || "Password reset successfully ✅");
                setShowResetPasswordModal(false);
            } else {
                toast.error(response.message || "Failed to reset password 💔");
            }
        } catch (error) {
            console.error("Password reset failed:", error);
            toast.error(error?.message || "Something went wrong 💔");
        }
        finally{
            setIsResetting(false);
        }
    };


    return (
        <section className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] z-50 flex flex-col">
            
            <div className='relative w-screen flex h-screen justify-center items-center'>
      

            <div className="relative w-[100%] h-screen max-w-md z-10 flex flex-col items-center justify-center bg-[var(--bg-secondary)] bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-4 absolute top-3 left-3">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <ArrowLeft size={18} className="text-white" />
                    </button>
                </div>

                    <h1 className="text-3xl font-bold mb-2 text-gradient-primary">
                        {authMode === 'login' ? '💕 Welcome Back 💕' : '✨ Join Love Meet ✨'}
                    </h1>
                    <p className="text-md mb-6 text-[var(--text-secondary)] text-center">
                        {authMode === 'login' 
                            ? 'Sign in to continue your love journey' 
                            : 'Create your account and find your soulmate'}
                    </p>

                    {/* Auth Mode Toggle */}
                    <AuthToggle  authMode={authMode} setAuthMode={setAuthMode} />

                    {/* Email/Password Form */}
                    <div className="w-full space-y-4 mb-6">
                        <div>
                            <input
                                type="email"
                                name="email"
                                autoComplete=''
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="💌 Enter your email"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-pink-500 transition"
                            />
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="🔐 Enter your password"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-pink-500 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Password Strength Indicator (only for signup) */}
                        {authMode === 'signup' && formData.password && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-white/70">Password Strength:</span>
                                    <span className={`text-sm font-semibold ${getPasswordStrengthColor()}`}>
                                        {getPasswordStrengthText()}
                                    </span>
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1 flex-1 rounded ${
                                                i < passwordStrength.score ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-white/20'
                                            }`}
                                        />
                                    ))}
                                </div>
                                {passwordStrength.feedback.length > 0 && (
                                    <div className="text-xs text-white/60">
                                        Missing: {passwordStrength.feedback.join(', ')}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Confirm Password (only for signup) */}
                        {authMode === 'signup' && (
                            <SignUp showConfirmPassword={showConfirmPassword}
                            formData={formData} handleInputChange={handleInputChange} />
                        )}

                        {/* Forgot Password Link */}
                        {authMode === 'login' && (
                            <div className="text-right">
                                <button
                                    onClick={() => setShowForgotPasswordModal(true)}
                                    className="text-sm text-[var(--accent-pink)] hover:underline"
                                >
                                    Forgot password? 🤔
                                </button>
                            </div>
                        )}

                        {/* Email/Password Submit Button */}
                        {authMode === 'signup' && (

                        <button
                            onClick={handleSignUp}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 button-primary bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                                    {authMode === 'login' ? 'Signing In...' : 'Creating Account...'}
                                </>
                            ) : (
                                <>
                                    {authMode === 'login' ? '💕 Sign In' : '✨ Create Account'}
                                </>
                            )}
                        </button>
                        )}

                            {/* Email/Password Submit Button */}
                        {authMode === 'login' && (

                        <button
                            onClick={handleLogin}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 button-primary bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                                    {authMode === 'login' ? 'Signing In...' : 'Creating Account...'}
                                </>
                            ) : (
                                <>
                                    {authMode === 'login' ? '💕 Sign In' : '✨ Create Account'}
                                </>
                            )}
                        </button>
                        )}
                    </div>

                    {/* Divider */}

                     <Google authMode={authMode} fetchWithGoogle={fetchWithGoogle} />           

                </div>
            </div>

            {/* OTP Verification Modal */}
            {showOTPModal && (
                <OtpModal 
                    isNewAccount={isNewAccount}
                    otp={otp} setOtp={setOtp} setIsNewAccount={setIsNewAccount}
                    setShowOTPModal={setShowOTPModal} verifyOTP={verifyOTP}
                    isLoading={isLoading}
                />
            )}

            {/* Forgot Password Modal */}
            {showForgotPasswordModal && (
                <ForgetPassword 
                handleForgotPassword={handleForgotPassword}
                setShowForgotPasswordModal={setShowForgotPasswordModal}
                setResetEmail={setResetEmail}
                resetEmail={resetEmail}
             />
            )}

            {showForgotOtpModal && (
            <ForgotOtpModal
                otp={otp}
                setOtp={setOtp}
                handleForgotPassword={handleForgotPassword}
                setShowForgotOtpModal={setShowForgotOtpModal}
                handleVerifyForgotOtp={handleVerifyForgotOtp}
                isLoading={isLoading}
            />
            )}

            {showResetPasswordModal && (
            <ResetPassword
                resetEmail={resetEmail}
                handleResetPassword={handleResetPassword}
                setShowResetPasswordModal={setShowResetPasswordModal}
                isResetting={isResetting}
            />
            )}



        </section>
    );
}
