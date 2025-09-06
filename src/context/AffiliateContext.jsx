import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserAffiliates, checkAffiliateStatus } from '../api/affiliate';

const AffiliateContext = createContext();

export const useAffiliate = () => {
  const context = useContext(AffiliateContext);
  if (!context) {
    throw new Error('useAffiliate must be used within an AffiliateProvider');
  }
  return context;
};

export const AffiliateProvider = ({ children }) => {
  const { user } = useAuth();
  const [isUserAffiliate, setIsUserAffiliate] = useState(false);
  const [affiliateData, setAffiliateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Development/Testing override - allows manual control
  const [manualOverride, setManualOverride] = useState(null); // null = use API, true/false = override
  const [isOverrideMode, setIsOverrideMode] = useState(false);

  // Fetch affiliate status when user changes
  useEffect(() => {
    const fetchAffiliateStatus = async () => {
      // Skip API fetch if manual override is active
      if (isOverrideMode) {
        setIsUserAffiliate(manualOverride ?? false);
        return;
      }

      if (!user?._id) {
        setIsUserAffiliate(false);
        setAffiliateData(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const affiliatesData = await getUserAffiliates(user);  // Pass entire user object
        const isAffiliate = checkAffiliateStatus(affiliatesData);
        
        setIsUserAffiliate(isAffiliate);
        setAffiliateData(affiliatesData);
      } catch (err) {
        console.error('Failed to fetch affiliate status:', err);
        setError(err);
        // Fallback to false if API fails
        setIsUserAffiliate(false);
        setAffiliateData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliateStatus();
  }, [user?._id, isOverrideMode, manualOverride]);

  // Function to refresh affiliate status (useful after affiliate application)
  const refreshAffiliateStatus = async () => {
    if (isOverrideMode) {
      console.log('Override mode is active - skipping API refresh');
      return;
    }

    if (user?._id) {
      setLoading(true);
      try {
        const affiliatesData = await getUserAffiliates(user);  // Pass entire user object
        const isAffiliate = checkAffiliateStatus(affiliatesData);
        
        setIsUserAffiliate(isAffiliate);
        setAffiliateData(affiliatesData);
      } catch (err) {
        console.error('Failed to refresh affiliate status:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Development/Testing functions - for manual control
  const enableTestingMode = (value) => {
    setIsOverrideMode(true);
    setManualOverride(value);
    setIsUserAffiliate(value);
    console.log(`🧪 Testing Mode Enabled: isUserAffiliate = ${value}`);
  };

  const disableTestingMode = () => {
    setIsOverrideMode(false);
    setManualOverride(null);
    console.log('🧪 Testing Mode Disabled - Using API data');
    // Trigger a refresh to get real data
    if (user?._id) {
      refreshAffiliateStatus();
    }
  };

  const toggleAffiliateStatus = () => {
    if (isOverrideMode) {
      const newValue = !isUserAffiliate;
      setManualOverride(newValue);
      setIsUserAffiliate(newValue);
      console.log(`🧪 Toggled: isUserAffiliate = ${newValue}`);
    } else {
      console.log('⚠️ Cannot toggle - Enable testing mode first');
    }
  };

  // Make functions globally available for console testing
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.affiliateTest = {
        enable: (value) => enableTestingMode(value),
        disable: () => disableTestingMode(),
        toggle: () => toggleAffiliateStatus(),
        status: () => console.log(`Current: isUserAffiliate = ${isUserAffiliate}, Override Mode = ${isOverrideMode}`),
        help: () => {
          console.log(`
🧪 AFFILIATE TESTING COMMANDS:

affiliateTest.enable(true)   - Enable affiliate mode
affiliateTest.enable(false)  - Enable non-affiliate mode
affiliateTest.disable()      - Disable testing, use real API
affiliateTest.toggle()       - Toggle between true/false
affiliateTest.status()       - Show current status
affiliateTest.help()         - Show this help
`);
        }
      };
      
      // Show help on first load
      console.log('🧪 Affiliate testing enabled! Type "affiliateTest.help()" for commands');
    }
  }, [isUserAffiliate, isOverrideMode]);

  return (
    <AffiliateContext.Provider value={{ 
      isUserAffiliate, 
      setIsUserAffiliate, 
      affiliateData,
      loading,
      error,
      refreshAffiliateStatus,
      // Development/Testing functions
      isOverrideMode,
      enableTestingMode,
      disableTestingMode,
      toggleAffiliateStatus
    }}>
      {children}
    </AffiliateContext.Provider>
  );
};