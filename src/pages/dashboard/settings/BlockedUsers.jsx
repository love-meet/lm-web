import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserX, Search, MoreVertical } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { updateBlockedUsers, unblockUser, getUserById } from '../../../api/admin';

export default function BlockedUsers() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock blocked users data
  const [blockedUsers] = useState([
    {
      id: 1,
      name: 'Jane Smith',
      username: '@janesmith',
      avatar: '/assets/default-profile.jpg',
      blockedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      username: '@mikej',
      avatar: '/assets/default-profile.jpg',
      blockedDate: '2024-01-10'
    },
    {
      id: 3,
      name: 'Sarah Wilson',
      username: '@sarahw',
      avatar: '/assets/default-profile.jpg',
      blockedDate: '2024-01-05'
    }
  ]);

  const filteredUsers = blockedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUnblock = async (userId) => {
    try {
      // Get current user ID for API call
      const currentUserId = user?.userId || user?.id || user?._id;
      if (!currentUserId) {
        console.error('No current user ID found for unblock operation');
        return;
      }
      
      // Call admin API to unblock user
      console.log('Unblocking user:', userId);
      const response = await unblockUser(currentUserId, userId);
      console.log('User unblocked successfully:', response);
      
      // TODO: Update local state to remove unblocked user from list
      // This would typically involve refetching the blocked users list
      
    } catch (error) {
      console.error('Failed to unblock user:', error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--bg-secondary)]/80 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-white font-semibold text-lg">Blocked Users</h1>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[var(--bg-secondary)]/60 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[var(--primary-purple)] focus:outline-none transition-colors"
            placeholder="Search blocked users..."
          />
        </div>

        {/* Blocked Users List */}
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-[var(--bg-secondary)]/80 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[var(--primary-purple)]/30"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[var(--bg-primary)] flex items-center justify-center">
                        <UserX size={8} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{user.name}</h3>
                      <p className="text-[var(--text-muted)] text-sm">{user.username}</p>
                      <p className="text-[var(--text-muted)] text-xs">
                        Blocked on {new Date(user.blockedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUnblock(user.id)}
                      className="bg-[var(--primary-purple)] hover:bg-[var(--primary-purple)]/80 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Unblock
                    </button>
                    <button className="text-[var(--text-muted)] hover:text-white transition-colors p-2">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <UserX size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
              <h3 className="text-white font-medium text-lg mb-2">
                {searchTerm ? 'No users found' : 'No blocked users'}
              </h3>
              <p className="text-[var(--text-muted)]">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Users you block will appear here. You can unblock them at any time.'
                }
              </p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-[var(--primary-purple)]/10 border border-[var(--primary-purple)]/20 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">About Blocking</h4>
          <ul className="text-[var(--text-secondary)] text-sm space-y-1">
            <li>• Blocked users cannot send you messages</li>
            <li>• They won't see your profile in their recommendations</li>
            <li>• You won't see their profile or content</li>
            <li>• You can unblock someone at any time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}