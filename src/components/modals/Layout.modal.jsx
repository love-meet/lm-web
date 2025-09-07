import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import PublicProfileModal from './PublicProfileModal';
import PostDetails from '../../pages/dashboard/postDetails/PostDetails';
import PrivateChat from './PrivateChat';

export default function LayoutModal() {
    const [searchParams] = useSearchParams();
    const userIdURL = searchParams.get('userId');
    const modal = searchParams.get('modal');
    const postId = searchParams.get('postId');

    if (modal === 'public-profile' || userIdURL) {
        return (
            <PublicProfileModal />
        ) 
    }

    if (modal === 'post-details' || postId) {
        return (
            <PostDetails postId={postId} />
        ) 
    }

    if (modal === 'chat-details' ) {
        return (
            <PrivateChat />
        ) 
    }


  return (
    <div>
        
    </div>
  )
}
