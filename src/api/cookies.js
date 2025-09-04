export const getCookie = (name, defaultValue = '') => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift() || defaultValue;
};

export const setCookie = (key,value) => {
    document.cookie = `${key}=${value}; path=/;`;
}

// Helper function to get referral information from cookies
export const getReferralInfo = () => {
    const referralId = getCookie('referral_id');
    const referralTimestamp = getCookie('referral_timestamp');
    
    if (referralId) {
        return {
            referralId,
            timestamp: referralTimestamp ? parseInt(referralTimestamp) : null,
            hasReferral: true
        };
    }
    
    return {
        referralId: null,
        timestamp: null,
        hasReferral: false
    };
};

// Helper function to clear referral information
export const clearReferralInfo = () => {
    document.cookie = 'referral_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'referral_timestamp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
