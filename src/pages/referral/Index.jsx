import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { setCookie, getCookie } from '../../api/cookies';
import PageLoader from '../../components/PageLoader';

const ReferralHandler = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleReferral = async () => {
      try {
        // Set processing state to show loader
        setIsProcessing(true);

        // Validate referral ID
        if (!id || id.trim() === '') {
          console.error('Invalid referral ID');
          navigate('/', { replace: true });
          return;
        }

        // Check if user already has a referral stored (don't override)
        const existingReferral = getCookie('referral_id');
        if (!existingReferral) {
          // Store referral information in cookies
          setCookie('referral_id', id);
          setCookie('referral_timestamp', Date.now());
          
          console.log(`Referral ID ${id} stored in cookies`);
        } else {
          console.log(`User already has referral ID: ${existingReferral}`);
        }

        // Optional: Track the referral click (future API call)
        // This can be implemented when backend is ready
        // await trackReferralClick({
        //   referralId: id,
        //   timestamp: Date.now(),
        //   userAgent: navigator.userAgent,
        //   referrer: document.referrer
        // });
        
        // Simulate processing time to show the loader
        // Remove this in production or reduce the time
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Redirect to home page
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Error processing referral:', error);
        // Even if there's an error, redirect to home
        navigate('/', { replace: true });
      } finally {
        setIsProcessing(false);
      }
    };

    handleReferral();
  }, [id, navigate]);

  // Show Love Meet loader while processing
  if (isProcessing) {
    return <PageLoader />;
  }

  // This should rarely be seen as we redirect immediately
  return null;
};

export default ReferralHandler;