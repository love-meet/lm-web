import React, { createContext, useContext, useState } from 'react';

const AffiliateContext = createContext();

export const useAffiliate = () => {
  const context = useContext(AffiliateContext);
  if (!context) {
    throw new Error('useAffiliate must be used within an AffiliateProvider');
  }
  return context;
};

export const AffiliateProvider = ({ children }) => {
  const [isUserAffiliate, setIsUserAffiliate] = useState(true);

  return (
    <AffiliateContext.Provider value={{ isUserAffiliate, setIsUserAffiliate }}>
      {children}
    </AffiliateContext.Provider>
  );
};