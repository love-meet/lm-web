import React, { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { backendUrl } from '../api/axios';
import { useAuth } from './AuthContext';


export const PostContext = createContext();

export const usePost = () => {
    return useContext(PostContext);
};

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [commentLoading, setCommentLoading] = useState(false);
    const { user } = useAuth()

    const socket = io(backendUrl());

    useEffect(() => {
        if (!user) return;
        socket.on('connect', () => {
            console.log('connected to feeds socket');
            fetchPosts(1);
        });

        socket.on('feeds', (data) => {
            setPosts(prevPosts => [...prevPosts, ...data.feeds]);
            setPagination(data.pagination);
            setLoading(false);
        });

        socket.on('newPost', (post) => {
            setPosts(prevPosts => [post, ...prevPosts]);
        });

        socket.on('postUpdated', (updatedPost) => {
            setPosts(prevPosts => prevPosts.map(post => 
                post.postId === updatedPost.postId ? updatedPost : post
            ));
        });

        socket.on('postDeleted', ({ postId }) => {
            setPosts(prevPosts => prevPosts.filter(post => post.postId !== postId));
        });

        socket.on('commentAdded', ({ postId, comment }) => {
            if (comment) {
                setPosts(prevPosts => prevPosts.map(post =>
                    post.postId === postId
                        ? { ...post, comments: [...(post.comments || []), comment] }
                        : post
                ));
            }
        });

        socket.on('replyAdded', ({ postId, commentId, reply }) => {
            if (reply) {
                setPosts(prevPosts => prevPosts.map(post =>
                    post.postId === postId
                        ? { ...post, comments: post.comments.map(comment =>
                            comment.id === commentId
                                ? { ...comment, replies: [...(comment.replies || []), reply] }
                                : comment
                        ) }
                        : post
                ));
            }
        });

        socket.on('error', (error) => {
            setError(error.message);
            console.error('Socket Error:', error);
        });


        return () => {
            socket.disconnect();
        };
    }, [user]);

    const fetchPosts = (page, callback) => {
        setLoading(true);
        socket.emit('fetchFeeds', { page }, (response) => {
            if (response.error) {
                setError(response.error);
            } else {
                setPosts(prevPosts => [...prevPosts, ...response.feeds]);
                setPagination(response.pagination);
            }
            setLoading(false);
            if (callback) callback(response);
        });
    };

    const createPost = (postData, callback) => {
        if (!user) return;
        socket.emit('createPost', { ...postData, userId: user.userId }, (response) => {
            if (response.error) {
                setError(response.error);
            }
            if (callback) callback(response);
        });
    };

    const toggleLike = (postId, callback) => {
        if (!user) return;

        const post = posts.find(p => p.postId === postId);
        if (!post) return;

        const liked = post.likedBy.some(u => u.userId === user.userId);
        const optimisticPost = {
            ...post,
            likes: liked ? post.likes - 1 : post.likes + 1,
            likedBy: liked
                ? post.likedBy.filter(u => u.userId !== user.userId)
                : [...post.likedBy, { userId: user.userId, picture: user.picture, username: user.username }]
        };

        setPosts(prevPosts => prevPosts.map(p => p.postId === postId ? optimisticPost : p));

        socket.emit('toggleLike', { postId, userId: user.userId }, (response) => {
            if (response.error) {
                setError(response.error);
                // Revert optimistic update on error
                setPosts(prevPosts => prevPosts.map(p => p.postId === postId ? post : p));
            }
            if (callback) callback(response);
        });
    };

    const addComment = (postId, content, callback) => {
        if (!user) return;
        setCommentLoading(true);
        socket.emit('addComment', { postId, content, username: user.username, userAvatar: user.picture }, (response) => {
            if (response.error) {
                setError(response.error);
            } else if (response.comment) {
                setPosts(prevPosts => prevPosts.map(post =>
                    post.postId === postId
                        ? { ...post, comments: [...(post.comments || []), response.comment] }
                        : post
                ));
            }
            setCommentLoading(false);
            if (callback) callback(response);
        });
    };

    const replyComment = (postId, commentId, content, callback) => {
        if (!user) return;
        setCommentLoading(true);
        socket.emit('replyComment', { postId, commentId, content, username: user.username, userAvatar: user.picture }, (response) => {
            if (response.error) {
                setError(response.error);
            } else if (response.reply) {
                setPosts(prevPosts => prevPosts.map(post =>
                    post.postId === postId
                        ? { ...post, comments: post.comments.map(comment =>
                            comment.id === commentId
                                ? { ...comment, replies: [...(comment.replies || []), response.reply] }
                                : comment
                        ) }
                        : post
                ));
            }
            setCommentLoading(false);
            if (callback) callback(response);
        });
    };

    const likeComment = (postId, commentId, callback) => {
        if (!user) return;

        const post = posts.find(p => p.postId === postId);
        if (!post) return;

        const comment = post.comments.find(c => c.id === commentId);
        if (!comment) return;

        const liked = comment.likedBy && comment.likedBy.some(u => u.userId === user.userId);
        const optimisticComment = {
            ...comment,
            likes: liked ? comment.likes - 1 : comment.likes + 1,
            likedBy: liked
                ? comment.likedBy.filter(u => u.userId !== user.userId)
                : [...(comment.likedBy || []), { userId: user.userId, picture: user.picture, username: user.username }]
        };

        const optimisticPost = {
            ...post,
            comments: post.comments.map(c => c.id === commentId ? optimisticComment : c)
        };

        setPosts(prevPosts => prevPosts.map(p => p.postId === postId ? optimisticPost : p));

        socket.emit('likeComment', { postId, commentId, userId: user.userId }, (response) => {
            if (response.error) {
                setError(response.error);
                // Revert optimistic update on error
                setPosts(prevPosts => prevPosts.map(p => p.postId === postId ? post : p));
            }
            if (callback) callback(response);
        });
    };

    const likeReply = (postId, commentId, replyId, callback) => {
        if (!user) return;
        const post = posts.find(p => p.postId === postId);
        if (!post) return;

        const comment = post.comments.find(c => c.id === commentId);
        if (!comment) return;

        const reply = comment.replies.find(r => r.id === replyId);
        if (!reply) return;

        const liked = reply.likedBy && reply.likedBy.some(u => u.userId === user.userId);
        const optimisticReply = {
            ...reply,
            likes: liked ? reply.likes - 1 : reply.likes + 1,
            likedBy: liked
                ? reply.likedBy.filter(u => u.userId !== user.userId)
                : [...(reply.likedBy || []), { userId: user.userId, picture: user.picture, username: user.username }]
        };

        const optimisticComment = {
            ...comment,
            replies: comment.replies.map(r => r.id === replyId ? optimisticReply : r)
        };

        const optimisticPost = {
            ...post,
            comments: post.comments.map(c => c.id === commentId ? optimisticComment : c)
        };

        setPosts(prevPosts => prevPosts.map(p => p.postId === postId ? optimisticPost : p));

        socket.emit('likeReply', { postId, commentId, replyId, userId: user.userId }, (response) => {
            if (response.error) {
                setError(response.error);
                // Revert optimistic update on error
                setPosts(prevPosts => prevPosts.map(p => p.postId === postId ? post : p));
            }
            if (callback) callback(response);
        });
    };

    const getPostComments = (postId) => {
        const post = posts.find(p => p.postId === postId);
        return post ? post.comments : [];
    };

    const fetchPost = (postId, callback) => {
        setLoading(true);
        socket.emit('fetchPost', { postId }, (response) => {
            if (response.error) {
                setError(response.error);
            } else {
                setPosts(prevPosts => {
                    const postExists = prevPosts.some(p => p.postId === response.post.postId);
                    if (postExists) {
                        return prevPosts.map(p => p.postId === response.post.postId ? response.post : p);
                    }
                    return [...prevPosts, response.post];
                });
            }
            setLoading(false);
            if (callback) callback(response);
        });
    };

    const fetchUser = (userId, callback) => {
        setLoading(true);
        socket.emit('fetchUserById', { userId }, (response) => {
            if (response.error) {
                setError(response.error);
            }
            setLoading(false);
            if (callback) callback(response);
        });
    };

    const value = {
        posts,
        loading,
        error,
        pagination,
        commentLoading,
        fetchPosts,
        createPost,
        toggleLike,
        addComment,
        replyComment,
        likeComment,
        likeReply,
        getPostComments,
        fetchPost,
        fetchUser
    };

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
};