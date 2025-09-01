import React from 'react'

export default function OtpModal({isNewAccount, otp, setOtp,
     setIsNewAccount, setShowOTPModal, verifyOTP }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
                {isNewAccount ? '🎉 Almost There!' : '📧 Verify Your Email'}
            </h2>
            <p className="text-text-muted text-center mb-6">
                {isNewAccount 
                    ? 'We\'ve sent a verification code to your email. Enter it below to complete your account setup!'
                    : 'Enter the verification code sent to your email'
                }
            </p>
            
            <div className="space-y-4">
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-center text-lg tracking-wider placeholder-white/60 focus:outline-none focus:border-pink-500 transition"
                    maxLength={6}
                />
                
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setShowOTPModal(false);
                            setOtp('');
                            setIsNewAccount(false);
                        }}
                        className="flex-1 py-3 px-4 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={verifyOTP}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white hover:from-green-600 hover:to-blue-600 transition"
                    >
                        Verify 🎯
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
