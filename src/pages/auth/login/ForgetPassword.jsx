import React from 'react'


export default function ForgetPassword({ setResetEmail,
     resetEmail, setShowForgotPasswordModal, handleForgotPassword
     }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">🔒 Reset Password</h2>
            <p className="text-text-muted text-center mb-6">
                Enter your Email and we'll send an OTP to reset your Password
            </p>
            
            <div className="space-y-4">
                <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="📧 Enter your email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-pink-500 transition"
                />
                
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setShowForgotPasswordModal(false);
                            setResetEmail('');
                        }}
                        className="flex-1 py-3 px-4 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleForgotPassword}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white hover:from-pink-600 hover:to-purple-600 transition"
                    >
                        Send OTP
                    </button>
                 </div>
                 
            </div>
        </div>
    </div>
)}
