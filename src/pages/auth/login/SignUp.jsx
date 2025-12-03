import React from 'react'
import { ArrowLeft, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

export default function SignUp({showConfirmPassword, formData, handleInputChange }) {
  return (
    <div className="relative">
        <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="🔐 Confirm your password"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-pink-500 transition"
        />
        <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
        >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        {formData.confirmPassword && (
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                {formData.password === formData.confirmPassword ? (
                    <CheckCircle size={16} className="text-green-400" />
                ) : (
                    <XCircle size={16} className="text-red-400" />
                )}
            </div>
        )}
        <input
        type = "text"
        name = "referralCode"
        value = {formData.referralCode}
        onChange = {handleInputChange}
        placeholder = "🎁 Referral Code (Optional)"
        className = "w-full mt-4 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-pink-500 transition"
        />
    </div>
  )
}
