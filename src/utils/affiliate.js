/**
 * Affiliate utilities for generating and managing affiliate links
 */

// Generate a unique affiliate code for a user
export const generateAffiliateCode = (userId, username) => {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 8);
  const userPart = username ? username.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 4) : '';
  return `${userPart}${userId}${timestamp}${randomString}`.toUpperCase();
};

// Generate a complete affiliate link
export const generateAffiliateLink = (affiliateCode) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/register?ref=${affiliateCode}`;
};

// Create custom affiliate link with campaign tracking
export const createCustomAffiliateLink = (affiliateCode, campaign = 'general', source = 'direct') => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/register?ref=${affiliateCode}&utm_campaign=${campaign}&utm_source=${source}`;
};

// Share affiliate link via Web Share API or fallback
export const shareAffiliateLink = async (affiliateLink, message = '') => {
  const shareData = {
    title: 'Join Love Meet',
    text: message || 'Join me on Love Meet - the best platform to find your perfect match!',
    url: affiliateLink,
  };

  if (navigator.share && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'native' };
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
      return { success: false, error: error.message };
    }
  }

  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(affiliateLink);
    return { success: true, method: 'clipboard' };
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return { success: false, error: 'Could not copy to clipboard' };
  }
};

// Generate social media sharing links
export const generateSocialShareLinks = (affiliateLink, message = '') => {
  const encodedUrl = encodeURIComponent(affiliateLink);
  const encodedMessage = encodeURIComponent(message || 'Join me on Love Meet!');
  
  return {
    whatsapp: `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=Join Love Meet&body=${encodedMessage}%0D%0A%0D%0A${encodedUrl}`,
    sms: `sms:?body=${encodedMessage}%20${encodedUrl}`
  };
};

// Validate affiliate code format
export const validateAffiliateCode = (code) => {
  if (!code || typeof code !== 'string') return false;
  // Should be alphanumeric and between 8-20 characters
  const regex = /^[A-Z0-9]{8,20}$/;
  return regex.test(code);
};

// Get affiliate statistics (mock data for now)
export const getAffiliateStats = (userId) => {
  // This would typically make an API call
  return Promise.resolve({
    totalReferrals: 123,
    totalEarnings: 1234.56,
    thisMonthReferrals: 12,
    thisMonthEarnings: 150.00,
    conversionRate: 15.5,
    topPerformingLinks: [
      { campaign: 'social_media', clicks: 45, conversions: 8 },
      { campaign: 'email', clicks: 23, conversions: 5 },
      { campaign: 'direct', clicks: 67, conversions: 10 }
    ]
  });
};

// Track affiliate link click (for analytics)
export const trackAffiliateClick = (affiliateCode, source = 'unknown') => {
  // This would typically send data to analytics service
  console.log(`Affiliate click tracked: ${affiliateCode} from ${source}`);
  
  // Store in localStorage for now
  const clicks = JSON.parse(localStorage.getItem('affiliateClicks') || '[]');
  clicks.push({
    code: affiliateCode,
    source,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  });
  localStorage.setItem('affiliateClicks', JSON.stringify(clicks));
};

// Generate QR code data URL for affiliate link
export const generateQRCode = async (affiliateLink) => {
  // This is a placeholder - you'd typically use a QR code library like 'qrcode'
  // For now, return a placeholder
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(affiliateLink)}`;
};