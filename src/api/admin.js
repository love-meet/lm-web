import api from './axios';

/**
 * Admin API Service Functions
 * Handles all admin-related API calls with comprehensive logging
 */

// Helper function to get the correct user ID for API calls
const getUserId = (user) => {
  const userId = user?.userId || user?.id || user?._id;
  
  console.log('🔍 Admin User ID Resolution:', {
    available_ids: {
      userId: user?.userId,
      id: user?.id, 
      _id: user?._id
    },
    selected_id: userId,
    id_type: user?.userId ? 'userId' : user?.id ? 'id' : '_id'
  });
  
  return userId;
};

// ==================== GET ENDPOINTS ====================

/**
 * Get all users with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 */
export const getAllUsers = async (page = 1, limit = 10) => {
  try {
    console.log('📡 Admin API: Getting all users', { page, limit });
    const response = await api.get(`/admin/get-all-users?page=${page}&limit=${limit}`);
    console.log('✅ Admin API Response - Get All Users:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Get All Users:', error);
    throw error;
  }
};

/**
 * Get active users with filters
 * @param {string} username - Filter by username
 * @param {string} country - Filter by country
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 */
export const getActiveUsers = async (username = '', country = '', page = 1, limit = 10) => {
  try {
    const params = new URLSearchParams();
    if (username) params.append('username', username);
    if (country) params.append('country', country);
    params.append('page', page);
    params.append('limit', limit);
    
    console.log('📡 Admin API: Getting active users', { username, country, page, limit });
    const response = await api.get(`/admin/get-active-users?${params.toString()}`);
    console.log('✅ Admin API Response - Get Active Users:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Get Active Users:', error);
    throw error;
  }
};

/**
 * Get user by ID
 * @param {string} userId - User ID
 */
export const getUserById = async (userId) => {
  try {
    console.log('📡 Admin API: Getting user by ID', { userId });
    const response = await api.get(`/admin/get-usersById/${userId}`);
    console.log('✅ Admin API Response - Get User By ID:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Get User By ID:', error);
    throw error;
  }
};

/**
 * Get user affiliates
 * @param {string} userId - User ID
 */
export const getUserAffiliates = async (userId) => {
  try {
    console.log('📡 Admin API: Getting user affiliates', { userId });
    const response = await api.get(`/admin/user-affiliates/${userId}`);
    console.log('✅ Admin API Response - Get User Affiliates:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Get User Affiliates:', error);
    throw error;
  }
};

/**
 * Get user referrals
 * @param {string} userId - User ID
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 */
export const getUserReferrals = async (userId, page = 1, limit = 10) => {
  try {
    console.log('📡 Admin API: Getting user referrals', { userId, page, limit });
    const response = await api.get(`/admin/user-referrals/${userId}?page=${page}&limit=${limit}`);
    console.log('✅ Admin API Response - Get User Referrals:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Get User Referrals:', error);
    throw error;
  }
};

/**
 * Get users by age range
 * @param {number} minAge - Minimum age
 * @param {number} maxAge - Maximum age
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 */
export const getUsersByAgeRange = async (minAge, maxAge, page = 1, limit = 10) => {
  try {
    const params = new URLSearchParams();
    params.append('minAge', minAge);
    params.append('maxAge', maxAge);
    params.append('page', page);
    params.append('limit', limit);
    
    console.log('📡 Admin API: Getting users by age range', { minAge, maxAge, page, limit });
    const response = await api.get(`/admin/users-by-age-range?${params.toString()}`);
    console.log('✅ Admin API Response - Get Users By Age Range:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Get Users By Age Range:', error);
    throw error;
  }
};

/**
 * Get user profile from feed
 * @param {string} userId - User ID
 * @param {string} feedType - Type of feed
 */
export const getUserProfileFromFeed = async (userId, feedType = 'all') => {
  try {
    console.log('📡 Admin API: Getting user profile from feed', { userId, feedType });
    const response = await api.get(`/admin/user-profile-from-feed?userId=${userId}&feedType=${feedType}`);
    console.log('✅ Admin API Response - Get User Profile From Feed:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Get User Profile From Feed:', error);
    throw error;
  }
};

