import React from 'react';

export default function UserHeader({ post }) {
  const getBadgeColor = (badge) => {
    switch ((badge || '').toLowerCase()) {
      case 'bronze': return '#CD7F32';
      case 'silver': return '#C0C0C0';
      case 'gold': return '#FFD700';
      case 'diamond': return '#B9F2FF';
      case 'platinum': return '#E5E4E2';
      default: return '#CD7F32';
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return `${Math.floor(diffInMinutes / 10080)}w ago`;
  };

  return (
    <div className="relative">
       <p className="text-[var(--text-secondary)] text-base leading-relaxed">
        {post.content}
        </p>
    </div>
  );
}