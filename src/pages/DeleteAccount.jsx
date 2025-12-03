import React, { useState } from 'react';
import api from '../api/axios';

const OtpModal = ({ onVerify, onResend, onClose, loading }) => {
  const [otp, setOtp] = useState('');

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: 'var(--bg-secondary)', padding: '25px', borderRadius: 'var(--border-radius-lg)', width: '400px', boxShadow: 'var(--box-shadow-glow)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h2 style={{ color: 'var(--text-primary)', textAlign: 'center', marginBottom: '15px' }}>Enter OTP</h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '25px' }}>An OTP has been sent to your email. Please enter it below to proceed.</p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="6-digit OTP"
          maxLength="6"
          className="input-styled"
          style={{ textAlign: 'center', fontSize: '1.5em', letterSpacing: '0.2em', marginBottom: '25px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <button onClick={() => onVerify(otp)} className="button-primary" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
          <button onClick={onResend} className="button-secondary">Resend OTP</button>
          <button onClick={onClose} style={{background: 'var(--color-gray-700)', color: 'var(--text-primary)', padding: 'var(--spacing-sm) var(--spacing-lg)', borderRadius: 'var(--border-radius)', border: 'none'}}>Close</button>
        </div>
      </div>
    </div>
  );
};

const UserInfoDisplay = ({ user, onDelete, loading }) => {
    const calculateAge = (dob) => {
        if (!dob) return 'N/A';
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
      <div style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', padding: '20px', borderRadius: 'var(--border-radius-lg)', marginTop: '20px', width: '400px', boxShadow: 'var(--box-shadow)', textAlign: 'left', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--text-accent)', marginBottom: '20px' }}>User Information</h2>
        <div style={{ lineHeight: '1.8' }}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Age:</strong> {calculateAge(user.dateOfBirth)}</p>
            <p><strong>Country:</strong> {user.country}</p>
            <p><strong>State:</strong> {user.state}</p>
            <p><strong>City:</strong> {user.city}</p>
            <p><strong>Bio:</strong> {user.bio}</p>
        </div>
        <button onClick={onDelete} className="bg-gradient-red" style={{ width: '100%', padding: '12px', color: 'white', border: 'none', borderRadius: 'var(--border-radius)', cursor: 'pointer', marginTop: '20px', fontSize: '1em' }} disabled={loading}>
          {loading ? 'Deleting...' : 'Confirm Deletion'}
        </button>
      </div>
    );
};

const DeleteAccount = () => {
  const [email, setEmail] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [deleteToken, setDeleteToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProceed = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/request-delete-account', { email });
      setShowOtpModal(true);
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please check the email and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/confirm-delete-account', { email, otp });
      const { status, user, deleteToken, message } = response;

      if (status) {
        setUserInfo(user);
        setDeleteToken(deleteToken);
        setShowUserInfo(true);
        setShowOtpModal(false);
      } else {
        setError(message || 'Invalid OTP or failed to fetch user data.');
        alert(message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred.';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
        await api.post('/request-delete-account', { email });
        alert('A new OTP has been sent to your email.');
    } catch (error) {
        alert('Failed to resend OTP. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    setError('');
    console.log({userId: userInfo.userId, deleteToken} )
    try {
        const response = await api.post('/delete-account', { userId: userInfo.userId, deleteToken });
        alert('Account deleted successfully.');
        // Reset state
        setEmail('');
        setShowUserInfo(false);
        setUserInfo(null);
        setDeleteToken('');
    } catch (error) {
        const errorMessage = error.message || 'Failed to delete account. Please try again.';
        setError(errorMessage);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--gradient-bg-primary)' }}>
      <div className="card" style={{ padding: '40px', textAlign: 'center', maxWidth: '450px', width: '100%' }}>
        <h2 className="text-gradient-accent" style={{fontSize: 'var(--font-size-xl)', marginBottom: '15px'}}>Delete Your Account</h2>
        {error && <p style={{ color: 'var(--accent-pink)', marginTop: '10px' }}>{error}</p>}
        {!showUserInfo ? (
          <form onSubmit={handleProceed}>
            <p style={{color: 'var(--text-muted)', margin: '15px 0 25px'}}>We're sorry to see you go. Please enter your email to confirm account deletion.</p>
            <div style={{ margin: '20px 0' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-styled"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="button-primary" style={{width: '100%', background: 'var(--gradient-accent)'}}>
              {loading ? 'Sending...' : 'Proceed'}
            </button>
          </form>
        ) : (
          <UserInfoDisplay user={userInfo} onDelete={handleDeleteAccount} loading={loading} />
        )}
      </div>

      {showOtpModal && (
        <OtpModal
          onVerify={handleVerifyOtp}
          onResend={handleResendOtp}
          onClose={() => setShowOtpModal(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default DeleteAccount;