/**
 * Get new match alert
 * @param {string} userId - User ID
 * @param {string} alertType - Type of alert
 */
export const getNewMatchAlert = async (userId, alertType = 'all') => {
  try {
    console.log('📡 Admin API: Getting new match alert', { userId, alertType });
    const response = await api.get(`/admin/new-match-alert?userId=${userId}&alertType=${alertType}`);
    console.log('✅ Admin API Response - Get New Match Alert:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Get New Match Alert:', error);
    throw error;
  }
};

// ==================== POST ENDPOINTS ====================

/**
 * Create a new user
 * @param {Object} userData - User data object
 */
export const createUser = async (userData) => {
  try {
    console.log('📡 Admin API: Creating new user', userData);
    const response = await api.post('/admin/create-user', userData);
    console.log('✅ Admin API Response - Create User:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Create User:', error);
    throw error;
  }
};

/**
 * Send password reset OTP
 * @param {string} email - User email
 */
export const sendPasswordResetOtp = async (email) => {
  try {
    console.log('📡 Admin API: Sending password reset OTP', { email });
    const response = await api.post('/admin/send-password-reset-otp', { email });
    console.log('✅ Admin API Response - Send Password Reset OTP:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Send Password Reset OTP:', error);
    throw error;
  }
};

/**
 * Reset password with OTP
 * @param {string} email - User email
 * @param {string} otp - OTP code
 * @param {string} newPassword - New password
 */
export const resetPasswordWithOtp = async (email, otp, newPassword) => {
  try {
    console.log('📡 Admin API: Resetting password with OTP', { email, otp: '***' });
    const response = await api.post('/admin/reset-password-with-otp', {
      email,
      otp,
      newPassword
    });
    console.log('✅ Admin API Response - Reset Password With OTP:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Reset Password With OTP:', error);
    throw error;
  }
};

/**
 * Send email reset OTP
 * @param {string} currentEmail - Current email
 * @param {string} newEmail - New email
 */
export const sendEmailResetOtp = async (currentEmail, newEmail) => {
  try {
    console.log('📡 Admin API: Sending email reset OTP', { currentEmail, newEmail });
    const response = await api.post('/admin/send-email-reset-otp', {
      currentEmail,
      newEmail
    });
    console.log('✅ Admin API Response - Send Email Reset OTP:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Send Email Reset OTP:', error);
    throw error;
  }
};

/**
 * Reset email with OTP
 * @param {string} currentEmail - Current email
 * @param {string} newEmail - New email
 * @param {string} otp - OTP code
 */
export const resetEmailWithOtp = async (currentEmail, newEmail, otp) => {
  try {
    console.log('📡 Admin API: Resetting email with OTP', { currentEmail, newEmail, otp: '***' });
    const response = await api.post('/admin/reset-email-with-otp', {
      currentEmail,
      newEmail,
      otp
    });
    console.log('✅ Admin API Response - Reset Email With OTP:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Reset Email With OTP:', error);
    throw error;
  }
};

// ==================== PATCH ENDPOINTS ====================

/**
 * Disable user by ID
 * @param {string} userId - User ID
 */
export const disableUser = async (userId) => {
  try {
    console.log('📡 Admin API: Disabling user', { userId });
    const response = await api.patch(`/admin/disable-user/${userId}`);
    console.log('✅ Admin API Response - Disable User:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Disable User:', error);
    throw error;
  }
};

/**
 * Update blocked users
 * @param {string} userId - User ID
 * @param {Array} blockedUsers - Array of blocked user IDs
 */
export const updateBlockedUsers = async (userId, blockedUsers) => {
  try {
    console.log('📡 Admin API: Updating blocked users', { userId, blockedUsers });
    const response = await api.patch(`/admin/update-blocked-users/${userId}`, {
      blockedUsers
    });
    console.log('✅ Admin API Response - Update Blocked Users:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Update Blocked Users:', error);
    throw error;
  }
};

/**
 * Update target location
 * @param {string} userId - User ID
 * @param {Object} locationData - Location data
 */
