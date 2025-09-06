import api from './axios';

/**
 * Affiliate API Service Functions
 * Handles all affiliate-related API calls
 */

// Helper function to get the correct user ID for API calls
// Following the same pattern as your post fix: use userId (public) instead of _id (internal)
const getUserId = (user) => {
  // Priority order: userId > id > _id (similar to postId > _id pattern)
  const userId = user?.userId || user?.id || user?._id;
  
  // Debug logging to track which ID is being used
  console.log('🔍 User ID Resolution:', {
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

// Get user affiliates information
export const getUserAffiliates = async (user) => {
  try {
    const userId = getUserId(user);
    if (!userId) {
      throw new Error('No valid user ID found');
    }
    
    const response = await api.get(`/admin/user-affiliates/${userId}`);
    return response;
  } catch (error) {
    console.error('Error fetching user affiliates:', error);
    throw error;
  }
};

// Get user referrals list
export const getUserReferrals = async (user, page = 1, limit = 10) => {
  try {
    const userId = getUserId(user);
    if (!userId) {
      throw new Error('No valid user ID found');
    }
    
    const response = await api.get(`/admin/user-referrals/${userId}?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
    console.error('Error fetching user referrals:', error);
    throw error;
  }
};

// Helper function to check if user is an affiliate based on affiliates data
export const checkAffiliateStatus = (affiliatesData) => {
  if (!affiliatesData) return false;
  
  // Assuming the API returns affiliate data if user is an affiliate
  // Adjust this logic based on actual API response structure
  return affiliatesData && (
    affiliatesData.isAffiliate || 
    affiliatesData.affiliateCode || 
    affiliatesData.status === 'active' ||
    affiliatesData.length > 0 // if it returns an array
  );
};

export default {
  getUserAffiliates,
  getUserReferrals,
  checkAffiliateStatus
};