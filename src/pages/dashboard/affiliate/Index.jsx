import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const referredUsers = [
  { id: 1, name: 'John Doe', avatar: '/assets/default-profile.jpg', earnings: 5000, plan: 'Premium', date: '2023-10-26' },
  { id: 2, name: 'Jane Smith', avatar: '/assets/default-profile.jpg', earnings: 0, plan: null, date: '2023-10-25' },
  { id: 3, name: 'Bob Johnson', avatar: '/assets/default-profile.jpg', earnings: 10000, plan: 'Gold', date: '2023-10-24' },
  { id: 4, name: 'Alice Williams', avatar: '/assets/default-profile.jpg', earnings: 0, plan: null, date: '2023-10-23' },
  { id: 5, name: 'Chris Brown', avatar: '/assets/default-profile.jpg', earnings: 7500, plan: 'Premium', date: '2023-10-22' },
  { id: 6, name: 'Emily Jones', avatar: '/assets/default-profile.jpg', earnings: 0, plan: null, date: '2023-10-21' },
  { id: 7, name: 'Michael Davis', avatar: '/assets/default-profile.jpg', earnings: 12000, plan: 'Gold', date: '2023-10-20' },
  { id: 8, name: 'Sarah Miller', avatar: '/assets/default-profile.jpg', earnings: 0, plan: null, date: '2023-10-19' },
  { id: 9, name: 'David Wilson', avatar: '/assets/default-profile.jpg', earnings: 3000, plan: 'Silver', date: '2023-10-18' },
  { id: 10, name: 'Laura Taylor', avatar: '/assets/default-profile.jpg', earnings: 0, plan: null, date: '2023-10-17' },
];

const AffiliateDashboard = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = referredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] text-white z-50 flex flex-col">
      {/* Header */}
      <div className="relative z-10 bg-[var(--bg-primary)]/90 backdrop-blur-lg border-b border-white/10 p-4 flex items-center flex-shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <FaArrowLeft className="text-white" />
        </button>
        <h1 className="text-xl font-bold ml-4">Affiliate Dashboard</h1>
      </div>

      {/* Scrollable Body */}
      <div className="overflow-y-auto p-4 pb-20">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4 text-[var(--primary-cyan)]">Referred Users</h2>
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
                {currentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/10 last:border-b-0">
                    <td className="p-2 whitespace-nowrap flex items-center space-x-2">
                      <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                      <span>{user.name}</span>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {user.plan ? (
                        <span className="text-green-400">₦{user.earnings.toLocaleString()}</span>
                      ) : (
                        <span className="text-gray-400">no plan</span>
                      )}
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {user.plan ? (
                        <span className="bg-[var(--accent-pink)] text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                          {user.plan}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-2 whitespace-nowrap text-gray-400">{user.date}</td>
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
            <span>Page {currentPage} of {Math.ceil(referredUsers.length / usersPerPage)}</span>
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === Math.ceil(referredUsers.length / usersPerPage)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;