export const updateTargetLocation = async (userId, locationData) => {
  try {
    console.log('📡 Admin API: Updating target location', { userId, locationData });
    const response = await api.patch(`/admin/update-target-location/${userId}`, locationData);
    console.log('✅ Admin API Response - Update Target Location:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Update Target Location:', error);
    throw error;
  }
};

/**
 * Update distance preference
 * @param {string} userId - User ID
 * @param {Object} distanceData - Distance data
 */
export const updateDistance = async (userId, distanceData) => {
  try {
    console.log('📡 Admin API: Updating distance', { userId, distanceData });
    const response = await api.patch(`/admin/update-distance/${userId}`, distanceData);
    console.log('✅ Admin API Response - Update Distance:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Update Distance:', error);
    throw error;
  }
};

/**
 * Unblock user
 * @param {string} userId - User ID
 * @param {string} unblockUserId - User ID to unblock
 */
export const unblockUser = async (userId, unblockUserId) => {
  try {
    console.log('📡 Admin API: Unblocking user', { userId, unblockUserId });
    const response = await api.patch(`/admin/unblock-user/${userId}`, {
      unblockUserId
    });
    console.log('✅ Admin API Response - Unblock User:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Unblock User:', error);
    throw error;
  }
};

/**
 * Update hobbies/interests
 * @param {string} userId - User ID
 * @param {Array} hobbies - Array of hobbies/interests
 */
export const updateHobbies = async (userId, hobbies) => {
  try {
    console.log('📡 Admin API: Updating hobbies', { userId, hobbies });
    const response = await api.patch(`/admin/update-hobbies/${userId}`, {
      hobbies
    });
    console.log('✅ Admin API Response - Update Hobbies:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Update Hobbies:', error);
    throw error;
  }
};

/**
 * Update monthly deposit
 * @param {string} userId - User ID
 * @param {number} monthlyDeposit - Monthly deposit amount
 */
export const updateMonthlyDeposit = async (userId, monthlyDeposit) => {
  try {
    console.log('📡 Admin API: Updating monthly deposit', { userId, monthlyDeposit });
    const response = await api.patch(`/admin/update-monthly-deposit/${userId}`, {
      monthlyDeposit
    });
    console.log('✅ Admin API Response - Update Monthly Deposit:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Update Monthly Deposit:', error);
    throw error;
  }
};

// ==================== PUT ENDPOINTS ====================

/**
 * Edit user profile
 * @param {string} userId - User ID
 * @param {Object} profileData - Profile data
 */
export const editUserProfile = async (userId, profileData) => {
  try {
    console.log('📡 Admin API: Editing user profile', { userId, profileData });
    const response = await api.put(`/admin/edit-profile/${userId}`, profileData);
    console.log('✅ Admin API Response - Edit User Profile:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Edit User Profile:', error);
    throw error;
  }
};

// ==================== DELETE ENDPOINTS ====================

/**
 * Delete user by ID
 * @param {string} userId - User ID
 */
export const deleteUser = async (userId) => {
  try {
    console.log('📡 Admin API: Deleting user', { userId });
    const response = await api.delete(`/admin/delete-user/${userId}`);
    console.log('✅ Admin API Response - Delete User:', response);
    return response;
  } catch (error) {
    console.error('❌ Admin API Error - Delete User:', error);
    throw error;
  }
};

// Export all functions as default object
export default {
  // GET endpoints
  getAllUsers,
  getActiveUsers,
  getUserById,
  getUserAffiliates,
  getUserReferrals,
  getUsersByAgeRange,
  getUserProfileFromFeed,
  getNewMatchAlert,
  
  // POST endpoints
  createUser,
  sendPasswordResetOtp,
  resetPasswordWithOtp,
  sendEmailResetOtp,
  resetEmailWithOtp,
  
  // PATCH endpoints
  disableUser,
  updateBlockedUsers,
  updateTargetLocation,
  updateDistance,
  unblockUser,
  updateHobbies,
  updateMonthlyDeposit,
  
  // PUT endpoints
  editUserProfile,
  
  // DELETE endpoints
  deleteUser,
  
  // Helper functions
  getUserId
};
