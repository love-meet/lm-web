import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaWallet, FaLink, FaCheck, FaCopy, FaUsers, FaTachometerAlt, FaDollarSign } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { useAffiliate } from '../../../context/AffiliateContext';
import { getUserReferrals, getUserAffiliates } from '../../../api/admin';
import { toast } from 'sonner';

const AffiliateDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const { isUserAffiliate, loading: affiliateLoading } = useAffiliate();
  
  // Referrals data state
  const [referrals, setReferrals] = useState([]);
  const [referralsLoading, setReferralsLoading] = useState(false);
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [isCopied, setIsCopied] = useState(false);
  const affiliateLink = `https://love-meet.com/ref/${user?._id}`;

  // Fetch referrals data when user is affiliate
  useEffect(() => {
    const fetchReferrals = async () => {
      if (!user?._id || !isUserAffiliate) {
        setReferrals([]);
        return;
      }

      setReferralsLoading(true);
      try {
        // Get user ID for API call
        const userId = user?.userId || user?.id || user?._id;
        if (!userId) {
          console.error('No user ID found for referrals fetch');
          setReferrals([]);
          return;
        }
        
        // Call admin API to get user referrals
        const response = await getUserReferrals(userId, currentPage, usersPerPage);
        console.log('Referrals fetched successfully:', response);
        
        // Adjust based on actual API response structure
        setReferrals(response.referrals || response.data || response || []);
        setTotalReferrals(response.totalCount || response.total || 0);
        setTotalPages(response.totalPages || Math.ceil((response.totalCount || 0) / usersPerPage));
      } catch (error) {
        console.error('Failed to fetch referrals:', error);
        toast.error('Failed to load referrals data');
        setReferrals([]);
      } finally {
        setReferralsLoading(false);
      }
    };

    fetchReferrals();
  }, [user?._id, isUserAffiliate, currentPage, usersPerPage]);

  const handleCopy = () => {
      navigator.clipboard.writeText(affiliateLink);
      setIsCopied(true);
      setTimeout(() => {
          setIsCopied(false);
      }, 2000);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] text-white z-50 flex flex-col">
      {/* Header */}
      <div className="relative z-10 bg-[var(--bg-primary)]/90 backdrop-blur-lg border-b border-white/10 p-4 flex items-center flex-shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <FaArrowLeft className="text-white" />
        </button>
        <h1 className="text-xl font-bold ml-4">{isUserAffiliate ? 'Affiliate Dashboard' : 'Affiliate Program'}</h1>
      </div>


      {/* Scrollable Body */}
      <div className="overflow-y-auto p-4 pb-20">
        {affiliateLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <span className="ml-3 text-lg">Loading affiliate data...</span>
          </div>
        ) : isUserAffiliate ? (
          // Existing Affiliate Dashboard
          <>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[var(--primary-cyan)]">Affiliate Program</h3>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--text-muted)]">Your affiliate link:</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <FaLink className="text-[var(--accent-pink)] flex-shrink-0" />
                    <span className="text-white font-mono truncate w-48">{affiliateLink}</span>
                  </div>
                </div>
                <button 
                  onClick={handleCopy}
                  className={`p-2 rounded-full transition-all duration-300 ${isCopied ? 'bg-green-500' : 'bg-white/10 hover:bg-white/20'}`}>
                  {isCopied ? <FaCheck className="text-white" /> : <FaCopy className="text-white" />}
                </button>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <FaUsers className="text-[var(--accent-pink)]" />
                        <span>{user?.referrals?.length || 0} Referrals</span>
                    </div>
                    <div className="text-right">
                        <h4 className="text-lg font-semibold">Earnings</h4>
                        <div className="flex items-center space-x-2 mt-1">
                            <FaWallet className="text-[var(--accent-pink)]" />
                            <span className="text-2xl font-bold">₦{user?.affiliateEarnings || '0.00'}</span>
                        </div>
                    </div>
                </div>
                <button className="w-full mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition-all duration-300">
                    Withdraw
                </button>
              </div>
            </div>

        
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-4 text-[var(--primary-cyan)]">Referred Users</h2>
              
              {referralsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  <span className="ml-2">Loading referrals...</span>
                </div>
              ) : referrals.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="p-2 whitespace-nowrap">User</th>
                          <th className="p-2 whitespace-nowrap">Earnings</th>
                          <th className="p-2 whitespace-nowrap">Plan</th>
                          <th className="p-2 whitespace-nowrap">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {referrals.map((referral, index) => (
                          <tr key={referral._id || referral.id || index} className="border-b border-white/10 last:border-b-0">
                            <td className="p-2 whitespace-nowrap flex items-center space-x-2">
                              <img 
                                src={referral.picture || referral.avatar || '/assets/default-profile.jpg'} 
                                alt={referral.username || referral.name || 'User'} 
                                className="w-6 h-6 rounded-full" 
                              />
                              <span>{referral.username || referral.name || 'Unknown User'}</span>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              {referral.subscriptionPlan || referral.plan ? (
                                <span className="text-green-400">₦{(referral.commission || referral.earnings || 0).toLocaleString()}</span>
                              ) : (
                                <span className="text-gray-400">no plan</span>
                              )}
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              {referral.subscriptionPlan?.planName || referral.plan ? (
                                <span className="bg-[var(--accent-pink)] text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                                  {referral.subscriptionPlan?.planName || referral.plan}
                                </span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="p-2 whitespace-nowrap text-gray-400">
                              {referral.dateJoined || referral.date ? 
                                new Date(referral.dateJoined || referral.date).toLocaleDateString() : 
                                '-'
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Pagination */}
                  <div className="flex justify-between items-center mt-4">
                    <button 
                      onClick={() => paginate(currentPage - 1)} 
                      disabled={currentPage === 1}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button 
                      onClick={() => paginate(currentPage + 1)} 
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <FaUsers className="text-4xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No referrals yet. Share your affiliate link to start earning!</p>
                </div>
              )}
            </div>
          </>
        ) : (
          // Become an Affiliate Landing Page
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md w-full">
              <div className="mb-6">
                <FaUsers className="text-6xl text-[var(--primary-cyan)] mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Join Our Affiliate Program</h2>
                <p className="text-gray-300 text-lg">Start earning money by referring new users to our platform</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-left">
                  <FaCheck className="text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Earn up to 30% commission on referrals</span>
                </div>
                <div className="flex items-center space-x-3 text-left">
                  <FaCheck className="text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Real-time tracking and analytics</span>
                </div>
                <div className="flex items-center space-x-3 text-left">
                  <FaCheck className="text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Monthly payouts and bonuses</span>
                </div>
                <div className="flex items-center space-x-3 text-left">
                  <FaCheck className="text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Dedicated support team</span>
                </div>
              </div>
              
              <Link
                to="/affiliate/create"
                className="w-full bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--accent-pink)] hover:from-[var(--accent-pink)] hover:to-[var(--primary-cyan)] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <FaDollarSign className="text-xl" />
                <span>Become an Affiliate</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AffiliateDashboard;
